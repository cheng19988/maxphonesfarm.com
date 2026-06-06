import Link from "next/link";
import { BLOG_POSTS } from "@/data/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Device Lab Guides",
  description:
    "Practical guides on phone farm hardware selection, rackmount lab setup, and real-device testing infrastructure.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <div className="section">
      <div className="container-wide">
        <h1 className="section-title">Guides</h1>
        <p className="section-subtitle">Hardware notes for device lab managers and QA teams.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="border border-neutral-800 bg-neutral-950 p-6 hover:border-neutral-600 transition-colors group"
            >
              <span className="text-xs text-neutral-500">{post.category} · {post.date}</span>
              <h2 className="font-medium text-white mt-2 group-hover:underline underline-offset-4">{post.title}</h2>
              <p className="text-sm text-neutral-500 mt-2 line-clamp-3">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
