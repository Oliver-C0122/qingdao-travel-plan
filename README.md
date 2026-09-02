# 青岛旅行计划

这是一个 React + Vite 旅行地图页面，不需要地图 API key。

## 文件

- `index.html`：Vite 入口页面
- `src/main.jsx`：React 挂载入口
- `src/App.jsx`：应用主组件
- `src/components/`：地图、时间轴、卡片、Action Sheet、弹窗组件
- `styles.css`：Apple 设计系统与 `awesome-design-md` 两套主题
- `data.js`：青岛 4 天行程地点、坐标、支付方式、预约信息
- `src/deepLinks.js`：Apple Maps / Google Maps / 高德 / 小红书 / 大众点评跳转逻辑

## 开发

安装依赖：

```bash
npm install
```

启动开发服务器：

```bash
npm run dev
```

生产构建：

```bash
npm run build
npm run preview
```

## 功能说明

- 地图使用 Leaflet + CARTO/OpenStreetMap 瓦片，无需 API key。
- 左上角按天切换，地图与时间轴联动。
- 每个地点支持：
  - 📍 导航：Action Sheet 选择 Apple Maps / Google Maps / 高德地图 App。
  - 📕 小红书：正常手机浏览器唤起 App；微信 / 抖音等 WebView 自动降级到 H5 搜索页。
  - 🍜 大众点评：`food` / `drink` 类型自动启用，可关闭或自定义搜索词。
  - 📅 预约：部分地点展示预约提示。
  - 支付方式标签：信用卡 / 支付宝 / 交通卡 / 现金。
- 右上角可在默认 Apple 设计系统和 `awesome-design-md` 风格间切换。
