import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import { BuyButtons, FAQAccordion } from "@/components/commerce";
import { ContactCTA, JsonLd, StockBadge } from "@/components/shared";
import { buildMetadata, productJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { CONTACT } from "@/lib/config";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return buildMetadata({
    title: product.name,
    description: product.shortDesc,
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

  return (
    <>
      <JsonLd data={[
        productJsonLd({ name: product.name, description: product.shortDesc, slug: product.slug, priceUsd: product.priceUsd, stock: product.stock, image: product.imageHero }),
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: product.name, path: `/products/${slug}` },
        ]),
      ]} />

      <div className="section">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20 pb-20 border-b border-neutral-800">
            <div className="relative aspect-square border border-neutral-800 bg-neutral-950">
              <Image src={product.imageDetail} alt={product.name} fill className="object-cover" priority sizes="(max-width:1024px) 100vw, 50vw" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-neutral-500 mb-3">{product.category}</p>
              <h1 className="text-3xl md:text-4xl font-semibold text-white mb-4 tracking-tight">{product.name}</h1>
              <p className="text-neutral-400 mb-8 leading-relaxed">{product.shortDesc}</p>
              <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-neutral-800">
                <span className="text-3xl font-semibold text-white">${product.priceUsd.toLocaleString()}</span>
                <StockBadge stock={product.stock} />
              </div>
              <BuyButtons slug={product.slug} />
              <div className="mt-8 p-5 border border-neutral-800 text-sm text-neutral-500">
                <p className="font-medium text-white mb-2">Contact Sales</p>
                <p>{CONTACT.phone} · WhatsApp · Telegram · {CONTACT.email}</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-14">
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Product Introduction</h2>
                <p className="text-neutral-400 leading-relaxed">{product.description}</p>
              </section>
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Key Features</h2>
                <ul className="space-y-2">
                  {features.map((f) => (
                    <li key={f} className="flex gap-2 text-neutral-400"><span className="text-white">—</span>{f}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Technical Specifications</h2>
                <table className="w-full text-sm border border-neutral-800">
                  <tbody>
                    {Object.entries(specs).map(([k, v]) => (
                      <tr key={k} className="border-b border-neutral-800 last:border-0">
                        <td className="py-3 px-4 text-neutral-500 w-2/5">{k}</td>
                        <td className="py-3 px-4 text-white">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Application Scenarios</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {scenarios.map((s) => (
                    <li key={s} className="border border-neutral-800 p-4 text-sm text-neutral-400">{s}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Product FAQ</h2>
                <FAQAccordion items={faq.map((f) => ({ question: f.q, answer: f.a }))} />
              </section>
            </div>
            <div className="space-y-6">
              <section className="border border-neutral-800 p-6">
                <h3 className="font-medium text-white mb-3">Included Accessories</h3>
                <ul className="space-y-1 text-sm text-neutral-500">
                  {accessories.map((a) => <li key={a}>• {a}</li>)}
                </ul>
              </section>
              <section className="border border-neutral-800 p-6">
                <h3 className="font-medium text-white mb-3">Delivery Contents</h3>
                <ul className="space-y-1 text-sm text-neutral-500">
                  {delivery.map((d) => <li key={d}>• {d}</li>)}
                </ul>
              </section>
              <section className="border border-neutral-800 p-6">
                <h3 className="font-medium text-white mb-3">Maintenance</h3>
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
