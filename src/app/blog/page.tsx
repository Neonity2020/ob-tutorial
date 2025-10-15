import React from "react";
import { getAllBlogPosts } from "@/lib/blog";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "教程博客 - Obsidian 零基础入门教程 Vault",
  description: "Obsidian 零基础入门教程的博客文章列表。",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
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