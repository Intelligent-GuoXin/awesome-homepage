/* ============================================================
   仓库收藏 · GitHub 项目收藏注册表
   ------------------------------------------------------------
   又发现一个好玩 / 好用的项目？往 REPOS 数组最前面加一行就行，
   首页的「仓库收藏」标签页会自动渲染 + 支持搜索，不用改 index.html。

   字段说明：
     url         仓库地址（必填，唯一标识）
     name        显示名（可选，默认取 owner/repo，一般不用写）
     desc        中文一句话说明（可选，默认空着不显示）
     tags        搜索关键词数组（可选）—— 写中文别名，方便日后自己搜
     stars       星标数「兜底值」（可选）—— 页面打开时会向 GitHub 实时刷新，
                 只有请求失败 / 额度用尽时才回落到这个值，所以不用手动维护
     lang        主要语言（可选，同样会被实时数据覆盖）
     created     建库日期 YYYY-MM-DD（可选，但建议填）
                 —— 建库时间永不变化，填了就离线也能显示；
                    不填则由实时接口补上

   最快录一条：只要 url + created，其余留空也能正常显示。
   ============================================================ */

var REPOS = [
  {
    url: 'https://github.com/wheresryan22/anatomy',
    desc: 'Agent Skill：把真实机器和复杂系统画成精致可交互的等距插画，输出 SVG + WebGL/3D 动效',
    tags: ['等距插画', '轴测图', '图解', '可视化', '原理', '机械', 'skill', 'agent-skill', 'claude', 'svg', 'webgl', '3d', 'javascript'],
    stars: 8764,
    lang: 'JavaScript',
    created: '2026-10-08'
  },
  {
    url: 'https://github.com/robbietilton/Compositor',
    desc: 'macOS 版 Photoshop 替代品 —— 原生 Swift 写的开源图片编辑器',
    tags: ['修图', '图像编辑', 'photoshop', 'macos', 'swift', '设计', '开源'],
    stars: 16006,
    lang: 'Swift',
    created: '2026-09-16'
  },
  {
    url: 'https://github.com/morluto/rea',
    desc: '用 AI Agent 逆向工程任何东西 —— 从应用行为一路到原生二进制',
    tags: ['逆向', '反编译', 'reverse', 'reverse-engineering', 'agent', 'ai', 'binary', 'ghidra', 'mcp', 'ctf', 'cli', 'typescript'],
    stars: 111926,
    lang: 'TypeScript',
    created: '2026-04-14'
  }
];
