export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string; // For simplicity, content is a string. Can be extended to markdown.
}