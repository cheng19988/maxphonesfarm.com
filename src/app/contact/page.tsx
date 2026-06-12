import { PageHero } from "@/components/page-hero";
import { ContactInquiryForm } from "@/components/contact-inquiry-form";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/config";
import { IMAGES } from "@/lib/images";
import { getPublishedProducts } from "@/lib/products";

export const metadata = buildMetadata({
  title: "Contact — Request a Hardware Quote",
  description:
    "Contact our Guangzhou team for rackmount phone farm hardware quotes. WhatsApp, Telegram, and email — reply usually within 24 hours on business days.",
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
      <PageHero
        label={`${SITE.location} · Factory-direct since 2017`}
        title="Request a Hardware Quote"
        subtitle="Tell us your device count, models, and destination country. Our Guangzhou assembly team replies with specifications, lead time, and USD pricing — typically within one business day."
        image={IMAGES.office}
        imageAlt="Max Phones Farm Guangzhou office"
      />

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
