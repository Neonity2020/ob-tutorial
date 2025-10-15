export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string; // For simplicity, content is a string. Can be extended to markdown.
  sortOrder?: number; // 新增：用于控制文章排序的数字，越小越靠前
  author?: string; // 新增：文章作者
}