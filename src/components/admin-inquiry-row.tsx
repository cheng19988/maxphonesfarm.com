"use client";

import { useState } from "react";

const STATUSES = ["New", "Contacted", "Quoted", "Closed"] as const;

const STATUS_STYLE: Record<string, string> = {
  New: "text-green-400 border-green-800 bg-green-950/30",
  Contacted: "text-blue-400 border-blue-800 bg-blue-950/30",
  Quoted: "text-amber-400 border-amber-800 bg-amber-950/30",
  Closed: "text-neutral-500 border-neutral-700 bg-neutral-900/50",
};

type Props = {
  id: string;
  name: string;
  company: string | null;
  email: string;
  whatsapp: string | null;
  country: string | null;
  deviceQuantity: string | null;
  productInterest: string | null;
  platform: string | null;
  connectionMode: string | null;
  message: string | null;
  sourcePage: string | null;
  status: string;
  createdAt: string;
};

export function AdminInquiryRow(props: Props) {
  const [status, setStatus] = useState(props.status || "New");
  const [saving, setSaving] = useState(false);

  async function updateStatus(next: string) {
    setSaving(true);
    setStatus(next);
    const res = await fetch(`/api/admin/inquiries/${props.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    if (!res.ok) setStatus(props.status);
    setSaving(false);
  }

  return (
    <div className="border border-neutral-800 p-4 text-sm bg-neutral-950">
      <div className="flex flex-wrap justify-between gap-3 mb-3">
        <div>
          <p className="text-white font-medium">{props.name}</p>
          {props.company && <p className="text-neutral-500 text-xs mt-0.5">{props.company}</p>}
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-xs px-2 py-1 border ${STATUS_STYLE[status] ?? STATUS_STYLE.New}`}>
            {status}
          </span>
          <select
            value={status}
            disabled={saving}
            onChange={(e) => updateStatus(e.target.value)}
            className="input-field text-xs py-1 w-auto"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="text-neutral-400 text-xs mb-2">
        {props.createdAt.slice(0, 16).replace("T", " ")} UTC
        {props.sourcePage ? ` · ${props.sourcePage}` : ""}
      </p>
      <p className="text-neutral-400">
        {props.email}
        {props.whatsapp ? ` · ${props.whatsapp}` : ""}
        {props.country ? ` · ${props.country}` : ""}
        {props.deviceQuantity ? ` · Qty: ${props.deviceQuantity}` : ""}
      </p>
      {props.productInterest && (
        <p className="text-neutral-500 mt-1">Interest: {props.productInterest}</p>
      )}
      {(props.platform || props.connectionMode) && (
        <p className="text-neutral-500 mt-1">
          {props.platform ? `Platform: ${props.platform}` : ""}
          {props.platform && props.connectionMode ? " · " : ""}
          {props.connectionMode ? `Mode: ${props.connectionMode}` : ""}
        </p>
      )}
      {props.message && (
        <p className="text-neutral-500 mt-2 whitespace-pre-wrap">{props.message}</p>
      )}
    </div>
  );
}
