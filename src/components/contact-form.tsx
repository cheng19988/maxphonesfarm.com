"use client";

import { useState } from "react";
import Link from "next/link";
import { CONTACT } from "@/lib/config";
import { whatsappQuoteUrl } from "@/lib/whatsapp";

type Props = {
  defaultInterest?: string;
};

export function ContactForm({ defaultInterest = "" }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/contact", { method: "POST", body: form });
    setStatus(res.ok ? "success" : "error");
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="border border-neutral-800 p-6 space-y-4 bg-neutral-950">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-neutral-500 mb-1">Name *</label>
            <input name="name" required className="input-field" />
          </div>
          <div>
            <label className="block text-sm text-neutral-500 mb-1">Country / Destination</label>
            <input name="country" placeholder="e.g. United States, Germany" className="input-field" />
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
            <label className="block text-sm text-neutral-500 mb-1">Target Device Quantity</label>
            <input name="deviceQuantity" placeholder="e.g. 20, 100, custom rack" className="input-field" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm text-neutral-500 mb-1">Product or Service Interest</label>
            <input
              name="productInterest"
              defaultValue={defaultInterest}
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
          <textarea
            name="message"
            rows={4}
            placeholder="Device models, use case (app testing, ad verification, automation workflows), timeline, custom requirements…"
            className="input-field"
          />
        </div>
        <button type="submit" disabled={status === "loading"} className="btn-primary w-full">
          {status === "loading" ? "Sending…" : "Send Inquiry"}
        </button>
        {status === "success" && (
          <p className="text-green-400 text-sm">Thank you. We typically reply within one business day (UTC+8).</p>
        )}
        {status === "error" && (
          <p className="text-red-400 text-sm">
            Could not send the form. Please use{" "}
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
          </p>
        )}
      </form>
    </div>
  );
}

export function ContactFallbackLinks() {
  return (
    <p className="mt-4 text-sm text-neutral-500">
      Prefer direct contact?{" "}
      <a href={whatsappQuoteUrl()} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4">
        WhatsApp
      </a>
      {" · "}
      <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4">
        Telegram
      </a>
      {" · "}
      <a href={`mailto:${CONTACT.email}`} className="text-white underline underline-offset-4">
        Email
      </a>
      {" · "}
      <Link href={`tel:${CONTACT.phone}`} className="text-white underline underline-offset-4">
        Phone
      </Link>
    </p>
  );
}
