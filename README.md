# kuaima-web-static

快马日结静态 Web 版。

## 项目预览

### 首页

![快马日结首页预览](docs/screenshots/preview-home.png)

### 零工端

![快马日结零工端预览](docs/screenshots/preview-worker.png)

### 老板端

![快马日结老板端预览](docs/screenshots/preview-boss.png)

## 项目说明

这是将原 uni-app 小程序前端整理为可直接部署到 GitHub Pages / EdgeOne Pages 的静态 Web Demo 版本，包含：

- 身份选择页
- 零工端：首页 / 订单 / 消息 / 我的
- 老板端：首页 / 日结订单 / 消息 / 我的
- 适配静态托管的 hash 路由
- README / 部署 / UI / QA / 巡检日志等配套文档

## 目录说明

- `index.html`：入口页面
- `styles.css`：样式
- `app.js`：交互逻辑
- `static/`：静态资源
- `404.html`：静态托管 SPA 回退页

## 本地预览

直接打开 `index.html`，或用任意静态服务器托管。

## 在线预览

- GitHub Pages：首页 `https://shuishen49.github.io/kuaima/`
- 零工页：`https://shuishen49.github.io/kuaima/#worker`
- 老板页：`https://shuishen49.github.io/kuaima/#boss`

## 静态托管建议

- 构建输出目录：项目根目录（当前仓库根）
- 首页：`/index.html`
- 404：`/404.html`
- 支持 hash 路由，可直接访问如 `/#worker`

## 文档导航

- 部署说明：`docs/README_DEPLOY.md` 或仓库根 `README_DEPLOY.md`
- 产品 / UI / QA：`docs/PM_PLAN.md`、`docs/UI_GUIDE.md`、`docs/QA_CHECKLIST.md`
- 进度巡检日志：`docs/PROGRESS_LOG.md`
- 浏览器控制安装总结：`docs/AGENT_BROWSER_INSTALL_SUMMARY.md`

## 联系方式

- QQ：`93418328`
- 微信：`shuishen49`
