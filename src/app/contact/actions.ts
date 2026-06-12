"use server";

import { redirect } from "next/navigation";
import {
  parseContactForm,
  saveContactSubmission,
  validateContactSubmission,
} from "@/lib/contact-submit";

export async function submitContactInquiry(formData: FormData) {
  const data = parseContactForm(formData);
  const error = validateContactSubmission(data);
  if (error) {
    redirect(`/contact?error=validation&product=${encodeURIComponent(data.productInterest)}`);
  }

  try {
    const inquiryId = await saveContactSubmission(data);
    const ref = inquiryId.slice(-8).toUpperCase();
    redirect(`/contact?sent=1&ref=${ref}`);
  } catch {
    redirect(`/contact?error=submit&product=${encodeURIComponent(data.productInterest)}`);
  }
}
