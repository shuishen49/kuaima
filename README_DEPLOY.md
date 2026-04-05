# kuaima 静态站部署说明（EdgeOne Pages）

## 目录
上传整个 `web-static` 目录内容：

- `index.html`
- `styles.css`
- `app.js`
- `static/`
- `404.html`

## EdgeOne Pages 操作
1. 新建项目（静态站）
2. 上传 `web-static` 目录
3. 构建命令留空（纯静态）
4. 输出目录设为根目录 `/`
5. 发布

## 路由说明
- 当前使用 Hash 路由（`#/worker` / `#/bossOrder`）
- 刷新不会丢页面状态
- 即使 404 回退到 `index.html` 也能继续访问

## 本地预览
直接双击 `index.html` 或使用本地静态服务器。

## 已知限制
- 当前为前端演示版，不含真实登录/支付/聊天/定位接口。
- 订单数据为演示数据，可后续接 API。
