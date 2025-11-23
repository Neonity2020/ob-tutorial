---
title: "Zero configuration NextJS deployment to a self hosted VPS with Kamal. A comprehensive guide."
source: "https://ronald.ink/zero-configuration-nextjs-deployment-to-a-self-hosted-vps-with-kamal-a-comprehensive-guide/"
author:
  - "[[Ronald Langeveld]]"
published: 2025-10-29
created: 2025-11-02
description: "One of the biggest quality of life improvements when it comes to deploying over the past few months has been learning how to use Kamal and have learnt to use it properly without getting lost in the complexities.Kamal is a simple tool for deploying web apps to any server"
tags:
  - "clippings"
---
零配置使用 Kamal 将 NextJS 部署到自托管 VPS 全面指南

* 9 分钟阅读


在过去的几个月里，关于部署的最大生活质量改进之一是学习如何使用 [Kamal](https://kamal-deploy.org/?ref=ronald.ink)，并学会了正确使用它，而不会迷失在复杂性中。

Kamal 是一个简单的工具，用于使用 Docker 容器将 Web 应用程序部署到任何服务器，且无需停机。虽然最初是为与 Rails 一起使用而开发的，但它可以用于部署几乎任何 Web 应用程序到 Web。

最好的事情是，它可以在新的 VPS 上设置，而无需你登录服务器——Kamal 为你处理一切，使其真正成为服务器上的零配置部署。随着最新的 Kamal， `2.8.2` 它甚至更容易，因为你甚至不需要担心访问 Docker 注册表。

[Hetzner](https://hetzner.cloud/?ref=2rRWvBWV6ubW)
在这个例子中，我将向你展示如何使用 Kamal 将 NextJS 应用程序部署到一个全新的 VPS 上。我现在选择的 VPS 提供商是 Hetzner，但你可以选择任何你喜欢的提供商，只要它能够运行基于 Linux 的操作系统。

💡

这是一个非常全面的教程。作为“全面”的一部分，我将包括你可能会遇到的一些错误，作为学习曲线的一部分，因为这将帮助你更好地理解 Kamal 的工作原理。

入门相对简单，门槛较低，但我假设你能够熟悉开发环境。

具体如下：

## 💡假设

- 你使用 MacOS、Linux 或 Windows 上的 WSL。
- 已安装 Docker
- 已设置好 VPS 并可以使用 SSH 密钥以 root 用户登录。
- 已设置好域名 DNS，指向你的 VPS 的 IP 地址。
- 熟悉 NextJS——但我将逐步设置所有内容，以便在本指南结束时，你可以部署 NextJS 以外的项目。
- 对终端和代码编辑器有一定的了解。我使用的是 MacOS 的默认终端和 VSCode
- 在你的机器上安装了 Ruby——MacOS 和某些 Linux 发行版已经预装了它。
- 具备一些 git 知识。

现在调用你选择的终端。

我将创建一个名为 `next-kamal` 的新 NextJS 项目，通过在选择的文件夹中运行 `npx create-next-app@latest next-kamal` 并使用所有默认设置进行安装。你可以将其命名为任何名称或使用现有的 NextJS 项目。

![](https://ronald.ink/content/images/size/w600/2025/10/Screenshot-2025-10-29-at-8.20.06---am.png)

导航到 http://localhost:3000

你应该会看到这个页面，显示一切正常
此外，在终端中，运行 `gem install kamal` 在你的系统上全局安装 Kamal。更多详细信息请查看官方安装指南[official installation guide](https://kamal-deploy.org/docs/installation/?ref=ronald.ink)。

现在让我们在本地运行 NextJS 应用，以确保它已正确安装 `npm run dev` 。

![](https://ronald.ink/content/images/size/w600/2025/10/Screenshot-2025-10-29-at-8.41.09---am.png)

导航到 http://localhost:3000 ，你应该会看到这个页面，显示一切正常。

完成后，我将在 VSCode 中打开 `next-kamal` 。

现在让我们关注 Kamal。

首先，我将运行 `kamal init` 。

![](https://ronald.ink/content/images/size/w600/2025/10/Screenshot-2025-10-29-at-8.34.07---am.png)

在我的示例中，我使用的是子域名 nextkamal.ronald.ink

这将创建几个文件和文件夹，分别是 `.kamal` 、 `config/` 和 `deploy.yml` 。现在不用担心它们。

由于 Kamal 基于 Docker，我们需要在我们的项目中设置一个 `Dockerfile` 。Vercel 为我们提供了一个 Dockerfile，我们可以几乎原样使用他们 Github 仓库[Github repository](https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile?ref=ronald.ink)中的文件，我们将直接将其复制到我们的项目中。

```
# syntax=docker.io/docker/dockerfile:1

FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
# ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
```

Kamal 将使用这些构建步骤作为您项目的基准，最后 Kamal 会转发这个容器。您可以做的一件事是注释掉（或删除） `ENV HOSTNAME` ，因为那将是 Kamal 后续需要考虑的问题。

接下来，前往您的 VPS 主机并获取服务器的 IP 地址。以我为例，它是 `37.27.213.124` 。

![](https://ronald.ink/content/images/size/w600/2025/10/Screenshot-2025-10-29-at-9.06.40---am.png)

在我的示例中，我使用的是子域名 nextkamal.ronald.ink

如果你还没有这样做，现在是时候通过你的域名注册商将你的域名指向服务器的 IP 地址了。

![](https://ronald.ink/content/images/size/w600/2025/10/Screenshot-2025-10-29-at-9.14.22---am.png)

在我的示例中，我使用的是子域名 nextkamal.ronald.ink

我们现在需要填充我们的 `deploy.yml` 文件。这个文件是 Kamal 的核心，既充当代理配置（可以想象成 Nginx、Apache、Traefik 等），也像是一个 `docker-compose` 的集合。如果你不知道那是什么，不必过于担心。

将你的 deploy.yml 更新为大致匹配这个片段：

```
# deploy.yml
# Name of your application. Used to uniquely configure containers.
service: my-next-app 

# Name of the container image.
image: my-next-app

# Deploy to these servers.
servers:
  web:
    - 37.27.213.124
  # job:
  #   hosts:
  #     - 192.168.0.1
  #   cmd: bin/jobs

# Enable SSL auto certification via Let's Encrypt and allow for multiple apps on a single web server.
# Remove this section when using multiple web servers and ensure you terminate SSL at your load balancer.
#
# Note: If using Cloudflare, set encryption mode in SSL/TLS setting to "Full" to enable CF-to-app encryption.
proxy:
  ssl: true
  host: nextkamal.ronald.ink
  # Proxy connects to your container on port 80 by default.
  app_port: 3000
```
  
对于这个简单的教程，你可能只需要修改的只有这几行代码：  

在你的 `deploy.yml` 中 `service` 、 `image` 、 `web` 和 `proxy` 。服务名称和镜像名称几乎可以是任何内容。注意， `app_port` 需要取消注释。默认情况下它是注释的。

现在，确保您的计算机上正在运行 Docker。剩下的所有工作就是在项目的根目录下从终端运行 `kamal setup` 。

### 运行它，并等待所有操作完成后继续。

![](https://ronald.ink/content/images/size/w600/2025/10/Screenshot-2025-10-29-at-9.31.07---am.png)

现在如果你按照这个教程一步步操作，你可能也会遇到这个错误。我决定包含它，因为其他地方没有很好地记录，而且这是值得学习、早期捕获并习惯的事情。

问题是，Kamal 只会推送你通过 git 提交的更改（它不需要推送到远程仓库）。

所以继续进行并提交，我会提交所有内容：

`git add .   git commit -m "Added kamal configs"`

现在继续运行 `kamal setup` 。

事实证明，这次我们有不同的错误：

```
#21 ERROR: failed to calculate checksum of ref ynp0ra4asni8b66bpcy9w7tpp::yy7pjlflbav0282kte32wd0vl: "/app/.next/standalone": not found
------
 > [runner 5/6] COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./:
------
Dockerfile:54
--------------------
  52 |     # Automatically leverage output traces to reduce image size
  53 |     # https://nextjs.org/docs/advanced-features/output-file-tracing
  54 | >>> COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
  55 |     COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
  56 |     
--------------------
ERROR: failed to build: failed to solve: failed to compute cache key: failed to calculate checksum of ref ynp0ra4asni8b66bpcy9w7tpp::yy7pjlflbav0282kte32wd0vl: "/app/.next/standalone": not found
docker stderr: Nothing written
```

我们需要在 NextJS 的配置中做一个改变， `next.config.ts` 以将其构建为独立应用。添加 `output: 'standalone'` 。

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
};

export default nextConfig;
```

现在提交这些更改

`git add .   git commit -m "Added output settings to Next config"`

然后再次让我们回到 `kamal setup` 。

This might take about 2 minutes till you hit one more error:  
这可能需要大约 2 分钟，直到你遇到另一个错误：

![](https://ronald.ink/content/images/size/w600/2025/10/Screenshot-2025-10-29-at-9.47.54---am.png)

### 它说无法变得健康？

所以与 Rails 不同，Rails 自带健康检查路由，而 NextJS 非常精简，默认情况下没有内置健康检查路由。

在底层，Kamal 会尝试请求一个 `/up` 路由来检查站点是否健康。如果你的项目中没有这个路由，假设其他一切正常，你将会遇到健康检查错误。

我们可以通过让它使用我们网络应用程序的根 URL 路径来覆盖该设置，以适应我们的目的。

将 `healthcheck` 设置添加到 `deploy.yml` 中。

```
#deploy.yml

proxy:
  ssl: true
  host: nextkamal.ronald.ink
  # Proxy connects to your container on port 80 by default.
  app_port: 3000
  healthcheck:
    path: "/"
    interval: 15
    timeout: 10
```

让我们提交这些更改并再次尝试。

`git add .   git commit -m "Added health check to deploy.yml"`

再运行一次 `kamal setup` 。

![](https://ronald.ink/content/images/size/w600/2025/10/Screenshot-2025-10-29-at-10.03.25---am.png)

这次，如果一切按预期进行，你现在已经在你的 VPS 上部署了 NextJS 应用！前往你设置的域名，它应该可以正常渲染！

![](https://ronald.ink/content/images/size/w600/2025/10/Screenshot-2025-10-29-at-10.05.11---am.png)

健康检查的原因是，Kamal 会首先检查新容器的健康状况，然后再将其上线，以确保您的网站不会在部署不成功时出现故障。

现在你已经用 Kamal 设置好了 VPS 实例，后续的 Kamal 部署可以通过运行 `kamal deploy` 来触发。就是这么简单！就像从你的终端就能拥有 Heroku 或 Vercel 一样。

 [Pieter Levels](https://x.com/levelsio?ref=ronald.ink) 
所以，初始设置可能比通过 Vercel 部署稍微复杂一些，但它是在你自己的基础设施上运行，并为你打开了在"无服务器"环境中部署时不可能实现的一些功能，例如直接在服务器上存储媒体资源，使用 SQLite 与 NextJS，有点像 Pieter Levels 的风格，但使用的是 NextJS 而不是 PHP——关于这一点，我们将在未来的教程中详细讲解，请留下你的邮箱地址，你将最先得知！

话虽如此，我将在接下来的几周里展示如何使用 Kamal 部署其他网站栈，例如 PHP、Django（Python）、NestJS 等！如果你有任何其他建议，请在下方评论！

💡

虽然本指南解释了所有开始运行所需的内容，但在涉及保护服务器时，请进行一些研究。😄

### Ronald Langeveld 罗纳德·兰格维尔德

软件工程师，喜欢创造事物，享受使用 node、ruby、react、django。