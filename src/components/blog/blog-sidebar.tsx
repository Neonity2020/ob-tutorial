"use client";

import React, { useState, useEffect } from "react";
import { BlogPost } from "@/types/blog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Search, BookOpen, Tag, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import Image from "next/image";

interface BlogSidebarProps {
  posts: BlogPost[];
  currentSlug?: string;
}

export function BlogSidebar({ posts, currentSlug }: BlogSidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  // 新增：主题状态
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  // 过滤文章
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 获取文章分类（基于标题关键词）
  const getCategory = (title: string) => {
    if (title.includes("基础") || title.includes("入门")) return "基础教程";
    if (title.includes("链接") || title.includes("双向")) return "链接系统";
    if (title.includes("插件") || title.includes("自动化")) return "插件与自动化";
    if (title.includes("工作流") || title.includes("优化")) return "工作流优化";
    return "其他";
  };

  // 统计分类
  const categories = posts.reduce((acc, post) => {
    const category = getCategory(post.title);
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <aside className="w-full min-w-0 space-y-6">
      {/* Logo 区域（左：返回首页；右：明暗切换） */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/" className="group">
          <div className="relative w-32 h-16 text-primary group-hover:text-primary/80 transition-colors">
            <Image
              src="/ob-tutorial-logo.svg"
              alt="OB Tutorial"
              fill
              className="object-contain"
            />
          </div>
        </Link>

        {/* 明暗切换按钮 */}
        <button
          onClick={toggleTheme}
          aria-label={isDark ? "切换到浅色模式" : "切换到深色模式"}
          title={isDark ? "切换到浅色模式" : "切换到深色模式"}
          className="p-2 rounded-md hover:bg-accent transition-colors flex items-center justify-center"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* 搜索框 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Search className="h-5 w-5" />
            搜索文章
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="搜索文章标题或内容..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </CardContent>
      </Card>

      {/* 文章列表 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <BookOpen className="h-5 w-5" />
            文章列表
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`block p-3 rounded-lg border transition-colors hover:bg-accent ${
                currentSlug === post.slug
                  ? "bg-accent border-primary"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <h3 className="font-medium text-sm leading-tight mb-1 line-clamp-2">
                {post.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CalendarDays className="h-3 w-3" />
                <span>{post.date}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {post.description}
              </p>
            </Link>
          ))}
          {filteredPosts.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              没有找到匹配的文章
            </p>
          )}
        </CardContent>
      </Card>

      {/* 分类标签 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Tag className="h-5 w-5" />
            文章分类
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {Object.entries(categories).map(([category, count]) => (
              <Badge
                key={category}
                variant="secondary"
                className="text-xs"
              >
                {category} ({count})
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 最新文章 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">最新文章</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {posts.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block p-2 rounded-md hover:bg-accent transition-colors"
            >
              <h4 className="font-medium text-sm leading-tight mb-1 line-clamp-2">
                {post.title}
              </h4>
              <p className="text-xs text-muted-foreground">
                {post.date}
              </p>
            </Link>
          ))}
        </CardContent>
      </Card>
    </aside>
  );
}
