"use client";

import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

interface BlogPostCardProps {
  post: {
    slug: string;
    title: string;
    description: string;
    date: string;
  };
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-200 ease-in-out">
        <CardHeader className="pb-2 flex-grow">
          <CardTitle className="text-xl font-semibold">{post.title}</CardTitle>
          <CardDescription className="flex items-center text-sm text-muted-foreground mt-1">
            <CalendarDays className="h-4 w-4 mr-2" />
            {post.date}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground text-sm">{post.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}