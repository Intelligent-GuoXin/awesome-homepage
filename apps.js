/* ============================================================
   应用中心 · 应用注册表
   ------------------------------------------------------------
   新增一个应用：往 APPS 里加一项就行，首页会自动渲染成
   Launchpad 风格的图标，不用改 index.html。

   字段说明：
     id    唯一标识（同时用作 SVG 渐变的 id，别重复）
     name  应用名（图标下方显示）
     desc  一句话描述（卡片 / tooltip 里显示）
     url   打开地址（相对路径即可，如 apps/xxx.html）
     tags  搜索关键词
     badge 右上角小角标，可选
     glow  图标悬停时的辉光色，可选
     icon  SVG 字符串（96×96 的 App 图标）
   ============================================================ */

(function (global) {

  /* ---------- 图标工具：圆角方形底 + 内部图形 ---------- */
  function tile(id, top, bottom, glyph) {
    return '<svg viewBox="0 0 96 96" width="100%" height="100%" aria-hidden="true">' +
      '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="' + top + '"/>' +
      '<stop offset="1" stop-color="' + bottom + '"/>' +
      '</linearGradient></defs>' +
      '<rect width="96" height="96" rx="23" fill="url(#' + id + ')"/>' +
      '<path d="M0 26 C24 10 72 10 96 26 L96 0 L0 0 Z" fill="rgba(255,255,255,.09)"/>' +
      '<rect x=".75" y=".75" width="94.5" height="94.5" rx="22.4" fill="none" stroke="rgba(255,255,255,.16)" stroke-width="1.5"/>' +
      glyph +
      '</svg>';
  }

  /* ---------- 等轴测魔方图形（3 个可视面 × 3×3 贴纸） ----------
     注意：这是给 84px 大图标用的「27 块独立贴纸」版本；
     apps/rubiks-cube-icon.svg 是同一造型的小尺寸版本（3 个实心面 + 细网格线），
     那个是为了 16px 的浏览器标签页才拆开的，改颜色时两边都要动。 */
  function isoCube() {
    var s = 13.8, ox = 48, oy = 6.6;
    var ax = 0.8660254 * s, ay = 0.5 * s;   // 向右下
    var bx = -ax, by = ay;                   // 向左下
    var wv = s;                              // 竖直向下

    var GAP = '#171A24';
    var TOP = '#F7F9FC', LEFT = '#1FA85C', RIGHT = '#E23B34';

    function P(i, j, k) {
      return [ox + i * ax + j * bx, oy + i * ay + j * by + k * wv];
    }
    function cell(pts, fill) {
      var d = pts.map(function (p, i) {
        return (i ? 'L' : 'M') + p[0].toFixed(2) + ' ' + p[1].toFixed(2);
      }).join(' ') + 'Z';
      return '<path d="' + d + '" fill="' + fill + '" stroke="' + GAP +
        '" stroke-width="1.7" stroke-linejoin="round"/>';
    }

    var out = '';
    var i, j, k;
    for (i = 0; i < 3; i++) for (j = 0; j < 3; j++)          // 顶面：c=0 平面
      out += cell([P(i, j, 0), P(i + 1, j, 0), P(i + 1, j + 1, 0), P(i, j + 1, 0)], TOP);
    for (i = 0; i < 3; i++) for (k = 0; k < 3; k++)          // 左前面：b=3 平面
      out += cell([P(i, 3, k), P(i + 1, 3, k), P(i + 1, 3, k + 1), P(i, 3, k + 1)], LEFT);
    for (j = 0; j < 3; j++) for (k = 0; k < 3; k++)          // 右前面：a=3 平面
      out += cell([P(3, j, k), P(3, j + 1, k), P(3, j + 1, k + 1), P(3, j, k + 1)], RIGHT);

    return out;
  }

  /* ---------- 应用清单 ---------- */
  var APPS = [
    {
      id: 'rubiks-cube',
      name: '3D 魔方',
      desc: 'Three.js 交互式魔方 · 2~7 阶 · 分步学习',
      url: 'apps/rubiks-cube.html',
      tags: ['魔方', 'rubik', 'cube', '3d', 'three.js', 'webgl', '游戏', 'puzzle'],
      badge: 'NEW',
      glow: 'rgba(47,107,237,.30)',
      icon: tile('appIconCube', '#2A3044', '#151824', isoCube())
    }
  ];

  global.APPS = APPS;
  global.appTile = tile;

})(window);
