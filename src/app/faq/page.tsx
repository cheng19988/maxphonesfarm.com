import { FAQAccordion } from "@/components/commerce";
import { PageHero } from "@/components/page-hero";
import { ContactCTA, JsonLd } from "@/components/shared";
import { FAQ_ITEMS } from "@/data/faq";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { IMAGES } from "@/lib/images";

export const metadata = buildMetadata({
  title: "Device Lab Hardware FAQ",
  description:
    "Answers about rackmount phone farm hardware, customization, delivery, power, cooling, remote control setup, and contacting our Guangzhou team.",
  path: "/faq",
});

export default function FAQPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQ_ITEMS)} />
      <PageHero
        label="Support"
        title="Frequently Asked Questions"
        subtitle="Hardware, delivery, and support questions for enterprise device lab buyers. Monday–Friday (UTC+8) · typical response within one business day."
        image={IMAGES.serviceControl}
        imageAlt="Max Phones Farm support"
      />
      <section className="section-tight">
        <div className="container-wide max-w-4xl">
          <FAQAccordion items={FAQ_ITEMS} />
          <div className="mt-16">
            <ContactCTA title="Still Have Questions?" />
          </div>
        </div>
      </section>
    </>
  );
}
