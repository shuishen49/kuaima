# agent-browser-clawdbot 安装过程总结

## 目标

安装这个 ClawHub 页面对应的能力：

- 页面：`https://clawhub.ai/matrixy/agent-browser-clawdbot`

目标分成两部分：

1. 安装 **skill 说明层**
2. 安装 **浏览器自动化本体（agent-browser CLI）**

---

## 一、最开始的直接安装尝试

一开始尝试的是标准 skills CLI 安装方式：

```bash
npx skills add matrixy/agent-browser-clawdbot -g -y
```

### 结果

失败。

报错核心现象：

- 安装器卡在 `Cloning repository`
- 之后超时
- 提示类似：
  - clone timed out after 60s
  - may happen with private repos / auth required

### 结论

这个条目 **不能稳定地通过 `npx skills add ...` 直接装下来**。

原因大概率是：

- ClawHub 上有页面条目
- 但它不一定对应一个标准公开、可直接被 `skills` CLI 拉取的 skills 源
- 或者安装源需要额外认证 / 源地址不标准

---

## 二、进一步确认：skills CLI 侧也搜不到

又补做了一次查询：

```bash
npx skills find agent-browser-clawdbot
```

### 结果

返回：

```text
No skills found for "agent-browser-clawdbot"
```

### 结论

说明它至少 **不是一个能被当前 skills CLI 正常检索到的公开 skills 包**。

---

## 三、转为手工落地 skill

既然在线安装链路不稳定，就改成了最稳的方式：

### 手工创建本地 skill 目录

本地创建：

```text
C:\Users\shuis\.agents\skills\agent-browser-clawdbot\SKILL.md
```

### 写入内容

写入的是一份本地可用的 `SKILL.md`，主要包含：

- 这个 skill 是做什么的
- 适用场景
- 使用 `agent-browser` CLI 的推荐流程
- 状态保存 / 登录态 / auth.json 风险提醒
- 常见失败排查方法

### 结果

这一步完成后，**skill 说明层**已经本地可用。

也就是说：

- “怎么用 agent-browser” 这层已经落地
- 但此时还 **没有真正的浏览器自动化能力本体**

---

## 四、确认页面背后的真实项目

后面又查了一轮 ClawHub 页面内容，确认到它背后指向的核心项目更像是：

- `https://github.com/vercel-labs/agent-browser`

所以实际要获得“能控制浏览器”的能力，关键不是只装 skill，
而是要把 **`agent-browser` CLI 本体**装起来。

---

## 五、安装 agent-browser CLI 本体

因为本机开了代理：

- `127.0.0.1:7897`

所以安装时先设置代理环境变量。

### 1）先探测 npm 包是否可访问

执行：

```bash
HTTP_PROXY=http://127.0.0.1:7897
HTTPS_PROXY=http://127.0.0.1:7897
ALL_PROXY=http://127.0.0.1:7897
npm view agent-browser version
```

### 结果

成功拿到版本：

```text
0.24.1
```

说明 npm 通路是通的。

### 2）安装本体

执行：

```bash
npm install -g agent-browser
```

### 结果

安装成功。

随后验证：

```bash
agent-browser --version
agent-browser --help
```

### 结果

成功输出版本和完整命令帮助。

这一步说明：

- `agent-browser` CLI 本体已经安装好了

---

## 六、浏览器内核下载失败，但用本机 Chrome 兜底

安装完 CLI 后，按常规还尝试过：

```bash
agent-browser install
```

### 结果

失败。

失败点是：

- 下载 Chrome / Chromium 版本信息失败
- 访问：
  - `https://googlechromelabs.github.io/chrome-for-testing/last-known-good-versions-with-downloads.json`

### 结论

不是 CLI 本体坏了，
而是 **它自动下载浏览器内核这一步失败了**。

### 解决办法

不依赖它下载 Chromium，直接复用机器上已安装的浏览器。

本机检测到：

- `C:\Program Files\Google\Chrome\Application\chrome.exe`
- `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`

最终采用：

- `C:\Program Files\Google\Chrome\Application\chrome.exe`

通过环境变量指定：

```bash
AGENT_BROWSER_EXECUTABLE_PATH=C:\Program Files\Google\Chrome\Application\chrome.exe
```

---

## 七、最小可用验证

为了确认它真的能控制浏览器，而不是只装了个命令壳子，做了最小测试。

### 执行

```bash
agent-browser open https://example.com
agent-browser get title
agent-browser close --all
```

并指定：

- 使用本机 Chrome
- 使用代理

### 结果

成功返回：

```text
Example Domain
```

说明：

- 能打开网页
- 能读取页面标题
- 能正常关闭浏览器会话

也就是说：

**浏览器自动化能力已经真正打通**。

---

## 八、可见窗口测试

后面又进一步用 `--headed` 模式打开了可见浏览器窗口，访问：

- `https://shuishen49.github.io/kuaima/#worker`

这样可以确认：

- 不只是 headless 模式能跑
- 也可以真正拉起一个用户可见的浏览器窗口

中间出现过一次：

- daemon 仍在，但页面掉回 `about:blank`

处理方式是：

```bash
agent-browser close --all
agent-browser --headed open https://shuishen49.github.io/kuaima/#worker
```

重开后恢复正常。

---

## 九、最终结论

### 已完成

1. `agent-browser-clawdbot` 的 **skill 说明层** 已手工落地到本地：

```text
C:\Users\shuis\.agents\skills\agent-browser-clawdbot\SKILL.md
```

2. `agent-browser` CLI 本体已安装成功
3. 通过本机 Chrome 兜底，绕过了自动下载 Chromium 失败的问题
4. 已验证：
   - 能打开网页
   - 能读取页面
   - 能启动可见浏览器窗口

### 关键结论

这次不是靠 ClawHub 页面一键装成功的，而是靠下面这条路线打通的：

1. `npx skills add ...` 失败
2. 改为 **手工安装 skill 说明文件**
3. 单独安装 **agent-browser CLI 本体**
4. 自动下载浏览器失败后，改用 **本机 Chrome**
5. 做最小可用测试和可见窗口测试

---

## 十、给以后复用的最短路径

如果以后在类似环境下要复用，建议直接走这条：

### A. 手工放 skill

放到：

```text
C:\Users\shuis\.agents\skills\agent-browser-clawdbot\SKILL.md
```

### B. 安装本体

```bash
npm install -g agent-browser
```

### C. 指定代理

```bash
HTTP_PROXY=http://127.0.0.1:7897
HTTPS_PROXY=http://127.0.0.1:7897
ALL_PROXY=http://127.0.0.1:7897
```

### D. 不下载 Chromium，直接用本机 Chrome

```bash
AGENT_BROWSER_EXECUTABLE_PATH=C:\Program Files\Google\Chrome\Application\chrome.exe
```

### E. 验证

```bash
agent-browser open https://example.com
agent-browser get title
```

如果能拿到 `Example Domain`，说明就通了。
