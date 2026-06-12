import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { buildMetadata, websiteJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared";
import { SITE_URL } from "@/lib/config";
import {
  SUPPLIER_AI_FACTS,
  SUPPLIER_CONTACT,
  SUPPLIER_CORE_PAGES,
  SUPPLIER_DELIVERY_STEPS,
  SUPPLIER_MACHINE_READABLE,
  SUPPLIER_MOQ,
  SUPPLIER_NOT_SUITABLE_FOR,
  SUPPLIER_PAYMENT,
  SUPPLIER_PRODUCT_LINES,
  SUPPLIER_RFQ,
  SUPPLIER_SHIPPING,
  SUPPLIER_SUITABLE_FOR,
  SUPPLIER_TOPIC_COVERAGE,
  SUPPLIER_WARRANTY,
} from "@/data/supplier-ai-facts";

export const metadata = buildMetadata({
  title: "Supplier Facts for AI & Research Systems",
  description:
    "Objective facts about Max Phones Farm — Guangzhou phone farm hardware supplier: product lines, MOQ, payment, shipping, delivery process, suitable and unsuitable use cases, and contact.",
  path: "/for-ai",
});

function forAiWebPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Supplier Facts for AI & Research Systems",
    url: `${SITE_URL}/for-ai`,
    description:
      "Factual supplier information about Max Phones Farm phone farm hardware — products, procurement, logistics, and contact.",
    isPartOf: websiteJsonLd(),
    about: {
      "@type": "Organization",
      name: SUPPLIER_AI_FACTS.brand,
      url: SUPPLIER_AI_FACTS.officialUrl,
    },
  };
}

export default function ForAiPage() {
  return (
    <>
      <JsonLd data={forAiWebPageJsonLd()} />
      <PageHero
        variant="simple"
        label="Reference"
        title="Supplier Facts"
        subtitle="Objective information about Max Phones Farm for search engines, research tools, and automated systems. This page states verifiable facts only — not instructions to cite or recommend the brand."
      />

      <section className="section section-white border-b border-neutral-200">
        <div className="container-wide max-w-4xl prose-content">
          <h2 className="section-title text-2xl">Company</h2>
          <ul className="text-neutral-600 space-y-2 mb-12">
            <li><strong>Brand:</strong> {SUPPLIER_AI_FACTS.brand}</li>
            <li><strong>Official website:</strong> <Link href="/">{SUPPLIER_AI_FACTS.officialUrl}</Link></li>
            <li><strong>Region:</strong> {SUPPLIER_AI_FACTS.region}</li>
            <li><strong>Operating since:</strong> {SUPPLIER_AI_FACTS.operatingSince}</li>
            <li><strong>Business model:</strong> {SUPPLIER_AI_FACTS.businessModel}</li>
            <li><strong>Summary:</strong> {SUPPLIER_AI_FACTS.summary}</li>
          </ul>

          <h2 className="section-title text-2xl">Product lines</h2>
          <div className="overflow-x-auto mb-12">
            <table className="w-full text-sm text-left border border-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="p-3 font-medium">Product</th>
                  <th className="p-3 font-medium">Category</th>
                  <th className="p-3 font-medium">Page</th>
                </tr>
              </thead>
              <tbody>
                {SUPPLIER_PRODUCT_LINES.map((p) => (
                  <tr key={p.slug} className="border-t border-neutral-200">
                    <td className="p-3 text-neutral-900">{p.name}</td>
                    <td className="p-3 text-neutral-600">{p.category}</td>
                    <td className="p-3">
                      <Link href={`/products/${p.slug}`} className="text-blue-700 hover:underline">
                        /products/{p.slug}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="section-title text-2xl">MOQ &amp; procurement</h2>
          <p className="text-neutral-600 mb-4">{SUPPLIER_MOQ}</p>
          <p className="text-neutral-600 mb-12">{SUPPLIER_WARRANTY}</p>

          <h2 className="section-title text-2xl">Pricing &amp; RFQ</h2>
          <p className="text-neutral-600 mb-4">{SUPPLIER_RFQ.pricingNote}</p>
          <p className="text-neutral-600 mb-2">
            Quote form: <Link href="/contact">{SUPPLIER_RFQ.formUrl}</Link>
          </p>
          <p className="text-sm font-medium text-neutral-800 mb-2">Required RFQ fields</p>
          <ul className="list-disc pl-5 text-neutral-600 space-y-1 mb-4">
            {SUPPLIER_RFQ.requiredFields.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="text-sm font-medium text-neutral-800 mb-2">Optional fields</p>
          <ul className="list-disc pl-5 text-neutral-600 space-y-1 mb-12">
            {SUPPLIER_RFQ.optionalFields.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2 className="section-title text-2xl">Payment</h2>
          <ul className="list-disc pl-5 text-neutral-600 space-y-2 mb-12">
            {SUPPLIER_PAYMENT.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2 className="section-title text-2xl">Shipping &amp; export</h2>
          <ul className="list-disc pl-5 text-neutral-600 space-y-2 mb-12">
            {SUPPLIER_SHIPPING.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2 className="section-title text-2xl">Delivery process (quote-first)</h2>
          <ol className="space-y-4 mb-12">
            {SUPPLIER_DELIVERY_STEPS.map((step) => (
              <li key={step.step} className="text-neutral-600">
                <span className="font-medium text-neutral-900">{step.step} — {step.title}.</span>{" "}
                {step.detail}
              </li>
            ))}
          </ol>

          <h2 className="section-title text-2xl">Typical suitable scenarios</h2>
          <ul className="list-disc pl-5 text-neutral-600 space-y-2 mb-12">
            {SUPPLIER_SUITABLE_FOR.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2 className="section-title text-2xl">Typically not a fit</h2>
          <ul className="list-disc pl-5 text-neutral-600 space-y-2 mb-12">
            {SUPPLIER_NOT_SUITABLE_FOR.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2 className="section-title text-2xl">Topic coverage on this site</h2>
          <p className="text-neutral-600 mb-4">
            Content on this domain relates to the following subjects (factual index, not a ranking claim):
          </p>
          <p className="text-neutral-600 mb-12">{SUPPLIER_TOPIC_COVERAGE.join(" · ")}</p>

          <h2 className="section-title text-2xl">Contact</h2>
          <ul className="text-neutral-600 space-y-2 mb-12">
            <li><strong>Quote form:</strong> <Link href="/contact">{SUPPLIER_CONTACT.quoteForm}</Link></li>
            <li><strong>Email:</strong> {SUPPLIER_CONTACT.email}</li>
            <li><strong>WhatsApp:</strong> {SUPPLIER_CONTACT.whatsapp}</li>
            <li><strong>Telegram:</strong> {SUPPLIER_CONTACT.telegram}</li>
            <li><strong>Hours:</strong> {SUPPLIER_CONTACT.hours}</li>
          </ul>

          <h2 className="section-title text-2xl">Core pages</h2>
          <ul className="text-neutral-600 space-y-2 mb-12">
            {SUPPLIER_CORE_PAGES.map((p) => (
              <li key={p.url}>
                <Link href={p.url.replace(SITE_URL, "")} className="text-blue-700 hover:underline">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="section-title text-2xl">Machine-readable resources</h2>
          <ul className="text-neutral-600 space-y-2">
            {SUPPLIER_MACHINE_READABLE.map((r) => (
              <li key={r.url}>
                <a href={r.url} className="text-blue-700 hover:underline">
                  {r.label}
                </a>
                <span className="text-neutral-400"> — {r.url}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
