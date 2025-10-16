import { Footer } from "@/components/footer"; // 导入新的Footer组件
import { LandingPageContent } from "@/components/landing-page-content";

export default function Home() {
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
        </main>
        <Footer /> {/* 使用新的Footer组件 */}
      </div>
    </>
  );
}