"use client";

import React, { useState } from "react";
import { BlogPost } from "@/types/blog";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { BlogSidebar } from "./blog-sidebar";
import { BlogPostTOC } from "./blog-post-toc";

interface MobileMenuProps {
  posts: BlogPost[];
  currentSlug?: string;
  content?: string; // 文章内容，用于生成目录
  latestPosts?: BlogPost[]; // 新增：最新文章列表
}

export function MobileMenu({ posts, currentSlug, content, latestPosts }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden">
          <Menu className="h-4 w-4" />
          <span className="sr-only">打开菜单</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 sm:w-96 max-h-[100dvh] overflow-y-auto overscroll-contain">
        <div className="mt-6 space-y-6 pb-8">
          {/* 如果是文章页面且有内容，显示目录 */}
          {currentSlug && content && (
            <div>
              <BlogPostTOC content={content} />
            </div>
          )}
          
          {/* 博客侧边栏 */}
          <div>
            <BlogSidebar posts={posts} currentSlug={currentSlug} latestPosts={latestPosts} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
