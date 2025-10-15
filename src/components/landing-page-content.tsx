"use client";

import React from "react";
import { GithubCTAButtons } from "@/components/github-cta-buttons";

export function LandingPageContent() {
  // TODO: 请将这些占位符替换为你的实际链接
  const githubRepoUrl = "https://github.com/YOUR_GITHUB_REPO_URL";
  const downloadLink = "https://github.com/YOUR_GITHUB_REPO_URL/archive/refs/heads/main.zip"; // 示例：直接下载主分支zip

  return (
    <div className="flex flex-col items-center text-center max-w-3xl mx-auto px-4">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
        Obsidian 零基础入门教程 Vault
      </h1>
      <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed">
        专为无编程基础的用户设计，通过这个渐进式学习的Obsidian教程Vault，轻松掌握Obsidian的强大功能，构建你的个人知识库。
      </p>
      <p className="mt-4 text-base text-muted-foreground">
        从基础操作到高级技巧，一步步带你探索Obsidian的无限可能。
      </p>
      <GithubCTAButtons githubRepoUrl={githubRepoUrl} downloadLink={downloadLink} />
    </div>
  );
}