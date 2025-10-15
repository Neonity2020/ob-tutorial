"use client";

import React from "react";
import { GithubCTAButtons } from "@/components/github-cta-buttons";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BookOpenText, Brain, Sparkles, Lightbulb, Workflow, GraduationCap } from "lucide-react";

export function LandingPageContent() {
  // TODO: 请将这些占位符替换为你的实际链接
  const githubRepoUrl = "https://github.com/YOUR_GITHUB_REPO_URL";
  const downloadLink = "https://github.com/YOUR_GITHUB_REPO_URL/archive/refs/heads/main.zip"; // 示例：直接下载主分支zip

  const features = [
    {
      icon: BookOpenText,
      title: "渐进式学习",
      description: "从Obsidian基础操作到高级功能，循序渐进，轻松掌握。",
    },
    {
      icon: Brain,
      title: "高效知识管理",
      description: "学习如何构建关联性强的知识网络，提升信息检索与思考效率。",
    },
    {
      icon: Sparkles,
      title: "高级技巧揭秘",
      description: "探索插件、模板、CSS片段等，让你的Obsidian更强大。",
    },
    {
      icon: Lightbulb,
      title: "实战案例指导",
      description: "通过具体案例，将所学知识应用于个人项目和工作流。",
    },
  ];

  const learningSteps = [
    {
      step: 1,
      title: "基础入门",
      description: "了解Obsidian界面、基本操作和Markdown语法。",
    },
    {
      step: 2,
      title: "核心功能",
      description: "掌握双向链接、标签、嵌入等核心知识管理功能。",
    },
    {
      step: 3,
      title: "插件与自动化",
      description: "学习如何安装和配置常用插件，提升效率。",
    },
    {
      step: 4,
      title: "高级应用",
      description: "探索图谱视图、Dataview等高级用法，构建个性化系统。",
    },
  ];

  return (
    <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-4 space-y-16 py-12">
      {/* Hero Section */}
      <div className="space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
          Obsidian 零基础入门教程 Vault
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
          专为无编程基础的用户设计，通过这个渐进式学习的Obsidian教程Vault，轻松掌握Obsidian的强大功能，构建你的个人知识库。
        </p>
        <p className="text-base text-muted-foreground">
          从基础操作到高级技巧，一步步带你探索Obsidian的无限可能。
        </p>
        <GithubCTAButtons githubRepoUrl={githubRepoUrl} downloadLink={downloadLink} />
      </div>

      {/* Features Section */}
      <section className="w-full">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">核心特性</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col items-center text-left h-full">
              <CardHeader className="pb-4">
                <feature.icon className="h-10 w-10 text-primary mb-4" />
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground flex-grow">
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="w-full">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">学习路径</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {learningSteps.map((step, index) => (
            <Card key={index} className="flex flex-col items-start p-4 text-left h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground text-lg font-bold mb-4">
                  {step.step}
                </div>
                <CardTitle className="text-xl font-semibold">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground flex-grow">
                <CardDescription>{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <div className="w-full pt-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">立即开始你的Obsidian之旅！</h2>
        <GithubCTAButtons githubRepoUrl={githubRepoUrl} downloadLink={downloadLink} />
      </div>
    </div>
  );
}