/** USD list price label for catalog and product pages. */
export function formatProductPrice(priceUsd: number): string {
  if (priceUsd <= 0) return "Custom Quote";
  return priceUsd >= 1000 ? `$${priceUsd.toLocaleString()}` : `From $${priceUsd.toLocaleString()}`;
}

export function isCustomQuotePrice(priceUsd: number): boolean {
  return priceUsd <= 0;
}
