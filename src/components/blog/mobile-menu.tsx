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
}

export function MobileMenu({ posts, currentSlug, content }: MobileMenuProps) {
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
        <SheetHeader>
          <SheetTitle className="text-left">
            {currentSlug ? "文章导航" : "博客导航"}
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-6 pb-8">
          {/* 如果是文章页面且有内容，显示目录 */}
          {currentSlug && content && (
            <div>
              <h3 className="text-lg font-semibold mb-4">文章目录</h3>
              <BlogPostTOC content={content} />
            </div>
          )}
          
          {/* 博客侧边栏 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">博客导航</h3>
            <BlogSidebar posts={posts} currentSlug={currentSlug} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
