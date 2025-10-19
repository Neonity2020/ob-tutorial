# Obsidian 零基础入门教程 Vault

> 🌟 专为无编程基础的用户设计，通过这个渐进式学习的Obsidian教程Vault，轻松掌握Obsidian的强大功能，构建你的个人知识库。

[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Dyad AI](https://img.shields.io/badge/Built_with-Dyad_AI-purple?style=flat-square)](https://www.dyad.sh/)

## 📖 项目简介

这是一个完全由 [Dyad AI](https://www.dyad.sh/) 辅助构建的静态站点，展示了如何通过AI工具零代码构建现代化的Web应用。本项目不仅是一个Obsidian教程网站，更是一个展示AI辅助开发能力的典型案例。

### 🎯 核心特性

- **渐进式学习路径** - 从Obsidian基础操作到高级功能，循序渐进
- **高效知识管理** - 学习如何构建关联性强的知识网络
- **高级技巧揭秘** - 探索插件、模板、CSS片段等高级用法
- **实战案例指导** - 通过具体案例，将所学知识应用于实际项目
- **现代化技术栈** - Next.js 15 + React 19 + TypeScript + Tailwind CSS
- **AI辅助构建** - 完全使用Dyad AI零代码构建，展示AI开发能力

## 🚀 快速开始

### 环境要求

- Node.js 18.0 或更高版本
- pnpm（推荐）或 npm/yarn

### 安装与运行

1. **克隆项目**
   ```bash
   git clone https://github.com/Neonity2020/ob-tutorial.git
   cd ob-tutorial
   ```

2. **安装依赖**
   ```bash
   pnpm install
   # 或
   npm install
   # 或
   yarn install
   ```

3. **启动开发服务器**
   ```bash
   pnpm dev
   # 或
   npm run dev
   # 或
   yarn dev
   ```

4. **打开浏览器**
   
   访问 [http://localhost:3000](http://localhost:3000) 查看效果

## 📚 学习内容

### 基础入门
- Obsidian界面介绍与基本操作
- Markdown语法基础
- 创建你的第一篇笔记

### 核心功能
- 双向链接的创建与使用
- 标签系统的应用
- 嵌入与引用功能
- 搜索与筛选技巧

### 插件与自动化
- 常用插件推荐与安装
- 模板系统设置
- 自动化工作流构建
- CSS片段自定义

### 高级应用
- 图谱视图的深度使用
- Dataview插件应用
- 高级查询语法
- 个性化系统构建

## 🛠️ 技术栈

- **框架**: Next.js 15 (App Router)
- **前端**: React 19 + TypeScript
- **样式**: Tailwind CSS + Shadcn/UI
- **构建工具**: Dyad AI (AI辅助开发)
- **内容管理**: Markdown + Gray Matter
- **部署**: Vercel (推荐)

## 📁 项目结构

```
ob-tutorial/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # React组件
│   │   ├── ui/             # Shadcn/UI组件
│   │   └── blog/           # 博客相关组件
│   ├── lib/                # 工具函数
│   ├── posts/              # 博客文章 (Markdown)
│   ├── OB/                 # Obsidian教程内容
│   └── types/              # TypeScript类型定义
├── public/                 # 静态资源
└── ...配置文件
```

## 🤖 AI辅助开发

本项目完全使用 [Dyad AI](https://www.dyad.sh/) 构建，展示了AI辅助开发的能力：

- **零代码构建** - 通过自然语言描述需求，AI生成代码
- **实时预览** - 修改代码后立即看到效果
- **最佳实践** - 遵循现代前端开发标准
- **快速迭代** - 高效的需求实现与优化

## 📖 教程内容

### 在线教程
- [Obsidian基础设置与界面介绍](./src/posts/obsidian-basic-setup.md)
- [掌握双向链接：构建你的知识网络](./src/posts/mastering-bidirectional-links.md)
- [插件与自动化：提升你的效率](./src/posts/plugins-and-automation.md)
- [使用Dyad AI零代码构建本站点](./src/posts/building-this-site-with-dyad.md)

### Obsidian Vault内容
- 完整的Obsidian教程Vault
- 渐进式学习路径
- 实战案例与模板
- 前端知识概要

## 🚀 部署

### Vercel部署（推荐）

1. Fork本项目到你的GitHub账户
2. 在 [Vercel](https://vercel.com) 导入项目
3. 自动部署完成

### 其他平台

- **Netlify**: 支持静态站点部署
- **GitHub Pages**: 免费静态托管
- **自建服务器**: 支持Docker部署

## 🤝 贡献指南

欢迎贡献代码、文档或提出建议！

1. Fork本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [Obsidian](https://obsidian.md/) - 强大的知识管理工具
- [Dyad AI](https://www.dyad.sh/) - AI辅助开发平台
- [Next.js](https://nextjs.org/) - React全栈框架
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的CSS框架
- [Shadcn/UI](https://ui.shadcn.com/) - 现代化UI组件库

## ⭐ 支持项目

如果这个项目对你有帮助，请给一个Star ⭐，这对我非常重要！

---

**构建你的知识网络，从Obsidian开始！** 🚀
