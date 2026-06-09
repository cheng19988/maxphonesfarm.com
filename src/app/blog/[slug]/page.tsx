import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogPost, BLOG_POSTS } from "@/data/blog";
import { ContactCTA } from "@/components/shared";
import { buildMetadata, breadcrumbJsonLd, articleJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared";
import { BLOG_COVERS, IMAGES } from "@/lib/images";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return buildMetadata({ title: post.title, description: post.excerpt, path: `/blog/${slug}` });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const cover = BLOG_COVERS[slug] ?? IMAGES.phoneFarmBox.hero;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/blog" },
            { name: post.title, path: `/blog/${slug}` },
          ]),
          articleJsonLd({
            title: post.title,
            description: post.excerpt,
            slug: post.slug,
            date: post.date,
          }),
        ]}
      />
      <div className="relative border-b border-neutral-200 aspect-[21/9] md:aspect-[3/1] overflow-hidden bg-neutral-50">
        <Image src={cover} alt={post.title} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/30 to-transparent" />
      </div>
      <article className="section-tight">
        <div className="container-wide max-w-3xl">
          <Link href="/blog" className="text-neutral-500 text-sm hover:text-white">← Back to Guides</Link>
          <span className="block text-xs text-neutral-600 mt-4 uppercase tracking-wide">{post.category} · {post.date}</span>
          <h1 className="text-3xl md:text-5xl font-semibold text-neutral-900 mt-4 mb-8 tracking-tight">{post.title}</h1>
          <div className="prose-content whitespace-pre-line">{post.content}</div>
          <div className="mt-12">
            <ContactCTA title="Discuss Your Lab Hardware" />
          </div>
        </div>
      </article>
    </>
  );
}
