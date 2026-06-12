import { prisma } from "@/lib/prisma";
import { notifyTelegramInquiry } from "@/lib/telegram-notify";

export type ContactSubmissionInput = {
  name: string;
  company: string;
  country: string;
  whatsapp: string;
  email: string;
  deviceQuantity: string;
  productInterest: string;
  platform: string;
  connectionMode: string;
  budget: string;
  message: string;
  sourcePage: string;
  privacyConsent: boolean;
};

export function parseContactForm(form: FormData): ContactSubmissionInput {
  return {
    name: String(form.get("name") || "").trim(),
    company: String(form.get("company") || "").trim(),
    country: String(form.get("country") || "").trim(),
    whatsapp: String(form.get("whatsapp") || "").trim(),
    email: String(form.get("email") || "").trim(),
    deviceQuantity: String(form.get("deviceQuantity") || "").trim(),
    productInterest: String(form.get("productInterest") || "").trim(),
    platform: String(form.get("platform") || "").trim(),
    connectionMode: String(form.get("connectionMode") || "").trim(),
    budget: String(form.get("budget") || "").trim(),
    message: String(form.get("message") || "").trim(),
    sourcePage: String(form.get("sourcePage") || "/contact").trim(),
    privacyConsent: form.get("privacyConsent") === "on",
  };
}

export function validateContactSubmission(data: ContactSubmissionInput): string | null {
  if (!data.name) return "Name is required.";
  if (!data.email) return "Email is required.";
  if (!data.whatsapp) return "WhatsApp or Telegram is required.";
  if (!data.country) return "Shipping country is required.";
  if (!data.productInterest) return "Product interest is required.";
  if (!data.deviceQuantity) return "Quantity or node count is required.";
  if (!data.platform) return "Platform is required.";
  if (!data.connectionMode) return "Connection mode is required.";
  if (!data.privacyConsent) return "Privacy consent is required.";
  return null;
}

export async function saveContactSubmission(data: ContactSubmissionInput) {
  const submittedAt = new Date();

  const record = await prisma.contactSubmission.create({
    data: {
      name: data.name,
      company: data.company || null,
      country: data.country,
      whatsapp: data.whatsapp,
      phone: "",
      email: data.email,
      deviceQuantity: data.deviceQuantity,
      productInterest: data.productInterest,
      platform: data.platform,
      connectionMode: data.connectionMode,
      budget: data.budget || null,
      message: data.message || null,
      sourcePage: data.sourcePage || null,
      privacyConsentAt: data.privacyConsent ? submittedAt : null,
      status: "New",
    },
  });

  try {
    await notifyTelegramInquiry({
      name: data.name,
      company: data.company,
      email: data.email,
      whatsapp: data.whatsapp,
      productInterest: data.productInterest,
      deviceQuantity: data.deviceQuantity,
      platform: data.platform,
      connectionMode: data.connectionMode,
      budget: data.budget,
      country: data.country,
      message: data.message,
      sourcePage: data.sourcePage,
      submittedAt,
    });
  } catch (error) {
    console.error("[telegram] notify failed after DB save:", error);
  }

  return record.id;
}
