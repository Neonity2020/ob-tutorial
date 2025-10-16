import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  // 检查是否包含中文字符
  const hasChinese = /[\u4e00-\u9fff]/.test(text);
  
  let slug = text
    .toString()
    .trim();
  
  if (hasChinese) {
    // 对于中文标题，使用更简单的处理方式
    slug = slug
      .replace(/\s+/g, '-') // 空格替换为连字符
      .replace(/[^\w\u4e00-\u9fff-]/g, '') // 只保留字母、数字、中文和连字符
      .replace(/--+/g, '-') // 多个连字符合并为一个
      .replace(/^-+|-+$/g, ''); // 移除开头和结尾的连字符
  } else {
    // 对于非中文标题，使用原有的处理方式
    slug = slug
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  
  // 确保ID不以数字开头（HTML ID规范）
  if (slug && /^[0-9]/.test(slug)) {
    slug = 'heading-' + slug;
  }
  
  // 如果 slug 为空，则返回一个默认值，以避免空 key 错误
  return slug === '' ? 'untitled-heading' : slug;
}