import React from "react";
import { getAllBlogPosts, getLatestBlogPosts } from "@/lib/blog";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { BlogSidebar } from "@/components/blog/blog-sidebar";
import { MobileMenu } from "@/components/blog/mobile-menu";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import PrefetchPosts from "@/components/blog/prefetch-posts";

export const metadata = {
  title: "Obsidian教程博客",
  description: "Obsidian 零基础入门教程的博客文章列表。从Obsidian基础设置到高级技巧，包含双向链接、插件配置、工作流优化等实用教程。",
  keywords: ["Obsidian教程", "Obsidian博客", "知识管理教程", "PKM教程", "双向链接教程", "Obsidian插件", "Obsidian工作流", "Markdown教程", "个人知识库", "Obsidian入门指南"],
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const latestPosts = getLatestBlogPosts(3);

  // 在客户端组件中预抓取若干博文页面（提升首次打开速度）
  // PrefetchPosts 会在客户端调用 next/navigation 的 router.prefetch
  // 仅预抓取路由代码与数据，不影响服务器渲染
  return (
    <div className="container mx-auto px-4 py-12">
      <PrefetchPosts posts={posts} />
      <div className="flex flex-col lg:flex-row lg:gap-8">
        {/* 主内容区域 */}
        <main className="lg:flex-[3_1_0%] lg:min-w-0">
          <div className="mb-8 flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                返回首页
              </Button>
            </Link>
            {/* 移动端菜单按钮 */}
            <MobileMenu posts={posts} latestPosts={latestPosts} />
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
        </main>

        {/* 侧边栏 - 仅在大屏幕显示，悬停时独立滚动 */}
        <aside className="hidden lg:block lg:flex-[1_1_0%] lg:min-w-0 mt-8 lg:mt-0 lg:sticky lg:top-8 lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto scrollbar-hover">
          <BlogSidebar posts={posts} latestPosts={latestPosts} />
        </aside>
      </div>
    </div>
  );
}