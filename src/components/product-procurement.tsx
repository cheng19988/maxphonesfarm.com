import type { ProductProcurement } from "@/data/product-procurement";

const ROWS: { key: keyof ProductProcurement; label: string }[] = [
  { key: "moq", label: "MOQ" },
  { key: "leadTime", label: "Lead time" },
  { key: "packingSize", label: "Packing size" },
  { key: "grossWeight", label: "Gross weight (packed)" },
  { key: "voltage", label: "Voltage / power" },
  { key: "warranty", label: "Warranty" },
  { key: "shippingMethod", label: "Shipping method" },
  { key: "paymentProcess", label: "Payment process" },
];

export function ProductProcurementTable({ data }: { data: ProductProcurement }) {
  return (
    <section className="surface border border-neutral-200 rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50">
        <h2 className="text-lg font-semibold text-neutral-900">Procurement &amp; Export</h2>
        <p className="text-sm text-neutral-600 mt-1">Factory-direct from Guangzhou — quote-first B2B</p>
      </div>
      <table className="w-full text-sm">
        <tbody>
          {ROWS.map(({ key, label }) => (
            <tr key={key} className="border-b border-neutral-100 last:border-0">
              <th className="py-3.5 px-6 text-left font-medium text-neutral-800 bg-white w-2/5 align-top">
                {label}
              </th>
              <td className="py-3.5 px-6 text-neutral-600 leading-relaxed">{data[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
