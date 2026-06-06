import { ContactForm, ContactFallbackLinks } from "@/components/contact-form";
import { ContactBar } from "@/components/shared";
import { buildMetadata } from "@/lib/seo";
import { CONTACT, SITE } from "@/lib/config";
import { whatsappQuoteUrl } from "@/lib/whatsapp";

export const metadata = buildMetadata({
  title: "Contact — Request a Hardware Quote",
  description:
    "Contact our Guangzhou team for rackmount phone farm hardware quotes. WhatsApp, Telegram, phone, and email — reply usually within 24 hours on business days.",
  path: "/contact",
});

type Props = {
  searchParams: Promise<{ product?: string; service?: string }>;
};

export default async function ContactPage({ searchParams }: Props) {
  const params = await searchParams;
  const defaultInterest = params.product || params.service || "";

  return (
    <div className="section">
      <div className="container-wide max-w-4xl">
        <h1 className="section-title">Contact Sales</h1>
        <p className="section-subtitle">
          Share your target device count, models, and destination country. Our Guangzhou hardware team will reply with specifications, lead time, and a USD quote.
        </p>

        <div className="border border-neutral-800 p-6 mb-8 bg-neutral-950">
          <h2 className="font-medium text-white mb-4">Direct Contact</h2>
          <ContactBar />
          <dl className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
            <div>
              <dt className="text-neutral-600">Phone</dt>
              <dd>
                <a href={`tel:${CONTACT.phone}`} className="text-neutral-300 hover:text-white">
                  {CONTACT.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-neutral-600">WhatsApp</dt>
              <dd>
                <a href={whatsappQuoteUrl()} target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-white">
                  {CONTACT.whatsapp}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-neutral-600">Telegram</dt>
              <dd>
                <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-white">
                  {CONTACT.telegram}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-neutral-600">Email</dt>
              <dd>
                <a href={`mailto:${CONTACT.email}`} className="text-neutral-300 hover:text-white">
                  {CONTACT.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-neutral-600">Location</dt>
              <dd className="text-neutral-300">{SITE.location}</dd>
            </div>
            <div>
              <dt className="text-neutral-600">Response time</dt>
              <dd className="text-neutral-300">Usually within 24 hours · Mon–Fri UTC+8</dd>
            </div>
          </dl>
        </div>

        <h2 className="text-lg font-medium text-white mb-4">Send an Inquiry</h2>
        <ContactForm defaultInterest={defaultInterest} />
        <ContactFallbackLinks />
      </div>
    </div>
  );
}
