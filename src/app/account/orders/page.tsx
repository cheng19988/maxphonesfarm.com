import Link from "next/link";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/logout-button";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "My Orders",
  description: "Internal order history.",
  path: "/account/orders",
  noIndex: true,
});

export default async function AccountOrdersPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const orders = await prisma.order.findMany({
    where: { userId: session.id },
    include: { items: { include: { product: { select: { name: true } } } }, payment: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="section">
      <div className="container-wide max-w-3xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="section-title mb-0">Order History</h1>
          <LogoutButton />
        </div>
        {orders.length === 0 ? (
          <div className="surface p-8 text-center text-neutral-500 rounded-xl">
            <p>No orders on file.</p>
            <Link href="/contact" className="btn-primary mt-4 inline-flex">Request a Quote</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="surface p-6 text-sm rounded-xl">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <p className="font-medium text-neutral-900">{order.orderNumber}</p>
                    <p className="text-neutral-500 mt-1">
                      {order.items.map((i) => i.product.name).join(", ")}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-neutral-900 font-medium">
                      {order.totalUsd > 0 ? `$${order.totalUsd.toLocaleString()}` : "Custom Quote"}
                    </p>
                    <p className="text-neutral-500">{order.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
