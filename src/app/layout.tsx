import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"; // 导入 ThemeProvider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Obsidian 零基础入门教程 Vault",
    template: "%s | Obsidian 零基础入门教程 Vault"
  },
  description: "专为无编程基础的用户设计，通过这个渐进式学习的Obsidian教程Vault，轻松掌握Obsidian的强大功能，构建你的个人知识库。从基础操作到高级技巧，一步步带你探索Obsidian的无限可能。",
  keywords: ["Obsidian", "Obsidian教程", "知识管理", "PKM", "双向链接", "Markdown", "笔记软件", "个人知识库", "Obsidian入门", "Obsidian基础", "Obsidian高级技巧", "Obsidian插件", "Obsidian工作流"],
  authors: [{ name: "NEONITY" }],
  creator: "NEONITY",
  publisher: "ob-tutorial.org",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ob-tutorial.org'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://ob-tutorial.org',
    siteName: 'Obsidian 零基础入门教程 Vault',
    title: 'Obsidian 零基础入门教程 Vault',
    description: '专为无编程基础的用户设计，通过这个渐进式学习的Obsidian教程Vault，轻松掌握Obsidian的强大功能，构建你的个人知识库。',
    images: [
      {
        url: '/og-image.png',
        width: 2940,
        height: 1670,
        alt: 'Obsidian 零基础入门教程 Vault',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Obsidian 零基础入门教程 Vault',
    description: '专为无编程基础的用户设计，通过这个渐进式学习的Obsidian教程Vault，轻松掌握Obsidian的强大功能，构建你的个人知识库。',
    images: ['/og-image.png'],
    creator: '@neonity',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // 默认设置为深色主题
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}