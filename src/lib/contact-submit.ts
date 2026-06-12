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
  budget: string;
  message: string;
  sourcePage: string;
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
    budget: String(form.get("budget") || "").trim(),
    message: String(form.get("message") || "").trim(),
    sourcePage: String(form.get("sourcePage") || "/contact").trim(),
  };
}

export function validateContactSubmission(data: ContactSubmissionInput): string | null {
  if (!data.name) return "Name is required.";
  if (!data.email && !data.whatsapp) return "Email or WhatsApp is required.";
  return null;
}

export async function saveContactSubmission(data: ContactSubmissionInput) {
  const submittedAt = new Date();

  const record = await prisma.contactSubmission.create({
    data: {
      name: data.name,
      company: data.company || null,
      country: data.country || null,
      whatsapp: data.whatsapp || null,
      phone: "",
      email: data.email || data.whatsapp,
      deviceQuantity: data.deviceQuantity || null,
      productInterest: data.productInterest || null,
      budget: data.budget || null,
      message: data.message || null,
      sourcePage: data.sourcePage || null,
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
