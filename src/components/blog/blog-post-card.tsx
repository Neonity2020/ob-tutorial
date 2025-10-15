"use client";

import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
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

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-200 ease-in-out">
        <CardHeader className="pb-2 flex-grow">
          <CardTitle className="text-xl font-semibold">{post.title}</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <CalendarDays className="h-4 w-4 mr-2" />
            {post.date}
          </div>
          {post.author && ( // 如果有作者信息，则显示
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <User className="h-4 w-4 mr-2" />
              {post.author}
            </div>
          )}
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground text-sm">{post.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}