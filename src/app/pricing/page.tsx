import Link from "next/link";
import { getProductsGrouped } from "@/lib/products";
import { PageHero } from "@/components/page-hero";
import { ContactCTA } from "@/components/shared";
import { buildMetadata } from "@/lib/seo";
import { IMAGES } from "@/lib/images";
import { whatsappQuoteUrl } from "@/lib/whatsapp";
import { getFlagshipProduct } from "@/data/products";

export const metadata = buildMetadata({
  title: "Hardware Pricing — USD List Prices",
  description:
    "Transparent USD list pricing for rackmount phone farm hardware. Bulk, custom rack, and international shipping quoted separately.",
  path: "/pricing",
});

export default async function PricingPage() {
  const grouped = await getProductsGrouped();
  const flagship = getFlagshipProduct();

  return (
    <>
      <PageHero
        label="Transparent Pricing"
        title="USD List Prices"
        subtitle="Factory-direct list pricing for core hardware. Bulk orders, custom rack builds, and international freight are quoted after you share device models and destination."
        image={IMAGES.phoneFarmBox.hero}
        imageAlt="Phone farm hardware pricing"
      />

      <section className="section border-b border-neutral-800">
        <div className="container-wide max-w-5xl">
          <div className="surface-elevated p-8 md:p-10 mb-12">
            <p className="section-label mb-2">Flagship</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">{flagship.name}</h2>
            <p className="text-neutral-400 mb-6 max-w-2xl">{flagship.shortDesc}</p>
            <div className="flex flex-wrap items-end gap-6">
              <span className="text-5xl font-semibold text-white">${flagship.priceUsd.toLocaleString()}</span>
              <Link href={`/contact?product=${flagship.slug}`} className="btn-primary">Request Quote</Link>
            </div>
          </div>

          {grouped.map((group) => (
            <div key={group.id} className="mb-16 last:mb-0">
              <h2 className="text-2xl font-semibold text-white mb-2">{group.label}</h2>
              <p className="text-neutral-500 text-sm mb-8 max-w-3xl">{group.description}</p>
              <div className="border border-neutral-800 divide-y divide-neutral-800">
                {group.products.map((p) => (
                  <div key={p.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 md:p-6 bg-neutral-950 hover:bg-neutral-900/40 transition-colors">
                    <div>
                      <Link href={`/products/${p.slug}`} className="text-white font-medium hover:underline underline-offset-4">
                        {p.name}
                      </Link>
                      <p className="text-sm text-neutral-500 mt-1 max-w-xl">{p.shortDesc}</p>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-lg font-medium text-white">
                        {p.priceUsd >= 1000 ? `$${p.priceUsd.toLocaleString()}` : `From $${p.priceUsd.toLocaleString()}`}
                      </span>
                      <Link href={`/contact?product=${p.slug}`} className="btn-outline text-xs py-2.5 px-4">
                        Quote
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-tight border-b border-neutral-800 bg-neutral-950">
        <div className="container-wide max-w-3xl text-center">
          <h2 className="text-xl font-semibold text-white mb-4">What affects your final quote</h2>
          <ul className="text-sm text-neutral-500 space-y-2 text-left max-w-xl mx-auto">
            <li>Target Android / iOS device models and slot count</li>
            <li>Custom rack ears, cabinet depth, and power budget</li>
            <li>Bulk quantity and multi-rack deployment scope</li>
            <li>Destination country, incoterms, and freight method</li>
            <li>Optional remote setup and provisioning services</li>
          </ul>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn-primary">Get Custom Quote</Link>
            <a href={whatsappQuoteUrl()} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <ContactCTA title="Need Bulk or Custom Pricing?" />
        </div>
      </section>
    </>
  );
}
