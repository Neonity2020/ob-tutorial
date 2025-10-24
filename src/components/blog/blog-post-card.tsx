"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarDays, User } from "lucide-react"; // 导入 User 图标

interface BlogPostCardProps {
  post: {
    slug: string;
    title: string;
    description: string;
    date: string;
    author?: string; // 添加 author 属性
  };
}

export function BlogPostCard({ post }: { post: any }) {
  const router = useRouter();

  const onHoverPrefetch = () => {
    try {
      router.prefetch(`/blog/${post.slug}`);
    } catch (e) {
      // 忽略预抓取错误
    }
  };

  return (
    // 悬停反馈效果：平滑过渡、轻微上移与放大、阴影与边框高亮
    // 同时支持键盘聚焦触发预抓取（onFocus）
    // 添加 "group" 以便内部使用 group-hover 改变标题颜色
    <article
      onMouseEnter={onHoverPrefetch}
      onFocus={onHoverPrefetch}
      tabIndex={0}
      className="group transform transition-transform duration-200 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg rounded-lg border border-transparent hover:border-border/40 focus:outline-none focus:ring-2 focus:ring-accent bg-background p-6"
      aria-labelledby={`post-title-${post.slug}`}
    >
      <Link href={`/blog/${post.slug}`} className="h-full flex flex-col">
        <div className="flex-grow">
          <h3 id={`post-title-${post.slug}`} className="text-xl font-semibold text-foreground transition-colors group-hover:text-primary mb-2">
            {post.title}
          </h3>
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <CalendarDays className="h-4 w-4 mr-2" />
            {post.date}
          </div>
          {post.author && ( // 如果有作者信息，则显示
            <div className="flex items-center text-sm text-muted-foreground mb-3">
              <User className="h-4 w-4 mr-2" />
              {post.author}
            </div>
          )}
        </div>
        <div className="flex-grow">
          <p className="text-muted-foreground text-sm">{post.description}</p>
        </div>
      </Link>
    </article>
  );
}