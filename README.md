# Awesome Homepage

一个自用的个人导航主页：左边收藏常去的站点，中间放自己做的小应用，下面盯着关注的 GitHub 项目。
纯静态、零构建、无框架，一个 `index.html` 加几个配置文件就够跑。

**在线地址**：<https://intelligent-guoxin.github.io/awesome-homepage/>

---

## 功能

### 导航（Links）
- 分类整理的常用站点，配置写在 `links.js`
- 标签行可展开，支持按标签筛选 + 标签搜索
- 顶部搜索框支持四个引擎一键切换：**Google / GitHub / Stack Overflow / npm**，回车直接跳转
- 按 `/` 聚焦搜索框，`Esc` 退出当前标签页

### 应用中心（Apps）
Launchpad 风格的应用网格，图标是手写的 SVG，没有图片资源。当前收录 5 个：

| 应用 | 说明 | 入口 |
| --- | --- | --- |
| 车载电台 | Euro Truck Simulator 2 内置 Game Radio 播放器，5 个频道共 130 首 | `apps/game-radio/` |
| 汉字造物炉 | 取两个部件铸一个字，真字给音义、假字用反切拟音 | `apps/hanzi-forge.html` |
| 曙光 7102 | 三波段台式收音机，纯 CSS/SVG 复刻面板 | `apps/shuguang-radio.html` |
| 雨夜便利店 | HOSHINO MART 雨夜街角三渲二微缩场景（Three.js） | `apps/hoshino-mart.html` |
| 3D 魔方 | 交互式魔方，2~7 阶，带分步学习 | `apps/rubiks-cube.html` |

每个应用都是**独立页面**（单文件 HTML，或带资源的目录 + `index.html`），跟主页只通过链接关联，互不依赖，可以单独打开。

### 仓库收藏（Repos）
- 卡片式展示关注的 GitHub 项目，支持按名称 / 描述 / 标签搜索
- 星标数、主要语言、建库日期通过 GitHub 公开接口实时拉取，结果缓存 30 分钟，避免把免鉴权额度（60 次/小时）烧光
- 接口超限或离线时自动回落到 `repos.js` 里写死的兜底值

### 其他
- 首屏会随机拉一首诗（`poetry.palemoky.com`），纯装饰，接口挂了不影响页面
- 响应式布局，手机端标签栏横向滑动

---

## 目录结构

```
awesome-homepage/
├── index.html              主页面（样式、交互、渲染逻辑都在这一个文件里）
├── links.js                导航链接配置
├── apps.js                 应用注册表 + 图标 SVG
├── repos.js                仓库收藏配置
├── apps/
│   ├── game-radio/         车载电台（含 music/ 音频资源）
│   ├── hanzi-forge.html
│   ├── shuguang-radio.html
│   ├── hoshino-mart.html
│   ├── rubiks-cube.html
│   └── rubiks-cube-icon.svg
└── LICENSE
```

## 本地运行

页面本身是静态的，直接双击 `index.html` 也能打开；但仓库实时数据、诗句接口和音频的随机读取（拖动进度条）需要走 HTTP，建议起个本地服务：

```bash
# 任意静态服务器都行
python -m http.server 8000

# 或者用附带的（支持 HTTP Range，Ogg 时长与进度条更准）
python apps/game-radio/serve.py 8000 .
```

然后访问 <http://127.0.0.1:8000/>。

## 新增内容

### 加一个导航链接
编辑 `links.js`，往对应分类的 `items` 里加一行：

```js
{ name: 'MDN Web Docs', desc: 'Web platform documentation', url: 'https://developer.mozilla.org' }
```

### 加一个应用
1. 把应用放进 `apps/`（单文件 HTML，或带资源的目录 + `index.html`）
2. 在 `apps.js` 的 `APPS` 数组里注册，图标用 `tile(id, 顶部色, 底部色, 内部图形)` 生成：

```js
{
  id: 'my-app',            // 唯一标识，同时用作 SVG 渐变 id，别重复
  name: '我的应用',
  desc: '一句话描述',
  url: 'apps/my-app.html',
  tags: ['关键词'],         // 参与应用搜索
  badge: 'NEW',            // 可选，右上角角标
  glow: 'rgba(255,180,84,.3)', // 可选，悬停辉光
  icon: tile('appIconMy', '#4A3520', '#161210', '<circle cx="48" cy="48" r="20" fill="#FFD79B"/>')
}
```

### 加一个仓库收藏
编辑 `repos.js`，最少只写 `url` 和 `created`：

```js
{ url: 'https://github.com/owner/repo', created: '2026-01-01', desc: '这是什么', tags: ['标签'] }
```

## 技术说明

- 纯 HTML + CSS + 原生 JavaScript，**没有构建步骤、没有 npm 依赖、没有框架**
- 字体走 Google Fonts（Fraunces / Noto Serif SC / JetBrains Mono / Inter Tight），离线时回落到系统字体
- 外部接口只有三个：GitHub 仓库信息、随机诗句、GitHub 头像（均为公开 GET）
- 部署方式：GitHub Pages，直接发布 `master` 根目录，push 即上线

## 许可

代码以 [MIT License](LICENSE) 开源，随便用、随便改，保留版权声明即可。

**例外**：`apps/game-radio/music/` 下的音频是 Euro Truck Simulator 2 游戏内置电台（Game Radio）的音乐素材，版权归各曲目权利人所有，**不在 MIT 许可范围内**。这部分仅作为个人从游戏本体提取、本地收听的用途保留，不建议再分发或商用；如需使用请自行取得授权。

---

<sub>Built for fun. Surviving is easy, thriving is hard.</sub>
