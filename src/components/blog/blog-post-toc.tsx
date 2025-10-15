"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cn, slugify } from "@/lib/utils";

interface Heading {
  level: number;
  text: string;
  id: string;
}

interface BlogPostTOCProps {
  content: string; // Markdown content of the blog post
}

export function BlogPostTOC({ content }: BlogPostTOCProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const extractedHeadings: Heading[] = [];
    const headingRegex = /^(#{1,3})\s(.+)$/gm;
    let match;
    let headingIndex = 0; // 用于处理重复slug的索引

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      let id = slugify(text);
      
      // 确保ID在当前提取的列表中是唯一的
      let uniqueId = id;
      let counter = 1;
      while (extractedHeadings.some(h => h.id === uniqueId)) {
        uniqueId = `${id}-${counter}`;
        counter++;
      }
      id = uniqueId;

      extractedHeadings.push({ level, text, id });
      headingIndex++;
    }
    setHeadings(extractedHeadings);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "0px 0px -70% 0px",
        threshold: 0.1,
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="sticky top-20 self-start p-4 border rounded-lg bg-card shadow-sm">
      <h3 className="text-lg font-semibold mb-4">目录</h3>
      <ul className="space-y-2">
        {headings.map((heading, index) => ( // 使用 index 作为 fallback key 的一部分
          <li key={`${heading.id}-${index}`} className={cn( // 结合 id 和 index 确保唯一性
            "text-sm",
            heading.level === 2 && "ml-0",
            heading.level === 3 && "ml-4",
            activeId === heading.id ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
          )}>
            <Link href={`#${heading.id}`} className="block transition-colors">
              {heading.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}