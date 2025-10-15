import { BlogPost } from "@/types/blog";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { format } from "date-fns"; // 导入 date-fns 的 format 函数

const postsDirectory = path.join(process.cwd(), "src/posts");

export function getAllBlogPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      description: data.description,
      // 将 date 对象格式化为 'yyyy年MM月dd日' 字符串
      date: format(new Date(data.date), 'yyyy年MM月dd日'), 
      content,
    } as BlogPost;
  });

  // Sort posts by date in descending order
  return allPostsData.sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return undefined;
  }
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title,
    description: data.description,
    // 将 date 对象格式化为 'yyyy年MM月dd日' 字符串
    date: format(new Date(data.date), 'yyyy年MM月dd日'),
    content,
  } as BlogPost;
}