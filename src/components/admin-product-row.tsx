"use client";

import { useState } from "react";

export function AdminProductRow({
  id,
  name,
  priceUsd,
  stock,
}: {
  id: string;
  name: string;
  priceUsd: number;
  stock: number;
}) {
  const [price, setPrice] = useState(String(priceUsd));
  const [qty, setQty] = useState(String(stock));
  const [saved, setSaved] = useState(false);

  async function save() {
    await fetch("/api/admin/products", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: id, priceUsd: price, stock: qty }),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <tr className="border-b border-neutral-800">
      <td className="py-3 px-4 text-white">{name}</td>
      <td className="py-3 px-4">
        <input value={price} onChange={(e) => setPrice(e.target.value)} className="input-field w-24 text-sm py-1" />
      </td>
      <td className="py-3 px-4">
        <input value={qty} onChange={(e) => setQty(e.target.value)} className="input-field w-20 text-sm py-1" />
      </td>
      <td className="py-3 px-4">
        <button type="button" onClick={save} className="text-neutral-400 text-xs hover:text-white underline underline-offset-4">
          {saved ? "Saved" : "Save"}
        </button>
      </td>
    </tr>
  );
}
