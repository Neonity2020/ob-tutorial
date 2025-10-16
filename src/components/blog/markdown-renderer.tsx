"use client";

import React, { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugify } from "@/lib/utils";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // 预先生成所有标题的ID，确保与TOC组件一致
  const headingIds = useMemo(() => {
    const ids: Record<string, number> = {};
    const result: Record<string, string> = {};

    // 处理 Markdown 标题 (# 开头的)
    const headingRegex = /^(#{1,4})\s(.+)$/gm;
    let match;
    while ((match = headingRegex.exec(content)) !== null) {
      const text = match[2].trim();
      const baseId = slugify(text);
      
      let uniqueId = baseId;
      if (ids[baseId]) {
        ids[baseId]++;
        uniqueId = `${baseId}-${ids[baseId]}`;
      } else {
        ids[baseId] = 1;
      }
      
      result[text] = uniqueId;
    }

    
    return result;
  }, [content]);

  return (
    <ReactMarkdown 
      remarkPlugins={[remarkGfm]} 
      rehypePlugins={[]} // 移除 rehypeSlug，我们自己控制ID生成
      components={{
        img: ({ src, alt, ...props }) => (
          <img
            src={src}
            alt={alt}
            className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 max-w-full h-auto"
            {...props}
          />
        ),
        h1: ({ children, ...props }) => {
          const text = React.Children.toArray(children).join('');
          const id = headingIds[text] || slugify(text);
          return (
            <h1 id={id} className="scroll-mt-20" {...props}>
              {children}
            </h1>
          );
        },
        h2: ({ children, ...props }) => {
          const text = React.Children.toArray(children).join('');
          const id = headingIds[text] || slugify(text);
          return (
            <h2 id={id} className="scroll-mt-20" {...props}>
              {children}
            </h2>
          );
        },
        h3: ({ children, ...props }) => {
          const text = React.Children.toArray(children).join('');
          const id = headingIds[text] || slugify(text);
          return (
            <h3 id={id} className="scroll-mt-20" {...props}>
              {children}
            </h3>
          );
        },
        h4: ({ children, ...props }) => {
          const text = React.Children.toArray(children).join('');
          const id = headingIds[text] || slugify(text);
          return (
            <h4 id={id} className="scroll-mt-20" {...props}>
              {children}
            </h4>
          );
        },
      }}
    >
      {content.trim()}
    </ReactMarkdown>
  );
}