import Link from "next/link";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/logout-button";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { PAYMENT_STATUS_LABELS, paymentStatusBadgeClass, type PaymentStatus } from "@/lib/payment-status";

function payStatusLabel(status: string | undefined) {
  if (status && status in PAYMENT_STATUS_LABELS) {
    return PAYMENT_STATUS_LABELS[status as PaymentStatus];
  }
  return status ?? "—";
}

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
            {orders.map((order) => {
              const ps = order.payment?.paymentStatus;
              const badge = ps && ps in PAYMENT_STATUS_LABELS ? (ps as PaymentStatus) : null;
              return (
              <div key={order.id} className="surface p-6 text-sm rounded-xl">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <Link href={`/orders/${order.id}`} className="font-medium text-blue-700 hover:underline">
                      {order.orderNumber}
                    </Link>
                    <p className="text-neutral-500 mt-1">
                      {order.items.map((i) => i.product.name).join(", ")}
                    </p>
                    {order.payment && (
                      <p className="text-neutral-600 mt-2 font-mono text-xs">
                        USDT due: {order.payment.expectedAmount}
                        {order.payment.receivedAmount != null && (
                          <> · received: {order.payment.receivedAmount}</>
                        )}
                      </p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-neutral-900 font-medium">
                      {order.totalUsd > 0 ? `$${order.totalUsd.toLocaleString()}` : "Custom Quote"}
                    </p>
                    <p className="text-neutral-500">{order.status}</p>
                    {badge && (
                      <span className={`inline-block mt-2 text-xs px-2 py-0.5 border rounded ${paymentStatusBadgeClass(badge)}`}>
                        {payStatusLabel(ps)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );})}
          </div>
        )}
      </div>
    </div>
  );
}
