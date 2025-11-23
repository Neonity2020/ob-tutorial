# 如何使用 Kimi K2 作为 Claude Code 的大模型
## windows

* 打开 windows 终端中的 powershell 终端
* windows 上安装 nodejs
* 右键按 Windows 按钮，点击「终端」
* 然后依次执行下面的

```bash
winget install --id Git.Git -e --source winget # 或者参考 https://git-scm.com/install/windows 用其他办法安装 Git
winget install OpenJS.NodeJS # 或者参考 https://nodejs.org/zh-cn/download 用其他办法安装 Node.js
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned

# 然后关闭终端窗口，新开一个终端窗口

# 安装 claude-code
npm install -g @anthropic-ai/claude-code --registry=https://registry.npmmirror.com

# 初始化配置
node --eval "
    const homeDir = os.homedir();
    const filePath = path.join(homeDir, '.claude.json');
    if (fs.existsSync(filePath)) {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        fs.writeFileSync(filePath, JSON.stringify({ ...content, hasCompletedOnboarding: true }, null, 2), 'utf-8');
    } else {
        fs.writeFileSync(filePath, JSON.stringify({ hasCompletedOnboarding: true }), 'utf-8');
    }"
```

### 配置 Kimi For Coding 模型

完成 Claude Code 安装后，请按照以下方式设置环境变量使用 Kimi For Coding 模型。

```bash
$env:ANTHROPIC_BASE_URL="https://api.kimi.com/coding/";
$env:ANTHROPIC_API_KEY="sk-kimi-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"  # 这里填在会员页面生成的 API Key

claude
```
#### 确认环境变量是否生效

启动 Claude Code 后，在命令输入框输入 `/status`，确认模型状态。

接下来就可以使用 Claude Code 进行开发了！

```bash
$env:ANTHROPIC_BASE_URL="https://api.kimi.com/coding/";
$env:ANTHROPIC_API_KEY="sk-kimi-G3Dn0XNMDwzvIwov6dazvPaq0GefT0fns3m8DGHXi2pXkbb38meKiXvCt075DKlA"
```

```powershell
[Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY","sk-kimi-G3Dn0XNMDwzvIwov6dazvPaq0GefT0fns3m8DGHXi2pXkbb38meKiXvCt075DKlA","User")
```