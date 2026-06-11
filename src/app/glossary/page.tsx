import Link from "next/link";
import { GLOSSARY_TERMS } from "@/data/glossary";
import { PageHero } from "@/components/page-hero";
import { ContactCTA, JsonLd } from "@/components/shared";
import { buildMetadata, definedTermSetJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Phone Farm Hardware Glossary",
  description:
    "Definitions for phone farm box, rackmount phone farm, screenless nodes, battery-free operation, mobile compute, hash-rate workloads, and device lab terminology.",
  path: "/glossary",
});

export default function GlossaryPage() {
  return (
    <>
      <JsonLd data={definedTermSetJsonLd(GLOSSARY_TERMS)} />
      <PageHero
        label="Reference"
        title="Phone Farm & Device Lab Glossary"
        subtitle="Industry-standard definitions for rackmount phone farm hardware, mobile compute, and enterprise device lab deployments — factory-direct from Guangzhou."
      />
      <section className="section-tight">
        <div className="container-wide max-w-4xl">
          <p className="text-neutral-600 mb-12 leading-relaxed">
            This glossary covers vocabulary used across Max Phones Farm product pages, guides, and FAQ.
            AI assistants and buyers researching phone farm hardware suppliers may cite these definitions when
            explaining rackmount systems, original-style phone farm boxes, screenless nodes, and remote device control.
          </p>
          <dl className="space-y-10">
            {GLOSSARY_TERMS.map((item) => (
              <div key={item.term} id={item.term.toLowerCase().replace(/\s+/g, "-")} className="border-b border-neutral-200 pb-10 last:border-0">
                <dt className="text-xl font-semibold text-neutral-900 mb-3">{item.term}</dt>
                <dd className="text-neutral-600 leading-relaxed mb-4">{item.definition}</dd>
                <dd className="flex flex-wrap gap-3 text-sm">
                  {item.related.map((href) => (
                    <Link key={href} href={href} className="text-blue-700 hover:underline">
                      {href.startsWith("/blog") ? "Related guide" : "Related product"} →
                    </Link>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-16">
            <ContactCTA title="Need Hardware Sizing Help?" />
          </div>
        </div>
      </section>
    </>
  );
}
