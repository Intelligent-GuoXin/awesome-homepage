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

  /* ---------- 雨夜便利店图标（HOSHINO MART） ---------- */
  function martGlyph() {
    return '' +
      // 暖光橱窗
      '<rect x="18" y="48" width="60" height="25" rx="2" fill="#FFC98A"/>' +
      '<rect x="18" y="48" width="60" height="10" fill="#FFE6C2" opacity=".8"/>' +
      // 竖梃
      '<path d="M38 48v25M58 48v25" stroke="#2A3038" stroke-width="2" opacity=".45"/>' +
      // 店内货架剪影
      '<rect x="21" y="58" width="10" height="15" fill="#C8493F" opacity=".55"/>' +
      '<rect x="21" y="58" width="10" height="5" fill="#F2C53D" opacity=".55"/>' +
      '<rect x="41" y="60" width="9" height="13" fill="#3D8FC0" opacity=".45"/>' +
      // 雨棚
      '<rect x="15" y="44" width="66" height="4" rx="2" fill="#E8F3EA"/>' +
      // 招牌
      '<rect x="16" y="25" width="64" height="18" rx="2.6" fill="#0A6B42"/>' +
      '<rect x="17.2" y="26.2" width="61.6" height="15.6" rx="2" fill="none" stroke="rgba(160,255,205,.55)" stroke-width="1.1"/>' +
      // 星标
      '<path d="M26 29 l1.9 4.9 4.9 1.9 -4.9 1.9 -1.9 4.9 -1.9 -4.9 -4.9 -1.9 4.9 -1.9 z" fill="#F6FFFC"/>' +
      // 标题条
      '<rect x="37" y="30.4" width="30" height="5" rx="2.5" fill="#FFFFFF"/>' +
      '<rect x="37" y="38" width="19" height="2.8" rx="1.4" fill="#9FE9C4"/>' +
      // 24H 徽标
      '<rect x="69" y="29" width="11" height="8" rx="1.5" fill="#F7C74A"/>' +
      // 湿地反光
      '<rect x="24" y="74" width="3.4" height="6" rx="1.7" fill="#FFC98A" opacity=".5"/>' +
      '<rect x="36" y="76" width="2.6" height="4" rx="1.3" fill="#9FE9C4" opacity=".42"/>' +
      '<rect x="52" y="75" width="3.4" height="5" rx="1.7" fill="#FFC98A" opacity=".35"/>' +
      '<rect x="66" y="76" width="2.4" height="4" rx="1.2" fill="#BFE4FF" opacity=".34"/>';
  }

  /* ---------- 曙光 7102 收音机图标 ---------- */
  function radioGlyph() {
    return '' +
      // 木箱机身
      '<rect x="11" y="19" width="74" height="58" rx="4.5" fill="#5C3B24"/>' +
      '<rect x="11" y="19" width="74" height="2.4" rx="1.2" fill="rgba(255,225,190,.26)"/>' +
      '<rect x="11.8" y="19.8" width="72.4" height="56.4" rx="3.9" fill="none" stroke="rgba(0,0,0,.35)" stroke-width="1.5"/>' +
      // 喇叭布 + 织纹
      '<rect x="16" y="27" width="38" height="43" rx="2" fill="#B49C76"/>' +
      '<path d="M23 27v43M30 27v43M37 27v43M44 27v43M51 27v43" stroke="rgba(72,46,22,.15)" stroke-width=".9"/>' +
      '<rect x="16" y="27" width="38" height="43" rx="2" fill="none" stroke="rgba(18,10,5,.55)" stroke-width="1.4"/>' +
      // 刻度盘：暖黄底 + 稀疏刻度 + 红指针
      '<rect x="59" y="27" width="22" height="15" rx="1.8" fill="#F6DDB0"/>' +
      '<path d="M59 38.5h22" stroke="rgba(92,52,20,.28)" stroke-width=".8"/>' +
      '<path d="M62 35.6v2.9M66 34.6v3.9M73.5 34.6v3.9M77.5 35.6v2.9" stroke="rgba(92,52,20,.34)" stroke-width=".8"/>' +
      '<rect x="68.2" y="27.6" width="1.5" height="13.8" fill="#D8462A"/>' +
      // 猫眼调谐指示管
      '<circle cx="70" cy="50" r="5.4" fill="#123B24"/>' +
      '<circle cx="70" cy="50" r="4.1" fill="#3BE38C"/>' +
      '<circle cx="70" cy="50" r="4.1" fill="none" stroke="rgba(200,255,225,.45)" stroke-width=".7"/>' +
      // 两个旋钮
      '<circle cx="63.6" cy="62.6" r="5.2" fill="#2C1D12"/>' +
      '<circle cx="63.6" cy="62.6" r="2.1" fill="#C0A87E"/>' +
      '<circle cx="76.4" cy="62.6" r="5.2" fill="#2C1D12"/>' +
      '<circle cx="76.4" cy="62.6" r="2.1" fill="#C0A87E"/>';
  }

  /* ---------- 应用清单 ---------- */
  var APPS = [
    {
      id: 'shuguang-radio',
      name: '曙光 7102',
      desc: '七十年代三波段台式收音机 · 实时合成电台 · 拧旋钮真能听',
      url: 'apps/shuguang-radio.html',
      tags: ['收音机', 'radio', '老物件', '怀旧', '70年代', '复古', 'three.js', 'webgl', '3d', '拟物', '合成音频', 'web audio', '猫眼管', '调频'],
      badge: 'NEW',
      glow: 'rgba(255,150,60,.30)',
      icon: tile('appIconRadio', '#4A2E1C', '#160D07', radioGlyph())
    },
    {
      id: 'hoshino-mart',
      name: '雨夜便利店',
      desc: 'HOSHINO MART 雨夜街角 · 三渲二微缩模型 · 纯程序化生成',
      url: 'apps/hoshino-mart.html',
      tags: ['便利店', 'hoshino', 'mart', '微缩', '场景', '雨夜', '三渲二', 'cel', '卡通渲染', '霓虹', '治愈', '3d', 'three.js', 'webgl', 'diorama'],
      badge: 'NEW',
      glow: 'rgba(60,200,140,.28)',
      icon: tile('appIconMart', '#1E4B3C', '#0B1512', martGlyph())
    },
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
