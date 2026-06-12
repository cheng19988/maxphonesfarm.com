import { formatProductPrice, isCustomQuotePrice, REFERENCE_PRICE_NOTE } from "@/lib/format-price";

type Props = {
  priceUsd: number;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClass = {
  sm: "text-sm font-semibold text-blue-700",
  md: "text-lg font-semibold text-neutral-900",
  lg: "text-3xl font-semibold text-blue-700",
} as const;

/** Visible reference pricing — not a checkout price. */
export function ReferencePrice({ priceUsd, size = "md", className = "" }: Props) {
  const label = formatProductPrice(priceUsd);

  return (
    <div className={className}>
      <p className={sizeClass[size]}>
        {isCustomQuotePrice(priceUsd) ? label : `${label} USD`}
        {!isCustomQuotePrice(priceUsd) && (
          <span className="block text-[10px] uppercase tracking-wider text-neutral-500 font-medium mt-1">
            Reference list price
          </span>
        )}
      </p>
      <p className="text-xs text-neutral-500 mt-1 max-w-xs leading-relaxed">{REFERENCE_PRICE_NOTE}</p>
    </div>
  );
}

export function QuoteFirstNotice({ compact = false }: { compact?: boolean }) {
  return (
    <p
      className={`text-neutral-600 leading-relaxed ${compact ? "text-xs max-w-md" : "text-sm max-w-prose"}`}
    >
      <strong className="font-medium text-neutral-800">Quote-first B2B.</strong> Guangzhou factory-direct
      rackmount and phone farm chassis — written BOM, pro-forma invoice, burn-in QC, export packing, and
      12-month chassis warranty quoted per project.{" "}
      {compact ? "" : "Device fit, 2U rack power, and freight are confirmed before payment."}
    </p>
  );
}
