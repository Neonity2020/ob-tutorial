"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type PostMeta = {
  slug: string;
};

export default function PrefetchPosts({ posts }: { posts: PostMeta[] }) {
  const router = useRouter();

  useEffect(() => {
    if (!posts || posts.length === 0) return;

    const toPrefetch = posts.slice(0, 5);
    toPrefetch.forEach((p) => {
      try {
        router.prefetch(`/blog/${p.slug}`);
      } catch (e) {
        // 忽略错误
      }
    });
  }, [posts, router]);

  return null;
}