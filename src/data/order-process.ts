/** B2B quote-first ordering — shown on contact, pricing, and product pages. */
export const ORDER_PROCESS = [
  {
    step: "01",
    title: "Send inquiry",
    detail:
      "Submit the quote form or message us on WhatsApp/Telegram with device count, models, and destination country. MOQ is one unit on standard chassis.",
  },
  {
    step: "02",
    title: "Specification & quote",
    detail:
      "We confirm slot fit, power/cooling, and lead time — then send a written USD quote or pro-forma invoice. Custom rack layouts typically quoted within 1–2 business days.",
  },
  {
    step: "03",
    title: "Payment",
    detail:
      "Standard orders: bank transfer (T/T), Wise, or PayPal. Bulk projects follow the payment schedule on your pro-forma. USDT is available only when agreed on the quote.",
  },
  {
    step: "04",
    title: "Assembly, QC & shipment",
    detail:
      "Units are assembled and burn-in tested in Guangzhou, then shipped express or sea with commercial invoice. Optional remote control setup after delivery.",
  },
] as const;
