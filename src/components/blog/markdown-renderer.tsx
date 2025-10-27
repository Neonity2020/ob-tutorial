"use client";

import React, { useMemo, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugify } from "@/lib/utils";
import { highlightCode } from "@/lib/shiki";
import { useTheme } from "next-themes";

// 定义 Code 组件的 Props 类型
interface CodeComponentProps extends React.HTMLAttributes<HTMLElement> {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 获取当前主题（light 或 dark）
  const currentTheme = mounted
    ? theme === "system"
      ? systemTheme
      : theme
    : "dark";

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
        code: ({ node, inline, className, children, ...props }: CodeComponentProps) => {
          const match = /language-(\w+)/.exec(className || "");
          const codeString = String(children).replace(/\n$/, "");

          if (!inline && match) {
            const language = match[1];
            const [highlightedCode, setHighlightedCode] = useState<string>("");

            useEffect(() => {
              highlightCode(
                codeString,
                language,
                currentTheme === "dark" ? "dark" : "light"
              ).then(setHighlightedCode);
            }, [codeString, language, currentTheme]);

            if (!highlightedCode) {
              return (
                <pre className={className}>
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              );
            }

            return (
              <div
                className="my-4 overflow-x-auto rounded-lg"
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
              />
            );
          }

          // 内联代码
          return (
            <code
              className="px-1.5 py-0.5 rounded bg-muted font-mono text-sm"
              {...props}
            >
              {children}
            </code>
          );
        },
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