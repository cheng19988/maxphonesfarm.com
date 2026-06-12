import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import { getProductQuoteGuide } from "@/data/product-quote-guides";
import { BuyButtons, FAQAccordion } from "@/components/commerce";
import { ContactCTA, JsonLd, StockBadge } from "@/components/shared";
import { buildMetadata, productJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { getProductSeo } from "@/data/product-seo";
import { formatProductPrice } from "@/lib/format-price";
import { emailComposeUrl } from "@/lib/email-link";
import { CONTACT } from "@/lib/config";
import { getProductProcurement } from "@/data/product-procurement";
import { ProductProcurementTable } from "@/components/product-procurement";
import { whatsappQuoteUrl } from "@/lib/whatsapp";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  const seo = getProductSeo(slug);
  return buildMetadata({
    title: seo?.metaTitle ?? product.name,
    description: seo?.metaDescription ?? product.shortDesc,
    path: `/products/${slug}`,
    image: product.imageHero,
  });
}

function parseJson<T>(s: string, fallback: T): T {
  try { return JSON.parse(s); } catch { return fallback; }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const features = parseJson<string[]>(product.features, []);
  const specs = parseJson<Record<string, string>>(product.specs, {});
  const scenarios = parseJson<string[]>(product.scenarios, []);
  const accessories = parseJson<string[]>(product.accessories, []);
  const delivery = parseJson<string[]>(product.delivery, []);
  const maintenance = parseJson<string[]>(product.maintenance, []);
  const faq = parseJson<{ q: string; a: string }[]>(product.faq, []);
  const quoteGuide = getProductQuoteGuide(slug);
  const procurement = getProductProcurement(slug);
  const seo = getProductSeo(slug);

  return (
    <>
      <JsonLd data={[
        productJsonLd({
          name: product.name,
          description: product.description,
          slug: product.slug,
          priceUsd: product.priceUsd,
          stock: product.stock,
          image: product.imageHero,
        }),
        ...(faq.length > 0 ? [faqJsonLd(faq.map((f) => ({ question: f.q, answer: f.a })))] : []),
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: product.name, path: `/products/${slug}` },
        ]),
      ]} />

      <div className="border-b border-neutral-200 bg-white">
        <div className="container-wide section-tight">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16 pb-16 border-b border-neutral-200">
            <div className="product-shot-hero product-shot-hero-detail">
              <Image src={product.imageDetail} alt={product.name} fill className="product-shot-hero-img" priority sizes="(max-width:1024px) 100vw, 50vw" />
            </div>
            <div>
              <p className="section-label mb-2">{product.category}</p>
              <h1 className="text-3xl md:text-5xl font-semibold text-neutral-900 mb-2 tracking-tight">{product.name}</h1>
              {seo?.keywordLine ? (
                <p className="text-sm text-neutral-500 mb-4 leading-relaxed">{seo.keywordLine}</p>
              ) : null}
              <p className="text-neutral-600 mb-8 leading-relaxed">{product.shortDesc}</p>
              <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-neutral-200">
                <span className="text-3xl font-semibold text-blue-700">{formatProductPrice(product.priceUsd)}</span>
                <StockBadge stock={product.stock} />
              </div>
              <BuyButtons slug={product.slug} name={product.name} />
              <div className="mt-8 p-5 surface rounded-xl text-sm text-neutral-600 space-y-2">
                <p className="font-semibold text-neutral-900">Contact Team</p>
                <p>
                  <a href={whatsappQuoteUrl(product.name)} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">WhatsApp {CONTACT.whatsapp}</a>
                  {" · "}
                  <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">Telegram {CONTACT.telegram}</a>
                </p>
                <p>
                  <a href={emailComposeUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">{CONTACT.email}</a>
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-14">
              <ProductProcurementTable data={procurement} />
              <section>
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Product Introduction</h2>
                <p className="text-neutral-600 leading-relaxed">{product.description}</p>
              </section>
              <section>
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Key Features</h2>
                <ul className="space-y-2">
                  {features.map((f) => (
                    <li key={f} className="flex gap-2 text-neutral-600"><span className="text-blue-700">—</span>{f}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Technical Specifications</h2>
                <table className="w-full text-sm border border-neutral-200 rounded-lg overflow-hidden">
                  <tbody>
                    {Object.entries(specs).map(([k, v]) => (
                      <tr key={k} className="border-b border-neutral-100 last:border-0">
                        <td className="py-3 px-4 text-neutral-500 bg-neutral-50 w-2/5">{k}</td>
                        <td className="py-3 px-4 text-neutral-900">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
              <section>
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Application Scenarios</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {scenarios.map((s) => (
                    <li key={s} className="surface p-4 rounded-lg text-sm text-neutral-600">{s}</li>
                  ))}
                </ul>
              </section>

              {quoteGuide && (
                <section className="surface p-6 md:p-8 rounded-xl space-y-8">
                  <h2 className="text-2xl font-semibold text-neutral-900">Before You Request a Quote</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-medium text-neutral-900 mb-3 text-sm uppercase tracking-wide">Suitable for</h3>
                      <ul className="space-y-2 text-sm text-neutral-600">
                        {quoteGuide.suitableFor.map((item) => (
                          <li key={item} className="flex gap-2"><span className="text-green-500 shrink-0">+</span>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral-900 mb-3 text-sm uppercase tracking-wide">Not suitable for</h3>
                      <ul className="space-y-2 text-sm text-neutral-600">
                        {quoteGuide.notSuitableFor.map((item) => (
                          <li key={item} className="flex gap-2"><span className="text-neutral-600 shrink-0">—</span>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-900 mb-3 text-sm uppercase tracking-wide">Required before quote</h3>
                    <ul className="space-y-2 text-sm text-neutral-600">
                      {quoteGuide.requiredBeforeQuote.map((item) => (
                        <li key={item} className="flex gap-2"><span className="text-neutral-900 shrink-0">•</span>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-sm text-neutral-600">
                    <span className="text-neutral-900 font-medium">Typical lead time: </span>
                    {quoteGuide.typicalLeadTime}
                  </p>
                  <div className="grid md:grid-cols-2 gap-8 pt-4 border-t border-neutral-200">
                    <div>
                      <h3 className="font-medium text-neutral-900 mb-3 text-sm">Packing &amp; shipping</h3>
                      <ul className="space-y-1 text-sm text-neutral-500">
                        {quoteGuide.packingShipping.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral-900 mb-3 text-sm">Warranty &amp; spare parts</h3>
                      <ul className="space-y-1 text-sm text-neutral-500">
                        {quoteGuide.warrantySpareParts.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              )}

              <section>
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Product FAQ</h2>
                <FAQAccordion items={faq.map((f) => ({ question: f.q, answer: f.a }))} />
              </section>
            </div>
            <div className="space-y-6">
              <section className="surface p-6 rounded-xl">
                <h3 className="font-medium text-neutral-900 mb-3">Included Accessories</h3>
                <ul className="space-y-1 text-sm text-neutral-500">
                  {accessories.map((a) => <li key={a}>• {a}</li>)}
                </ul>
              </section>
              <section className="surface p-6 rounded-xl">
                <h3 className="font-medium text-neutral-900 mb-3">Delivery Contents</h3>
                <ul className="space-y-1 text-sm text-neutral-500">
                  {delivery.map((d) => <li key={d}>• {d}</li>)}
                </ul>
              </section>
              <section className="surface p-6 rounded-xl">
                <h3 className="font-medium text-neutral-900 mb-3">Maintenance</h3>
                <ul className="space-y-1 text-sm text-neutral-500">
                  {maintenance.map((m) => <li key={m}>• {m}</li>)}
                </ul>
              </section>
            </div>
          </div>

          <div className="mt-20">
            <ContactCTA title={`Enterprise Quote — ${product.name}`} />
          </div>
        </div>
      </div>
    </>
  );
}
