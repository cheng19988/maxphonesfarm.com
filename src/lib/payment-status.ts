/** Normalized USDT payment statuses — used in DB, API, admin, and order UI. */
export const PAYMENT_STATUSES = [
  "pending",
  "paid",
  "underpaid",
  "overpaid",
  "expired",
  "manual_review",
] as const;

export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  pending: "Pending",
  paid: "Paid",
  underpaid: "Underpaid",
  overpaid: "Overpaid",
  expired: "Expired",
  manual_review: "Manual review",
};

export function isPaymentStatus(value: string): value is PaymentStatus {
  return (PAYMENT_STATUSES as readonly string[]).includes(value);
}

export function paymentStatusBadgeClass(status: PaymentStatus): string {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-800 border-green-200";
    case "pending":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "underpaid":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "overpaid":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "expired":
      return "bg-neutral-100 text-neutral-600 border-neutral-200";
    case "manual_review":
      return "bg-purple-100 text-purple-800 border-purple-200";
    default:
      return "bg-neutral-100 text-neutral-700 border-neutral-200";
  }
}
