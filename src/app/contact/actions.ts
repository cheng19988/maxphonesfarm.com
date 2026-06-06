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
    await saveContactSubmission(data);
  } catch {
    redirect(`/contact?error=submit&product=${encodeURIComponent(data.productInterest)}`);
  }

  redirect("/contact?sent=1");
}
