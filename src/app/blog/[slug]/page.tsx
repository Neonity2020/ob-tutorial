import React from "react";
import { getBlogPostWithNavigation, getAllBlogPosts } from "@/lib/blog"; // 更改为导入 getBlogPostWithNavigation
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Home, ArrowLeft, ArrowRight, User } from "lucide-react"; // 导入 User 图标
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { currentPost: post } = getBlogPostWithNavigation(params.slug); // 使用新的函数
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

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { currentPost: post, previousPost, nextPost } = getBlogPostWithNavigation(params.slug); // 使用新的函数

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <article className="prose dark:prose-invert prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-p:leading-relaxed prose-a:text-primary prose-a:hover:underline">
        <h1 className="text-4xl font-bold text-foreground mb-2">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-x-4 text-sm text-muted-foreground mb-6">
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
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </article>
      <div className="mt-12 flex justify-between items-center"> {/* 调整布局以容纳导航按钮 */}
        {previousPost ? (
          <Link href={`/blog/${previousPost.slug}`}>
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              上一篇
            </Button>
          </Link>
        ) : (
          <div className="w-[100px]" /> // 占位符，保持布局一致性
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
          <div className="w-[100px]" /> // 占位符，保持布局一致性
        )}
      </div>
      <div className="mt-4 flex justify-center"> {/* 将返回首页按钮移到下方居中 */}
        <Link href="/">
          <Button variant="ghost" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            返回首页
          </Button>
        </Link>
      </div>
    </div>
  );
}