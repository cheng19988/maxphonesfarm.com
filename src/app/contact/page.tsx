import { ContactBar } from "@/components/shared";
import { PageHero } from "@/components/page-hero";
import { buildMetadata } from "@/lib/seo";
import { CONTACT, SITE } from "@/lib/config";
import { IMAGES } from "@/lib/images";
import { whatsappQuoteUrl } from "@/lib/whatsapp";
import { submitContactInquiry } from "./actions";

export const metadata = buildMetadata({
  title: "Contact — Request a Hardware Quote",
  description:
    "Contact our Guangzhou team for rackmount phone farm hardware quotes. WhatsApp, Telegram, and email — reply usually within 24 hours on business days.",
  path: "/contact",
});

type Props = {
  searchParams: Promise<{ product?: string; service?: string; sent?: string; error?: string }>;
};

function ContactFallbackLinks() {
  return (
    <p className="mt-4 text-sm text-neutral-500">
      Prefer direct contact?{" "}
      <a href={whatsappQuoteUrl()} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline underline-offset-4">
        WhatsApp
      </a>
      {" · "}
      <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline underline-offset-4">
        Telegram
      </a>
      {" · "}
      <a href={`mailto:${CONTACT.email}`} className="text-blue-700 underline underline-offset-4">
        Email
      </a>
    </p>
  );
}

export default async function ContactPage({ searchParams }: Props) {
  const params = await searchParams;
  const defaultInterest = params.product || params.service || "";
  const sourcePage = params.product
    ? `/products/${params.product}`
    : params.service
      ? `/services (${params.service})`
      : "/contact";
  const sent = params.sent === "1";
  const error = params.error;

  return (
    <>
      <PageHero
        label={SITE.location}
        title="Contact Sales"
        subtitle="Share your target device count, models, and destination country. Our Guangzhou hardware team will reply with specifications, lead time, and a USD quote."
        image={IMAGES.office}
        imageAlt="Contact Max Phones Farm sales team"
      />

      <div className="section-tight border-b border-neutral-200 bg-white">
        <div className="container-wide max-w-4xl">
        <div className="surface p-6 mb-8 rounded-xl">
          <h2 className="font-semibold text-neutral-900 mb-4">Direct Contact</h2>
          <ContactBar />
          <dl className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
            <div>
              <dt className="text-neutral-600">WhatsApp</dt>
              <dd>
                <a href={whatsappQuoteUrl()} target="_blank" rel="noopener noreferrer" className="text-neutral-700 hover:text-blue-700">
                  {CONTACT.whatsapp}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-neutral-600">Telegram</dt>
              <dd>
                <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-blue-700">
                  {CONTACT.telegram}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-neutral-600">Email</dt>
              <dd>
                <a href={`mailto:${CONTACT.email}`} className="text-neutral-300 hover:text-blue-700">
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

        <h2 className="text-lg font-semibold text-neutral-900 mb-4">Send an Inquiry</h2>

        {sent && (
          <p className="mb-4 text-green-400 text-sm border border-green-900/50 bg-green-950/20 p-4">
            Thank you. We typically reply within one business day (UTC+8).
          </p>
        )}

        {error && (
          <p className="mb-4 text-red-400 text-sm border border-red-900/50 bg-red-950/20 p-4">
            {error === "validation"
              ? "Please provide your name and either email or WhatsApp."
              : "Could not send the form. Please use "}
            {error !== "validation" && (
              <>
                <a href={whatsappQuoteUrl()} target="_blank" rel="noopener noreferrer" className="underline">
                  WhatsApp
                </a>
                ,{" "}
                <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className="underline">
                  Telegram
                </a>
                , or{" "}
                <a href={`mailto:${CONTACT.email}`} className="underline">
                  {CONTACT.email}
                </a>
                .
              </>
            )}
          </p>
        )}

        <form action={submitContactInquiry} className="surface p-6 md:p-8 space-y-4 rounded-xl">
          <input type="hidden" name="sourcePage" value={sourcePage} />
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-name" className="block text-sm text-neutral-500 mb-1">
                Name *
              </label>
              <input id="contact-name" name="name" required className="input-field" />
            </div>
            <div>
              <label htmlFor="contact-company" className="block text-sm text-neutral-500 mb-1">
                Company
              </label>
              <input id="contact-company" name="company" placeholder="Company or team name" className="input-field" />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm text-neutral-500 mb-1">
                Email
              </label>
              <input id="contact-email" name="email" type="email" className="input-field" />
            </div>
            <div>
              <label htmlFor="contact-whatsapp" className="block text-sm text-neutral-500 mb-1">
                WhatsApp / Telegram
              </label>
              <input id="contact-whatsapp" name="whatsapp" placeholder="WhatsApp or Telegram handle" className="input-field" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="contact-product" className="block text-sm text-neutral-500 mb-1">
                Product or Service Interest
              </label>
              <input
                id="contact-product"
                name="productInterest"
                defaultValue={defaultInterest}
                placeholder="e.g. Rackmount Phone Farm +20, remote control setup"
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="contact-quantity" className="block text-sm text-neutral-500 mb-1">
                Target Quantity
              </label>
              <input
                id="contact-quantity"
                name="deviceQuantity"
                placeholder="e.g. 20 units, 3 racks"
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="contact-country" className="block text-sm text-neutral-500 mb-1">
                Destination Country
              </label>
              <input id="contact-country" name="country" placeholder="e.g. United States, Germany" className="input-field" />
            </div>
          </div>
          <div>
            <label htmlFor="contact-message" className="block text-sm text-neutral-500 mb-1">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              placeholder="Device models, use case (app testing, ad verification, automation workflows), timeline, custom requirements…"
              className="input-field"
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Send Inquiry
          </button>
        </form>

        <ContactFallbackLinks />
        </div>
      </div>
    </>
  );
}
