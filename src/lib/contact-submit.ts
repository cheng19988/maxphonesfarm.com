import { prisma } from "@/lib/prisma";

export type ContactSubmissionInput = {
  name: string;
  company: string;
  country: string;
  whatsapp: string;
  email: string;
  deviceQuantity: string;
  productInterest: string;
  message: string;
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
    message: String(form.get("message") || "").trim(),
  };
}

export function validateContactSubmission(data: ContactSubmissionInput): string | null {
  if (!data.name) return "Name is required.";
  if (!data.email && !data.whatsapp) return "Email or WhatsApp is required.";
  return null;
}

export async function saveContactSubmission(data: ContactSubmissionInput) {
  await prisma.contactSubmission.create({
    data: {
      name: data.name,
      country: data.country,
      whatsapp: data.whatsapp,
      phone: "",
      email: data.email || data.whatsapp,
      deviceQuantity: data.deviceQuantity,
      productInterest: data.productInterest,
      budget: data.company ? `Company: ${data.company}` : "",
      message: data.message,
    },
  });
}
