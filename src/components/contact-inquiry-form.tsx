import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { CONTACT, SITE } from "@/lib/config";
import { IMAGES } from "@/lib/images";
import { emailComposeUrl } from "@/lib/email-link";
import { whatsappQuoteUrl } from "@/lib/whatsapp";
import { ORDER_PROCESS } from "@/data/order-process";
import { submitContactInquiry } from "@/app/contact/actions";

type ProductOption = { slug: string; name: string };

type Props = {
  products: ProductOption[];
  defaultInterest: string;
  sourcePage: string;
  sent: boolean;
  inquiryRef?: string;
  error?: string;
};

export function ContactInquiryForm({
  products,
  defaultInterest,
  sourcePage,
  sent,
  inquiryRef,
  error,
}: Props) {
  const matchedSlug = products.find(
    (p) => p.slug === defaultInterest || p.name === defaultInterest
  )?.slug;

  if (sent) {
    return (
      <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
        <div className="lg:col-span-3 surface-elevated p-8 md:p-10 rounded-2xl border border-green-200 bg-green-50/50">
          <p className="text-xs font-semibold uppercase tracking-wider text-green-800 mb-3">Inquiry received</p>
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">We&apos;ll reply within one business day</h2>
          {inquiryRef && (
            <p className="text-sm text-neutral-700 mb-4">
              Reference: <span className="font-mono font-medium text-neutral-900">{inquiryRef}</span>
              {" — "}quote this ID if you follow up on WhatsApp.
            </p>
          )}
          <p className="text-neutral-600 leading-relaxed mb-8">
            Our Guangzhou sales team reviews inquiries Monday–Friday (UTC+8). You&apos;ll receive specifications,
            lead time, and USD pricing by email or the messenger you provided.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={whatsappQuoteUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Open WhatsApp
            </a>
            <Link href="/products" className="btn-outline">
              Browse catalog
            </Link>
          </div>
        </div>
        <aside className="lg:col-span-2 space-y-6">
          <ProcessSidebar />
        </aside>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
      <div className="lg:col-span-3">
        {error && (
          <div className="mb-6 text-red-900 text-sm border border-red-200 bg-red-50 p-4 rounded-xl" role="alert">
            {error === "validation" ? (
              "Please enter your name and at least one contact method (email or WhatsApp/Telegram)."
            ) : (
              <>
                We couldn&apos;t save your inquiry right now. Please contact us directly on{" "}
                <a href={whatsappQuoteUrl()} target="_blank" rel="noopener noreferrer" className="underline font-medium">
                  WhatsApp
                </a>
                ,{" "}
                <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className="underline font-medium">
                  Telegram
                </a>
                , or{" "}
                <a href={emailComposeUrl()} target="_blank" rel="noopener noreferrer" className="underline font-medium">
                  email
                </a>
                .
              </>
            )}
          </div>
        )}

        <form action={submitContactInquiry} className="surface border border-neutral-200 rounded-2xl overflow-hidden">
          <div className="px-6 md:px-8 py-5 border-b border-neutral-200 bg-neutral-50">
            <h2 className="text-lg font-semibold text-neutral-900">Hardware quote request</h2>
            <p className="text-sm text-neutral-600 mt-1">
              Factory-direct from {SITE.location} · Est. 2017 · MOQ 1 unit on standard models
            </p>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            <fieldset className="space-y-4">
              <legend className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                Your details
              </legend>
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField id="contact-name" label="Full name" required>
                  <input id="contact-name" name="name" required autoComplete="name" className="input-field" />
                </FormField>
                <FormField id="contact-company" label="Company / team">
                  <input
                    id="contact-company"
                    name="company"
                    autoComplete="organization"
                    placeholder="Optional"
                    className="input-field"
                  />
                </FormField>
                <FormField id="contact-country" label="Ship-to country" hint="For freight and DDU/DDP quote">
                  <input
                    id="contact-country"
                    name="country"
                    autoComplete="country-name"
                    placeholder="e.g. United States"
                    className="input-field"
                  />
                </FormField>
              </div>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                How we reach you <span className="text-red-600 normal-case font-normal">(email or messenger required)</span>
              </legend>
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField id="contact-email" label="Work email">
                  <input id="contact-email" name="email" type="email" autoComplete="email" className="input-field" />
                </FormField>
                <FormField id="contact-whatsapp" label="WhatsApp or Telegram">
                  <input
                    id="contact-whatsapp"
                    name="whatsapp"
                    placeholder="+1 555 000 0000 or @handle"
                    className="input-field"
                  />
                </FormField>
              </div>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                Project scope
              </legend>
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField id="contact-product" label="Product interest" className="sm:col-span-2">
                  <select
                    id="contact-product"
                    name="productInterest"
                    defaultValue={matchedSlug || defaultInterest}
                    className="input-field"
                  >
                    <option value="">Select a product or leave for general inquiry</option>
                    {products.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.name}
                      </option>
                    ))}
                    <option value="custom-multi-rack">Custom / multi-rack project</option>
                    <option value="remote-setup-only">Remote control setup only</option>
                  </select>
                </FormField>
                <FormField id="contact-quantity" label="Target quantity">
                  <input
                    id="contact-quantity"
                    name="deviceQuantity"
                    placeholder="e.g. 2 chassis, 40 nodes"
                    className="input-field"
                  />
                </FormField>
                <FormField id="contact-budget" label="Budget range (USD)">
                  <input id="contact-budget" name="budget" placeholder="e.g. $3,000 – $8,000" className="input-field" />
                </FormField>
              </div>
              <FormField
                id="contact-message"
                label="Device models, use case & timeline"
                hint="Android/iOS models, app testing vs automation, desired delivery date"
              >
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="Example: 20× Samsung A15 for QA automation lab, rackmount preferred, ship to Germany by August. Need ADB setup handover."
                  className="input-field resize-y min-h-[120px]"
                />
              </FormField>
            </fieldset>
          </div>

          <input type="hidden" name="sourcePage" value={sourcePage} />

          <div className="px-6 md:px-8 py-5 border-t border-neutral-200 bg-neutral-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-xs text-neutral-500 max-w-sm">
              No online checkout. You&apos;ll receive a written quote before any payment is due.
            </p>
            <button type="submit" className="btn-primary px-8 py-3 shrink-0">
              Submit quote request
            </button>
          </div>
        </form>
      </div>

      <aside className="lg:col-span-2 space-y-6">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-200">
          <Image src={IMAGES.meeting} alt="Max Phones Farm sales and engineering team" fill className="object-cover" sizes="40vw" />
        </div>
        <ProcessSidebar />
        <div className="surface p-6 rounded-xl border border-neutral-200 text-sm">
          <p className="font-semibold text-neutral-900 mb-3">Prefer to talk first?</p>
          <div className="space-y-2 text-neutral-600">
            <p>
              <a href={whatsappQuoteUrl()} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
                WhatsApp {CONTACT.whatsapp}
              </a>
            </p>
            <p>
              <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
                Telegram {CONTACT.telegram}
              </a>
            </p>
            <p>
              <a href={emailComposeUrl()} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
                {CONTACT.email}
              </a>
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}

function ProcessSidebar() {
  return (
    <div className="surface p-6 rounded-xl border border-neutral-200">
      <h3 className="font-semibold text-neutral-900 mb-4">What happens after you submit</h3>
      <ol className="space-y-4">
        {ORDER_PROCESS.map((item) => (
          <li key={item.step} className="flex gap-3 text-sm">
            <span className="font-mono text-xs text-blue-700 shrink-0 pt-0.5">{item.step}</span>
            <div>
              <p className="font-medium text-neutral-900">{item.title}</p>
              <p className="text-neutral-600 leading-relaxed mt-0.5">{item.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function FormField({
  id,
  label,
  hint,
  required,
  className,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-neutral-800 mb-1.5">
        {label}
        {required && <span className="text-red-600 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-neutral-500 mt-1.5">{hint}</p>}
    </div>
  );
}
