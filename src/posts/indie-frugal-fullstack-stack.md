---
slug: indie-frugal-fullstack-stack
title: 独立全栈开发「穷鬼套餐」实战指南（前端+Serverless+BaaS+域名）
description: 用最低成本搭建可上线的全栈应用：前端（Dyad+Cursor 学生版+Claude via AnyRouter 试吃）、Serverless（Vercel）+BaaS（Supabase），以及域名（Spaceship）选购与上线清单。
date: 2025-10-21
sortOrder: 7
author: NEONITY
---

## 这是一套什么样的栈？

目标：以极低预算、尽量少的 DevOps 工作，把一个 MVP 级别的全栈产品快速上线，并且保持可迭代、可扩展。

- **前端**：Dyad + Cursor（学生）+ Claude（AnyRouter 试吃）
- **后端**：Serverless 部署（Vercel）+ BaaS（Supabase）
- **域名**：Spaceship 注册与解析

适用对象：独立开发者、学生开发者、兴趣项目、业务验证期的创业者。

---

## 成本与资源一览（以个人/学生为例）

- **Dyad**：按使用付费或免费额度；适合生成/改造前端代码与工作流
- **Cursor 学生版**：学生可申请优惠，代码补全与内联代理开发体验优秀
- **Claude（AnyRouter）试吃**：通过路由聚合平台获取试用配额；适合需求澄清、文案、代码审阅
- **Vercel（Hobby）**：免费层足够托管中小型前端和 Serverless API
- **Supabase（Free）**：免费层提供 Postgres、Auth、Storage、Realtime 等核心能力
- **Spaceship 域名**：年度费用依后缀不同，一般 ¥50~¥80/年 起

备注：当并发量/流量增长时，再按需升级 Vercel 与 Supabase 套餐即可，迁移成本低。

---

## 01 前端：Dyad + Cursor（学生）+ Claude（AnyRouter）

推荐工作方式：

1) 用 **Claude** 先做需求澄清与信息架构（IA）草图：页面、路由、关键组件、数据模型草案。
2) 在 **Dyad** 中用自然语言快速拉起页面骨架与组件，生成初版 UI 和状态流。
3) 切换到 **Cursor（学生）** 进行本地化开发：
   - 代码补全与重构
   - 将 Dyad 产物落地到仓库（Next.js + TypeScript + Tailwind + shadcn/ui）
   - 引入环境变量与打包配置
4) 让 **Claude** 做 PR 审阅与测试用例草拟（请求-响应边界、类型收紧、错误分支）。

前端落地要点：

- 项目结构：Next.js App Router（`src/app`）、组件分层（`src/components`）、业务模块化
- UI：Tailwind + shadcn/ui；优先复用现有组件
- 配置：`.env.local` 中写入 Supabase 公钥与 URL；通过 `@supabase/supabase-js` 初始化客户端
- 性能：使用图片优化、按需加载与 `react-cache`（或 `use`）的服务器组件数据抓取

---

## 02 Serverless + BaaS：Vercel + Supabase（Cloudflare 备注）

架构图（文字版）：

- 浏览器 ⇄ Vercel（前端静态资源 + Serverless Functions/Edge）
- Vercel Serverless Functions ⇄ Supabase（Postgres、Auth、Storage、Realtime）
- 备用/增强：Cloudflare（DNS、CDN、边缘缓存、Workers；可后续接入）

部署步骤（最小可行）：

1) Supabase 项目创建：
   - 新建 Project，记录 `SUPABASE_URL` 与 `ANON_KEY`
   - 在 SQL Editor 中创建最小数据表与 RLS 策略
2) 本地接入：
   - 安装 `@supabase/supabase-js`
   - 封装 `lib/supabaseClient.ts` 并在服务器组件/Actions 使用服务端 Key（放在 Vercel 环境变量）
3) Vercel 部署：
   - 连接 GitHub 仓库，一键 Deploy
   - 在 Project Settings → Environment Variables 写入：
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - 若有 Server Actions：`SUPABASE_SERVICE_ROLE_KEY`（切记仅服务端可见）
4) （可选）边缘/缓存：
   - 先使用 Vercel 默认边缘与缓存策略；流量起来后再引入 Cloudflare CDN/Workers 优化热点接口

常见坑位：

- RLS 策略没配导致读写失败：用 Auth Context 下的 Policy 测试
- 混用 anon 与 service role：前端只能用 anon，service role 仅在 serverless 中使用
- 预览环境变量缺失：Vercel Preview 与 Production 变量需分别设置

---

## 03 域名与解析：Spaceship

为什么选 Spaceship：

- 价格透明，续费友好
- 面板简洁，支持快速 DNS 解析与一键模板

绑定流程：

1) 购买域名后，进入 DNS 管理，添加：
   - `A` 或 `CNAME` 指向 Vercel 提供的域名/记录
2) 在 Vercel 项目 → Domains 中添加自定义域，完成验证与 SSL 配置
3) 等待生效（通常数分钟到数十分钟）

---

## 04 从 0 到上线：30 分钟最小闭环

1) 初始化仓库：`create-next-app` 或复用你现有模板
2) 用 Dyad 拉起页面与组件；Claude 校对需求与文案
3) Cursor 本地化接入 Supabase：登录/注册、会话守护、中间件保护路由
4) 推到 GitHub，Vercel 连接仓库自动部署
5) Spaceship 解析自定义域；Vercel 里添加域名完成 HTTPS

---

## 05 参考实现要点（代码层面）

- 认证流：`@supabase/auth-helpers-nextjs`（App Router 版本）
- 数据存取：Server Actions 封装数据库操作，前端使用 suspense + optimistic UI
- 存储：使用 Supabase Storage；公有/私有桶分离，签名 URL 下载
- 实时：订阅频道进行轻量实时刷
- 观测：Vercel Analytics/Speed Insights；必要时接入 Logflare/Sentry

---

## 06 何时升级与扩展？

- 并发上涨：升级 Vercel 计划，或将热点接口迁移到 Edge Functions/Cloudflare Workers
- 数据增长：升级 Supabase 实例规格；读多写少场景引入只读副本
- 复杂域名与网络：将 DNS 切到 Cloudflare，使用 WAF、Rate Limit、KV/Queues

---

## 清单（Checklist）

- [ ] 仓库初始化 + Next.js 模板
- [ ] Supabase 项目 + 表结构 + RLS
- [ ] 环境变量：本地、Vercel Preview、Vercel Production
- [ ] 鉴权流与受保护路由
- [ ] 部署到 Vercel
- [ ] Spaceship 域名绑定与 HTTPS
- [ ] 基本监控与日志

---

## 总结

这套「穷鬼套餐」强调以最低成本实现从 0 到 1 的产品上线能力：

- **AI 辅助工程**（Dyad + Cursor + Claude）提升研发效率
- **Serverless + BaaS**（Vercel + Supabase）降低后端门槛
- **Spaceship 域名**简化上域发布流程

当产品获得增长信号后，再按需升级（算力、数据库、边缘网络与观测），迁移与扩展路径都很清晰。


