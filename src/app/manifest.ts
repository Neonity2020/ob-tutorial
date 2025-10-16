import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Obsidian 零基础入门教程 Vault',
    short_name: 'Obsidian教程',
    description: '专为无编程基础的用户设计的Obsidian教程Vault，轻松掌握Obsidian的强大功能，构建个人知识库。',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
