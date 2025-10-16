import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ob-tutorial.org';

  const posts = getAllBlogPosts();

  const blogPostEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...blogPostEntries,
  ];
}