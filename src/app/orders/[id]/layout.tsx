import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Order",
  description: "Order status.",
  path: "/orders",
  noIndex: true,
});

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
