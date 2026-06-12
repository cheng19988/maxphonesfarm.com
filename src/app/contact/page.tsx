import { PageHero } from "@/components/page-hero";
import { ContactInquiryForm } from "@/components/contact-inquiry-form";
import { buildMetadata, contactPageJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared";
import { SITE } from "@/lib/config";
import { IMAGES } from "@/lib/images";
import { getPublishedProducts } from "@/lib/products";

export const metadata = buildMetadata({
  title: "Contact — Request a Phone Farm Hardware Quote",
  description:
    "Request a quote for phone farm box and rackmount hardware from Guangzhou. WhatsApp, Telegram, email — MOQ 1, export worldwide, T/T/Wise/PayPal, USDT on request. Reply within one business day.",
  path: "/contact",
});

type Props = {
  searchParams: Promise<{ product?: string; service?: string; sent?: string; ref?: string; error?: string }>;
};

export default async function ContactPage({ searchParams }: Props) {
  const params = await searchParams;
  const defaultInterest = params.product || params.service || "";
  const sourcePage = params.product
    ? `/products/${params.product}`
    : params.service
      ? `/services (${params.service})`
      : "/contact";
  const sent = params.sent === "1";
  const inquiryRef = params.ref;
  const error = params.error;

  const products = await getPublishedProducts();
  const productOptions = products.map((p) => ({ slug: p.slug, name: p.name }));

  return (
    <>
      <JsonLd data={contactPageJsonLd()} />
      <PageHero
        label={`${SITE.location} · Factory-direct since 2017`}
        title="Request a Hardware Quote"
        subtitle="Quote for phone farm box, rackmount, or custom chassis — include device count, Android/iOS models, and destination country. Guangzhou team replies with specs, lead time, USD pricing, and export shipping options within one business day (UTC+8)."
        image={IMAGES.office}
        imageAlt="Max Phones Farm Guangzhou office"
      />

      <section className="section-tight border-b border-neutral-200 bg-neutral-50">
        <div className="container-wide max-w-5xl">
          <ul className="grid sm:grid-cols-3 gap-6 text-sm text-neutral-600">
            <li>
              <span className="block font-medium text-neutral-900 mb-1">Payment</span>
              T/T bank transfer, Wise, or PayPal on pro-forma. USDT (Tron TRC20) when agreed on quote.
            </li>
            <li>
              <span className="block font-medium text-neutral-900 mb-1">Export shipping</span>
              Worldwide from Guangzhou — express air or sea freight, DDU/DDP quoted per destination.
            </li>
            <li>
              <span className="block font-medium text-neutral-900 mb-1">MOQ &amp; response</span>
              One unit on standard models. Sales replies Monday–Friday UTC+8, typically within one business day.
            </li>
          </ul>
        </div>
      </section>

      <section className="section-tight border-b border-neutral-200 bg-white">
        <div className="container-wide max-w-6xl">
          <ContactInquiryForm
            products={productOptions}
            defaultInterest={defaultInterest}
            sourcePage={sourcePage}
            sent={sent}
            inquiryRef={inquiryRef}
            error={error}
          />
        </div>
      </section>
    </>
  );
}
