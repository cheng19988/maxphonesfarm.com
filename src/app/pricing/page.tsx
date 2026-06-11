import Link from "next/link";
import { getProductsGrouped } from "@/lib/products";
import { PageHero } from "@/components/page-hero";
import { ContactCTA } from "@/components/shared";
import { buildMetadata } from "@/lib/seo";
import { whatsappQuoteUrl } from "@/lib/whatsapp";
import { formatProductPrice } from "@/lib/format-price";
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
        variant="simple"
        label="Transparent Pricing"
        title="USD List Prices"
        subtitle="Factory-direct list pricing for core hardware. Bulk orders, custom rack builds, and international freight are quoted after you share device models and destination."
      />

      <section className="section section-white border-b border-neutral-200">
        <div className="container-wide max-w-5xl">
          <div className="surface-elevated p-8 md:p-10 mb-12">
            <p className="section-label mb-2">Flagship</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-3">{flagship.name}</h2>
            <p className="text-neutral-600 mb-6 max-w-2xl">{flagship.shortDesc}</p>
            <div className="flex flex-wrap items-end gap-6">
              <span className="text-5xl font-semibold text-blue-700">{formatProductPrice(flagship.priceUsd)}</span>
              <Link href={`/contact?product=${flagship.slug}`} className="btn-primary">Request Quote</Link>
            </div>
          </div>

          {grouped.map((group) => (
            <div key={group.id} className="mb-16 last:mb-0">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-2">{group.label}</h2>
              <p className="text-neutral-500 text-sm mb-8 max-w-3xl">{group.description}</p>
              <div className="border border-neutral-200 divide-y divide-neutral-200 rounded-xl overflow-hidden shadow-sm">
                {group.products.map((p) => (
                  <div key={p.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 md:p-6 bg-white hover:bg-neutral-50 transition-colors">
                    <div>
                      <Link href={`/products/${p.slug}`} className="text-neutral-900 font-medium hover:text-blue-700 transition-colors">
                        {p.name}
                      </Link>
                      <p className="text-sm text-neutral-500 mt-1 max-w-xl">{p.shortDesc}</p>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-lg font-medium text-blue-700">
                        {formatProductPrice(p.priceUsd)}
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

      <section className="section-tight section-muted border-b border-neutral-200">
        <div className="container-wide max-w-3xl text-center">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">What affects your final quote</h2>
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
