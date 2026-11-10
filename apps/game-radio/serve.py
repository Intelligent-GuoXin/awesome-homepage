# -*- coding: utf-8 -*-
"""极简静态服务器：支持 HTTP Range，方便浏览器正确读取 Ogg 时长与拖动进度。

用法: python serve.py [端口] [根目录]
"""
import os
import re
import sys
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import unquote

ROOT = os.path.abspath(sys.argv[2]) if len(sys.argv) > 2 else os.path.dirname(os.path.abspath(__file__))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8123
TYPES = {'.html': 'text/html; charset=utf-8', '.ogg': 'audio/ogg', '.json': 'application/json; charset=utf-8',
         '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8'}


class Handler(BaseHTTPRequestHandler):
    protocol_version = 'HTTP/1.1'

    def log_message(self, *a):
        pass

    def do_GET(self):
        path = unquote(self.path.split('?')[0])
        rel = os.path.normpath(path.lstrip('/')) or '.'
        full = os.path.join(ROOT, rel)
        if not os.path.abspath(full).startswith(ROOT + os.sep) or not os.path.isfile(full):
            self.send_error(404)
            return
        size = os.path.getsize(full)
        ctype = TYPES.get(os.path.splitext(full)[1].lower(), 'application/octet-stream')
        rng = self.headers.get('Range')
        start, end = 0, size - 1
        partial = False
        if rng:
            m = re.match(r'bytes=(\d*)-(\d*)', rng)
            if m:
                s, e = m.group(1), m.group(2)
                if s:
                    start = int(s)
                    end = int(e) if e else size - 1
                elif e:
                    start = max(0, size - int(e))
                end = min(end, size - 1)
                if start > end:
                    self.send_response(416)
                    self.send_header('Content-Range', 'bytes */%d' % size)
                    self.end_headers()
                    return
                partial = True
        length = end - start + 1
        self.send_response(206 if partial else 200)
        self.send_header('Content-Type', ctype)
        self.send_header('Accept-Ranges', 'bytes')
        self.send_header('Content-Length', str(length))
        self.send_header('Cache-Control', 'no-cache')
        if partial:
            self.send_header('Content-Range', 'bytes %d-%d/%d' % (start, end, size))
        self.end_headers()
        with open(full, 'rb') as fh:
            fh.seek(start)
            left = length
            while left > 0:
                chunk = fh.read(min(262144, left))
                if not chunk:
                    break
                try:
                    self.wfile.write(chunk)
                except (BrokenPipeError, ConnectionResetError):
                    return
                left -= len(chunk)


if __name__ == '__main__':
    ThreadingHTTPServer(('127.0.0.1', PORT), Handler).serve_forever()
