import { Footer } from "@/components/footer"; // 导入新的Footer组件
import { LandingPageContent } from "@/components/landing-page-content";
import { getLatestBlogPosts } from "@/lib/blog";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Newspaper, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  // 获取按文件创建时间排序的最新3篇文章
  const recentPosts = getLatestBlogPosts(3);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Obsidian 零基础入门教程 Vault",
    "description": "专为无编程基础的用户设计，通过这个渐进式学习的Obsidian教程Vault，轻松掌握Obsidian的强大功能，构建你的个人知识库。",
    "url": "https://ob-tutorial.org",
    "author": {
      "@type": "Person",
      "name": "NEONITY"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ob-tutorial.org"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://ob-tutorial.org/blog?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="grid grid-rows-[1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] text-foreground">
        <main className="flex flex-col gap-8 row-start-1 items-center justify-center w-full">
          <LandingPageContent />
          
          {/* 最新博客文章部分 */}
          {recentPosts.length > 0 && (
            <section className="w-full max-w-6xl mx-auto mt-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground flex items-center gap-3">
                  <Newspaper className="h-8 w-8 text-primary" />
                  最新博客文章
                </h2>
                <Link href="/blog">
                  <Button variant="outline" className="flex items-center gap-2">
                    查看全部
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentPosts.map((post) => (
                  <BlogPostCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          )}
        </main>
        <Footer /> {/* 使用新的Footer组件 */}
      </div>
    </>
  );
}