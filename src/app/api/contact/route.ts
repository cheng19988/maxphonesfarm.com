import { NextRequest, NextResponse } from "next/server";
import {
  parseContactForm,
  saveContactSubmission,
  validateContactSubmission,
} from "@/lib/contact-submit";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const data = parseContactForm(form);
  const error = validateContactSubmission(data);
  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
  try {
    await saveContactSubmission(data);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contact] POST failed:", e);
    return NextResponse.json({ error: "Submit failed" }, { status: 500 });
  }
}
