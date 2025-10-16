import React from "react";
import { getAllBlogPosts } from "@/lib/blog";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export const metadata = {
  title: "Obsidian教程博客",
  description: "Obsidian 零基础入门教程的博客文章列表。从Obsidian基础设置到高级技巧，包含双向链接、插件配置、工作流优化等实用教程。",
  keywords: ["Obsidian教程", "Obsidian博客", "知识管理教程", "PKM教程", "双向链接教程", "Obsidian插件", "Obsidian工作流", "Markdown教程", "个人知识库", "Obsidian入门指南"],
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <Link href="/"> {/* Link 包裹 Button */}
          <Button variant="ghost" className="flex items-center gap-2"> {/* 移除 asChild */}
            <Home className="h-4 w-4" />
            返回首页
          </Button>
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-center mb-4">教程博客</h1>
      <p className="text-lg text-muted-foreground text-center mb-8">
        在这里，你可以找到关于 Obsidian 基础、高级技巧和工作流的教程文章。
      </p>
      <Separator className="mb-12" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}