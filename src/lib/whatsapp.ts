import { CONTACT } from "./config";

const QUOTE_TEMPLATE =
  "Hello Max Phones Farm, I am interested in {product}. Target quantity: __ units. Destination country: __. Please send specifications and quote.";

export function whatsappQuoteUrl(productName = "your rackmount phone farm hardware") {
  const text = QUOTE_TEMPLATE.replace("{product}", productName);
  return `${CONTACT.whatsappUrl}?text=${encodeURIComponent(text)}`;
}
