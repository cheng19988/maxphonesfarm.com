import { FAQAccordion } from "@/components/commerce";
import { PageHero, SectionHeader } from "@/components/page-hero";
import { ContactCTA, JsonLd } from "@/components/shared";
import { ALL_FAQ_ITEMS, B2B_PURCHASE_FAQ } from "@/data/faq";
import { BUYER_SPEC_FAQ } from "@/data/buyer-spec-faq";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { IMAGES } from "@/lib/images";

export const metadata = buildMetadata({
  title: "Phone Farm FAQ — Specs, Shipping, Payment & Procurement",
  description:
    "Phone farm box FAQ — dimensions, weight, power, MOQ, USDT payment, wholesale, 2U rackmount, export shipping, warranty, and remote setup. Factory-direct Guangzhou supplier.",
  path: "/faq",
});

export default function FAQPage() {
  const buyerQuestions = new Set<string>(BUYER_SPEC_FAQ.map((item) => item.question));
  const b2bQuestions = new Set<string>(B2B_PURCHASE_FAQ.map((item) => item.question));
  const generalFaq = ALL_FAQ_ITEMS.filter(
    (item) => !buyerQuestions.has(item.question) && !b2bQuestions.has(item.question)
  );

  return (
    <>
      <JsonLd data={faqJsonLd(ALL_FAQ_ITEMS)} />
      <PageHero
        label="Support"
        title="Frequently Asked Questions"
        subtitle="Specs, logistics, warranty, and setup — the questions buyers ask before ordering. Monday–Friday (UTC+8) · typical response within one business day."
        image={IMAGES.serviceControl}
        imageAlt="Max Phones Farm support"
      />
      <section className="section-tight">
        <div className="container-wide max-w-4xl">
          <SectionHeader
            label="Before you buy"
            title="Dimensions, Power, Models & Logistics"
            subtitle="Direct answers on chassis size, weight, voltage, phone compatibility, delivery, packing, warranty, and remote setup."
          />
          <FAQAccordion items={[...BUYER_SPEC_FAQ]} />
          <div className="mt-16 mb-8">
            <SectionHeader
              label="Procurement"
              title="Buying from a Factory — MOQ, Payment & Product Choice"
              subtitle="Where to buy, wholesale, USDT, rackmount vs box, app testing labs, and custom builds."
            />
          </div>
          <FAQAccordion items={[...B2B_PURCHASE_FAQ]} />
          <div className="mt-16 mb-8">
            <SectionHeader
              label="General"
              title="Hardware, Shipping & Support"
            />
          </div>
          <FAQAccordion items={generalFaq} />
          <div className="mt-16">
            <ContactCTA title="Still Have Questions?" />
          </div>
        </div>
      </section>
    </>
  );
}
