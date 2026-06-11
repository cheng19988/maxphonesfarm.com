import { buildMetadata } from "@/lib/seo";
import { SITE, CONTACT } from "@/lib/config";

export const metadata = buildMetadata({
  title: "Terms of Use",
  description: `Terms of use for ${SITE.name} hardware quotes, sales, and shipping.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="section">
      <div className="container-wide max-w-3xl prose-content">
        <h1 className="section-title">Terms of Use</h1>
        <p className="text-neutral-500">Last updated: June 2026</p>
        <h2>Quotes &amp; Orders</h2>
        <p>
          This website is quote-first: submit an inquiry or contact us on WhatsApp or Telegram for a formal USD quote. USD list prices are indicative — final quotes may vary with configuration, device models, and shipping method. All products are physical phone farm hardware assembled or sourced by the Max Phones Farm team in Guangzhou, China.
        </p>
        <h2>Payment</h2>
        <p>
          Payment terms are agreed per quote — typically bank transfer (T/T), Wise, or PayPal for standard orders. Bulk projects receive a pro-forma invoice with a scheduled payment plan. USDT (Tron TRC20) may be offered for select orders when agreed in writing on the quote.
        </p>
        <h2>Shipping</h2>
        <p>
          International shipping is available worldwide. Delivery times vary by method (express 3–7 days, sea freight 15–30 days). Import duties and taxes are the buyer&apos;s responsibility unless otherwise stated on the invoice.
        </p>
        <h2>Warranty</h2>
        <p>
          Hardware carries a 12-month warranty against manufacturing defects under normal lab use. Misuse, unauthorized modifications, and normal wear are excluded.
        </p>
        <h2>Contact</h2>
        <p>Questions about these terms: {CONTACT.email}</p>
      </div>
    </div>
  );
}
