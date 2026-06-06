"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { ContactBar } from "@/components/shared";
import { CONTACT, SITE } from "@/lib/config";

function ContactForm() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/contact", { method: "POST", body: form });
    setStatus(res.ok ? "success" : "error");
  }

  return (
    <form onSubmit={handleSubmit} className="border border-neutral-800 p-6 space-y-4 bg-neutral-950">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-neutral-500 mb-1">Name *</label>
          <input name="name" required className="input-field" />
        </div>
        <div>
          <label className="block text-sm text-neutral-500 mb-1">Country</label>
          <input name="country" className="input-field" />
        </div>
        <div>
          <label className="block text-sm text-neutral-500 mb-1">WhatsApp / Telegram</label>
          <input name="whatsapp" className="input-field" />
        </div>
        <div>
          <label className="block text-sm text-neutral-500 mb-1">Phone</label>
          <input name="phone" className="input-field" />
        </div>
        <div>
          <label className="block text-sm text-neutral-500 mb-1">Email *</label>
          <input name="email" type="email" required className="input-field" />
        </div>
        <div>
          <label className="block text-sm text-neutral-500 mb-1">Device Quantity</label>
          <input name="deviceQuantity" placeholder="e.g. 20, 100, custom rack" className="input-field" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm text-neutral-500 mb-1">Product or Service Interest</label>
          <input
            name="productInterest"
            defaultValue={searchParams.get("product") || searchParams.get("service") || ""}
            placeholder="e.g. Rackmount Phone Farm +20, remote control setup"
            className="input-field"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm text-neutral-500 mb-1">Budget (optional)</label>
          <input name="budget" className="input-field" />
        </div>
      </div>
      <div>
        <label className="block text-sm text-neutral-500 mb-1">Message</label>
        <textarea name="message" rows={4} placeholder="Device models, timeline, shipping country, custom requirements…" className="input-field" />
      </div>
      <button type="submit" disabled={status === "loading"} className="btn-primary w-full">
        {status === "loading" ? "Sending…" : "Send Inquiry"}
      </button>
      {status === "success" && <p className="text-green-400 text-sm">Thank you. We typically reply within one business day.</p>}
      {status === "error" && <p className="text-red-400 text-sm">Could not send the form. Please contact us on WhatsApp or Telegram directly.</p>}
    </form>
  );
}

export default function ContactPage() {
  return (
    <div className="section">
      <div className="container-wide max-w-4xl">
        <h1 className="section-title">Contact Sales</h1>
        <p className="section-subtitle">
          Tell us your device count, target models, and shipping country. Our Guangzhou team will reply with specs, lead time, and a quote.
        </p>

        <div className="border border-neutral-800 p-6 mb-8 bg-neutral-950">
          <h2 className="font-medium text-white mb-4">Direct Contact</h2>
          <ContactBar />
          <dl className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm text-neutral-400">
            <div><dt className="text-neutral-600">Phone</dt><dd className="text-neutral-300">{CONTACT.phone}</dd></div>
            <div><dt className="text-neutral-600">WhatsApp</dt><dd className="text-neutral-300">{CONTACT.whatsapp}</dd></div>
            <div><dt className="text-neutral-600">Telegram</dt><dd className="text-neutral-300">{CONTACT.telegram}</dd></div>
            <div><dt className="text-neutral-600">Email</dt><dd className="text-neutral-300">{CONTACT.email}</dd></div>
            <div><dt className="text-neutral-600">Location</dt><dd className="text-neutral-300">{SITE.location}</dd></div>
            <div><dt className="text-neutral-600">Hours</dt><dd className="text-neutral-300">Mon–Fri · UTC+8</dd></div>
          </dl>
        </div>

        <Suspense fallback={<div className="border border-neutral-800 p-6 text-neutral-500">Loading form…</div>}>
          <ContactForm />
        </Suspense>
      </div>
    </div>
  );
}
