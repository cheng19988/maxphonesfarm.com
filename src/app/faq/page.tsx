import { FAQAccordion } from "@/components/commerce";
import { ContactCTA, JsonLd } from "@/components/shared";
import { FAQ_ITEMS } from "@/data/faq";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

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
      <div className="section">
        <div className="container-wide max-w-3xl">
          <h1 className="section-title">FAQ</h1>
          <p className="section-subtitle">
            Hardware, delivery, and support questions for enterprise device lab buyers.
          </p>
          <FAQAccordion items={FAQ_ITEMS} />
          <div className="mt-16">
            <ContactCTA title="Still Have Questions?" />
          </div>
        </div>
      </div>
    </>
  );
}
