import { ORDER_PROCESS } from "@/data/order-process";

export function OrderProcessSteps({ compact = false }: { compact?: boolean }) {
  return (
    <ol className={compact ? "space-y-4" : "grid sm:grid-cols-2 gap-5"}>
      {ORDER_PROCESS.map((item) => (
        <li
          key={item.step}
          className={compact ? "flex gap-4" : "surface p-6 rounded-xl border border-neutral-200"}
        >
          <span className="text-sm font-semibold text-blue-700 shrink-0 tabular-nums">{item.step}</span>
          <div>
            <h3 className="font-medium text-neutral-900 mb-1.5">{item.title}</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">{item.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function OrderProcessNote() {
  return (
    <p className="text-sm text-neutral-600 leading-relaxed border-l-2 border-blue-200 pl-4">
      <span className="font-medium text-neutral-900">Quote-first B2B.</span> List prices are shown for reference.
      Final pricing, freight, and payment method are confirmed on your written quote — not at online checkout.
    </p>
  );
}
