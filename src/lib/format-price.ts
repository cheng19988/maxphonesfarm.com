/** USD list price label — always paired with reference-price disclaimer in UI. */
export const REFERENCE_PRICE_NOTE =
  "Reference price · Final quote confirmed before payment";

export const RFQ_PAYMENT_NOTE =
  "No online checkout. Configuration, freight, and payment terms are confirmed on a written pro-forma before you pay.";

export function formatProductPrice(priceUsd: number): string {
  if (priceUsd <= 0) return "Custom quote";
  return priceUsd >= 1000 ? `$${priceUsd.toLocaleString()}` : `From $${priceUsd.toLocaleString()}`;
}

export function isCustomQuotePrice(priceUsd: number): boolean {
  return priceUsd <= 0;
}
