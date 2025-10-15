"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cn, slugify } from "@/lib/utils"; // Import cn and slugify

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
    // Regex to find headings (h1, h2, h3)
    // It captures the hash symbols and the heading text
    const headingRegex = /^(#{1,3})\s(.+)$/gm;
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length; // Number of '#' determines the level
      const text = match[2].trim();
      const id = slugify(text); // Generate ID using the slugify utility
      extractedHeadings.push({ level, text, id });
    }
    setHeadings(extractedHeadings);
  }, [content]);

  // Optional: Add IntersectionObserver for active state highlighting
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
        rootMargin: "0px 0px -70% 0px", // Adjust as needed to trigger when heading is near top
        threshold: 0.1, // Trigger when 10% of the heading is visible
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
        {headings.map((heading) => (
          <li key={heading.id} className={cn(
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