import { buildMetadata } from "@/lib/seo";
import { SITE, CONTACT } from "@/lib/config";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE.name}. How we handle contact and inquiry information.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="section">
      <div className="container-wide max-w-3xl prose-content">
        <h1 className="section-title">Privacy Policy</h1>
        <p className="text-neutral-500">Last updated: June 2026</p>
        <h2>Information We Collect</h2>
        <p>
          When you submit a contact form or communicate with our sales team, we collect your name, email, phone number, country, and inquiry details (device count, product interest, message). We do not collect credit card data on this website.
        </p>
        <h2>How We Use Information</h2>
        <p>
          We use your information to respond to quotes, prepare specifications, arrange shipping, and provide after-sales support. We do not sell personal data to third parties.
        </p>
        <h2>Data Storage</h2>
        <p>
          Inquiry records may be stored in our internal database for sales follow-up. Access is limited to authorized staff.
        </p>
        <h2>Contact</h2>
        <p>For privacy questions, email {CONTACT.email}.</p>
      </div>
    </div>
  );
}
