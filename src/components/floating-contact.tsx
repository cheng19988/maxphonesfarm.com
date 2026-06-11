"use client";

import { useState } from "react";
import { CONTACT } from "@/lib/config";

const CHANNELS = [
  {
    id: "telegram",
    label: "Telegram",
    value: CONTACT.telegram,
    href: CONTACT.telegramUrl,
    external: true,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: CONTACT.whatsapp,
    href: CONTACT.whatsappUrl,
    external: true,
  },
  {
    id: "email",
    label: "Email",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    external: false,
  },
] as const;

export function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          className="w-72 rounded-xl border border-neutral-200 bg-white p-4 shadow-xl shadow-neutral-900/10"
          role="dialog"
          aria-label="Contact options"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-neutral-400">
            Contact Sales
          </p>
          <ul className="space-y-2">
            {CHANNELS.map((channel) => (
              <li key={channel.id}>
                <a
                  href={channel.href}
                  target={channel.external ? "_blank" : undefined}
                  rel={channel.external ? "noopener noreferrer" : undefined}
                  className="flex flex-col rounded-lg px-3 py-2.5 transition-colors hover:bg-blue-50"
                  onClick={() => setOpen(false)}
                >
                  <span className="text-xs font-medium text-neutral-500">{channel.label}</span>
                  <span className="text-sm font-medium text-neutral-900">{channel.value}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label={open ? "Close contact menu" : "Open contact menu"}
        className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-blue-900/20 transition-colors hover:bg-blue-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-4 w-4"
          aria-hidden
        >
          {open ? (
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          ) : (
            <>
              <path strokeLinecap="round" d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
            </>
          )}
        </svg>
        {open ? "Close" : "Contact"}
      </button>
    </div>
  );
}
