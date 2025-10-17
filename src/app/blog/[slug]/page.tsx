import React from "react";
import { getBlogPostWithNavigation, getAllBlogPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Home, ArrowLeft, ArrowRight, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// import ReactMarkdown from "react-markdown"; // 移除 ReactMarkdown 导入
// import remarkGfm from "remark-gfm"; // 移除 remarkGfm 导入
// import rehypeSlug from "rehype-slug"; // 移除 rehypeSlug 导入
import { BlogPostTOC } from "@/components/blog/blog-post-toc";
import { MarkdownRenderer } from "@/components/blog/markdown-renderer"; // 导入新的 MarkdownRenderer
import { BlogSidebar } from "@/components/blog/blog-sidebar";
import { MobileMenu } from "@/components/blog/mobile-menu";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const { currentPost: post } = getBlogPostWithNavigation(slug);
  if (!post) {
    return {
      title: "文章未找到",
    };
  }
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const { currentPost: post, previousPost, nextPost } = getBlogPostWithNavigation(slug);
  const allPosts = getAllBlogPosts();

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row lg:gap-8">
        {/* 左侧侧边栏区域 - 仅在大屏幕显示，悬停时独立滚动 */}
        <aside className="hidden lg:block lg:flex-[1_1_0%] lg:min-w-0 lg:order-1 lg:sticky lg:top-8 lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto scrollbar-hover">
          <BlogSidebar posts={allPosts} currentSlug={slug} />
        </aside>
        
        {/* 主内容区域 */}
        <main className="lg:flex-[2_1_0%] lg:min-w-0 lg:order-2">
          {/* 移动端菜单按钮 */}
          <div className="mb-6 lg:hidden">
            <MobileMenu posts={allPosts} currentSlug={slug} content={post.content} />
          </div>
          
          <article className="prose dark:prose-invert prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-p:leading-relaxed prose-a:text-primary prose-a:hover:underline max-w-none min-w-0">
            <h1 className="text-4xl font-bold text-foreground mb-2">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-x-4 text-sm text-muted-foreground mb-6 min-w-0">
              <p className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-2" />
                {post.date}
              </p>
              {post.author && (
                <p className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {post.author}
                </p>
              )}
            </div>
            <Separator className="mb-8" />
            <MarkdownRenderer content={post.content} /> {/* 使用 MarkdownRenderer */}
          </article>
          <div className="mt-12 flex justify-between items-center">
            {previousPost ? (
              <Link href={`/blog/${previousPost.slug}`}>
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  上一篇
                </Button>
              </Link>
            ) : (
              <div className="w-[100px]" />
            )}

            <Link href="/blog">
              <Button>返回博客列表</Button>
            </Link>
            
            {nextPost ? (
              <Link href={`/blog/${nextPost.slug}`}>
                <Button variant="outline" className="flex items-center gap-2">
                  下一篇
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <div className="w-[100px]" />
            )}
          </div>
          
        </main>

        {/* 右侧目录区域 - 仅在大屏幕显示，悬停时独立滚动 */}
        <aside className="hidden lg:block lg:flex-[1_1_0%] lg:min-w-0 lg:order-3 mt-8 lg:mt-0 lg:sticky lg:top-8 lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto scrollbar-hover">
          <BlogPostTOC content={post.content} />
        </aside>
      </div>
    </div>
  );
}