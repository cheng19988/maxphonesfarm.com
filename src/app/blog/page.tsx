import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/blog";
import { PageHero } from "@/components/page-hero";
import { buildMetadata } from "@/lib/seo";
import { BLOG_COVERS, IMAGES } from "@/lib/images";

export const metadata = buildMetadata({
  title: "Device Lab Guides",
  description:
    "Practical guides on phone farm hardware selection, rackmount lab setup, and real-device testing infrastructure.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        label="Knowledge Base"
        title="Device Lab Guides"
        subtitle="Hardware notes for device lab managers, QA leads, and automation teams deploying real-device infrastructure."
        image={IMAGES.scenes.overview}
        imageAlt="Phone farm hardware guides"
      />

      <section className="section">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => {
              const cover = BLOG_COVERS[post.slug] ?? IMAGES.phoneFarmBox.hero;
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="card card-hover group flex flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                    <Image
                      src={cover}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="33vw"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-xs text-neutral-500 uppercase tracking-wide">{post.category} · {post.date}</span>
                    <h2 className="text-lg font-medium text-white mt-3 group-hover:text-neutral-200 transition-colors">{post.title}</h2>
                    <p className="text-sm text-neutral-500 mt-3 line-clamp-3 flex-1 leading-relaxed">{post.excerpt}</p>
                    <span className="text-xs text-neutral-400 mt-4 group-hover:text-white transition-colors">Read guide →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
