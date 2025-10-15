import React from "react";
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Home } from "lucide-react"; // 导入 Home 图标
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
  const post = getBlogPostBySlug(params.slug);
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
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <article className="prose dark:prose-invert prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-p:leading-relaxed prose-a:text-primary prose-a:hover:underline">
        <h1 className="text-4xl font-bold text-foreground mb-2">{post.title}</h1>
        <p className="flex items-center text-sm text-muted-foreground mb-6">
          <CalendarDays className="h-4 w-4 mr-2" />
          {post.date}
        </p>
        <Separator className="mb-8" />
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </article>
      <div className="mt-12 flex justify-center gap-4"> {/* 使用 flex 和 gap 布局按钮 */}
        <Button asChild>
          <Link href="/blog">返回博客列表</Link>
        </Button>
        <Button asChild variant="outline"> {/* 添加返回首页按钮 */}
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            返回首页
          </Link>
        </Button>
      </div>
    </div>
  );
}