import { CONTACT } from "./config";

const DEFAULT_SUBJECT = "Max Phones Farm — Hardware Quote Inquiry";

/** Opens the default mail client when configured. */
export function emailMailtoUrl(subject = DEFAULT_SUBJECT) {
  const params = new URLSearchParams({ subject });
  return `mailto:${CONTACT.email}?${params.toString()}`;
}

/** Opens Gmail compose in the browser — reliable when no local mail client is set. */
export function emailComposeUrl(subject = DEFAULT_SUBJECT) {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: CONTACT.email,
    su: subject,
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}
