import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogPost, BLOG_POSTS } from "@/data/blog";
import { BlogContent } from "@/components/blog-content";
import { ContactCTA, JsonLd } from "@/components/shared";
import { buildMetadata, breadcrumbJsonLd, articleJsonLd, howToJsonLd } from "@/lib/seo";
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

  const setupHowTo =
    slug === "phone-farm-setup-guide-2026"
      ? howToJsonLd({
          name: post.title,
          description: post.excerpt,
          slug: post.slug,
          steps: [
            { name: "Unbox and inspect", text: "Verify slot count, PSU label, fan operation, and USB harness seating." },
            { name: "Power and network", text: "Connect mains power within rated voltage. Place the chassis on a dedicated lab VLAN." },
            { name: "Host connection", text: "Run one USB uplink to the control workstation. Confirm each slot enumerates." },
            { name: "Device preparation", text: "Enable developer options, confirm ADB authorization, and stage test APKs." },
            { name: "Smoke test", text: "Run a parallel test script across all nodes. Monitor thermals and USB stability for 24 hours." },
          ],
        })
      : null;

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
          ...(setupHowTo ? [setupHowTo] : []),
        ]}
      />
      <div className="relative border-b border-neutral-200 aspect-[21/9] md:aspect-[3/1] overflow-hidden bg-neutral-50">
        <Image src={cover} alt={post.title} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/30 to-transparent" />
      </div>
      <article className="section-tight">
        <div className="container-wide max-w-3xl">
          <Link href="/blog" className="text-neutral-500 text-sm hover:text-blue-700">← Back to Guides</Link>
          <span className="block text-xs text-neutral-600 mt-4 uppercase tracking-wide">{post.category} · {post.date}</span>
          <h1 className="text-3xl md:text-5xl font-semibold text-neutral-900 mt-4 mb-8 tracking-tight">{post.title}</h1>
          <BlogContent content={post.content} />
          <div className="mt-12">
            <ContactCTA title="Discuss Your Lab Hardware" />
          </div>
        </div>
      </article>
    </>
  );
}
