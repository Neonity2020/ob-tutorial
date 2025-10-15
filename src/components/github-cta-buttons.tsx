"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Github, Download, Newspaper } from "lucide-react"; // 导入 Newspaper 图标
import Link from "next/link"; // 导入 Link

interface GithubCTAButtonsProps {
  githubRepoUrl: string;
  downloadLink: string;
  blogLink: string; // 新增 blogLink 属性
}

export function GithubCTAButtons({ githubRepoUrl, downloadLink, blogLink }: GithubCTAButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center items-center">
      <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
        <a href={githubRepoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
          <Github className="h-5 w-5" />
          在 GitHub 上 Star
        </a>
      </Button>
      <Button asChild size="lg" variant="secondary" className="hover:bg-secondary/80">
        <a href={downloadLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          下载教程 Vault
        </a>
      </Button>
      <Button asChild size="lg" variant="secondary" className="hover:bg-secondary/80"> {/* 新增阅读教程博客按钮 */}
        <Link href={blogLink} className="flex items-center gap-2">
          <Newspaper className="h-5 w-5" />
          阅读教程博客
        </Link>
      </Button>
    </div>
  );
}