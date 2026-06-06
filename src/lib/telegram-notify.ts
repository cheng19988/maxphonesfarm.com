export type InquiryNotification = {
  name: string;
  company?: string;
  email?: string;
  whatsapp?: string;
  productInterest?: string;
  deviceQuantity?: string;
  country?: string;
  message?: string;
  sourcePage?: string;
  submittedAt: Date;
};

function esc(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function line(label: string, value?: string | null) {
  if (!value?.trim()) return null;
  return `<b>${esc(label)}:</b> ${esc(value.trim())}`;
}

export async function notifyTelegramInquiry(data: InquiryNotification): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId =
    process.env.TELEGRAM_NOTIFY_CHAT_ID?.trim() || process.env.TELEGRAM_NOTIFY_CHAT?.trim();

  if (!token || !chatId) {
    console.info(
      "[telegram] Inquiry notification skipped — TELEGRAM_BOT_TOKEN or TELEGRAM_NOTIFY_CHAT_ID not configured"
    );
    return false;
  }

  const lines = [
    "📩 <b>New inquiry — Max Phones Farm</b>",
    "",
    line("Name", data.name),
    line("Company", data.company),
    line("Email", data.email),
    line("WhatsApp / Telegram", data.whatsapp),
    line("Product interest", data.productInterest),
    line("Target quantity", data.deviceQuantity),
    line("Destination country", data.country),
    line("Message", data.message),
    line("Source page", data.sourcePage),
    line("Submitted (UTC)", data.submittedAt.toISOString().replace("T", " ").slice(0, 19)),
  ].filter(Boolean);

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines.join("\n"),
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!res.ok) {
      let detail = "unknown";
      try {
        const json = await res.json();
        detail = String(json.description || json.error_code || res.status);
      } catch {
        detail = String(res.status);
      }
      console.error("[telegram] sendMessage failed:", detail);
      return false;
    }

    console.info("[telegram] Inquiry notification sent");
    return true;
  } catch (error) {
    const msg = error instanceof Error ? error.message : "network error";
    console.error("[telegram] sendMessage error:", msg);
    return false;
  }
}
