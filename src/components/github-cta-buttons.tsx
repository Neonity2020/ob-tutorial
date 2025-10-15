"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Github, Download } from "lucide-react";

interface GithubCTAButtonsProps {
  githubRepoUrl: string;
  downloadLink: string;
}

export function GithubCTAButtons({ githubRepoUrl, downloadLink }: GithubCTAButtonsProps) {
  return (
    <>
      <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
        <a href={githubRepoUrl} target="_blank" rel="noopener noreferrer">
          <span className="flex items-center gap-2"> {/* 包裹内容以确保a标签只有一个子元素 */}
            <Github className="h-5 w-5" />
            在 GitHub 上 Star
          </span>
        </a>
      </Button>
      <Button asChild size="lg" variant="secondary" className="hover:bg-secondary/80">
        <a href={downloadLink} target="_blank" rel="noopener noreferrer">
          <span className="flex items-center gap-2"> {/* 包裹内容以确保a标签只有一个子元素 */}
            <Download className="h-5 w-5" />
            下载教程 Vault
          </span>
        </a>
      </Button>
    </>
  );
}