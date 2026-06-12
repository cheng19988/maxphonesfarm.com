"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PAYMENT, CONTACT } from "@/lib/config";
import { emailComposeUrl } from "@/lib/email-link";
import { PAYMENT_STATUS_LABELS, paymentStatusBadgeClass, type PaymentStatus } from "@/lib/payment-status";

type PaymentInfo = {
  id: string;
  expectedAmount: number;
  receivedAmount: number | null;
  paymentAddress: string;
  paymentNetwork: string;
  paymentCurrency: string;
  paymentStatus: string;
  verificationStatus: string;
  expiresAt: string;
  txHash: string | null;
  paidAt: string | null;
};

type OrderData = {
  id: string;
  orderNumber: string;
  status: string;
  totalUsd: number;
  items: { product: { name: string; slug: string }; quantity: number; unitPrice: number }[];
  payment: PaymentInfo | null;
};

function isPayStatus(v: string): v is PaymentStatus {
  return v in PAYMENT_STATUS_LABELS;
}

export default function OrderPage() {
  const params = useParams<{ id: string }>();
  const orderId = params.id;
  const [order, setOrder] = useState<OrderData | null>(null);
  const [timeLeft, setTimeLeft] = useState("");
  const [manualConfirmation, setManualConfirmation] = useState(false);
  const [autoVerification, setAutoVerification] = useState(false);

  const loadOrder = () =>
    fetch(`/api/orders/${orderId}`)
      .then((r) => r.json())
      .then(setOrder)
      .catch(console.error);

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  useEffect(() => {
    if (!order?.payment) return;

    const tick = async () => {
      const res = await fetch(`/api/payment/verify?paymentId=${order.payment!.id}`);
      const data = await res.json();
      setManualConfirmation(Boolean(data.manualConfirmation));
      setAutoVerification(Boolean(data.autoVerification));

      if (data.status && data.status !== order.payment!.paymentStatus) {
        await loadOrder();
      }

      const expires = new Date(order.payment!.expiresAt).getTime() - Date.now();
      if (expires <= 0) {
        setTimeLeft("Expired");
      } else {
        const mins = Math.floor(expires / 60000);
        const secs = Math.floor((expires % 60000) / 1000);
        setTimeLeft(`${mins}:${secs.toString().padStart(2, "0")}`);
      }
    };

    tick();
    const interval = setInterval(tick, 5000);
    return () => clearInterval(interval);
  }, [order, orderId]);

  if (!order) {
    return <div className="section container-wide text-neutral-500">Loading order...</div>;
  }

  const payment = order.payment;
  const payStatus = payment && isPayStatus(payment.paymentStatus) ? payment.paymentStatus : null;
  const usdtDue = payment?.expectedAmount ?? null;
  const amountMismatch =
    usdtDue != null && Math.abs(usdtDue - order.totalUsd) > 0.001;

  return (
    <div className="section">
      <div className="container-wide max-w-2xl">
        <h1 className="section-title">Order {order.orderNumber}</h1>
        <p className="text-neutral-600 mb-6">
          Order status: <span className="text-neutral-900 font-medium">{order.status}</span>
        </p>

        <div className="surface p-6 mb-6 rounded-xl">
          <h2 className="font-semibold text-neutral-900 mb-4">Order Items</h2>
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between text-sm py-2 border-b border-neutral-100 last:border-0">
              <Link href={`/products/${item.product.slug}`} className="text-blue-700 hover:underline">
                {item.product.name}
              </Link>
              <span className="text-neutral-900">${item.unitPrice} × {item.quantity}</span>
            </div>
          ))}
          <div className="flex justify-between font-semibold text-neutral-900 mt-4">
            <span>List total (USD)</span>
            <span>${order.totalUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
          {usdtDue != null && (
            <div className="flex justify-between text-sm mt-2 pt-2 border-t border-neutral-100">
              <span className="text-neutral-600">USDT amount due (1:1 USD)</span>
              <span className="font-mono font-medium text-neutral-900">{usdtDue} USDT</span>
            </div>
          )}
          {amountMismatch && (
            <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-3 mt-3">
              USDT due ({usdtDue} USDT) differs from USD list total because a minimum payment of {PAYMENT.minAmount} USDT applies. Send exactly <strong>{usdtDue} USDT</strong>, not the USD figure alone.
            </p>
          )}
        </div>

        {payment && payStatus && (payStatus === "pending" || payStatus === "manual_review") && (
          <div className="surface p-6 mb-6 rounded-xl border border-blue-200 bg-blue-50/50">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <h2 className="font-semibold text-neutral-900">USDT Payment (Tron TRC20)</h2>
              <span className={`text-xs px-2 py-1 border rounded ${paymentStatusBadgeClass(payStatus)}`}>
                {PAYMENT_STATUS_LABELS[payStatus]}
              </span>
            </div>

            {manualConfirmation && payStatus === "pending" && (
              <div className="mb-4 p-3 rounded-lg border border-purple-200 bg-purple-50 text-purple-900 text-sm">
                <strong>Manual confirmation required.</strong> Automatic Tron verification is not enabled on this server. After you send USDT, our team confirms payment manually — include order number <strong>{order.orderNumber}</strong> when contacting support.
              </div>
            )}

            {autoVerification && payStatus === "pending" && (
              <div className="mb-4 p-3 rounded-lg border border-blue-200 bg-white text-sm text-neutral-700">
                Automatic TRC20 verification is active. This page refreshes every 5 seconds until payment is confirmed or the window expires.
              </div>
            )}

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">Order reference</span>
                <span className="text-neutral-900 font-mono">{order.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Send exactly</span>
                <span className="text-neutral-900 font-mono font-semibold">{payment.expectedAmount} USDT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Network</span>
                <span className="text-neutral-900">{payment.paymentNetwork}</span>
              </div>
              <div>
                <span className="text-neutral-600 block mb-1">TRC20 address</span>
                <code className="block bg-white border border-neutral-200 p-3 rounded-lg text-blue-800 text-xs break-all">
                  {payment.paymentAddress}
                </code>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">USDT contract</span>
                <span className="text-neutral-900 font-mono text-xs">{PAYMENT.contract}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Expires in</span>
                <span className="text-amber-700 font-medium">{timeLeft}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Verification</span>
                <span className="text-neutral-700">{payment.verificationStatus}</span>
              </div>
            </div>
            <p className="text-xs text-neutral-500 mt-4">
              Send the exact USDT amount to the address above via Tron TRC20 only.{" "}
              <a href={emailComposeUrl()} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                {CONTACT.email}
              </a>{" "}
              · WhatsApp {CONTACT.whatsapp}
            </p>
          </div>
        )}

        {payment && payStatus === "paid" && (
          <div className="surface p-6 mb-6 rounded-xl border border-green-200 bg-green-50">
            <p className="text-green-900 font-medium mb-2">Payment confirmed — {PAYMENT_STATUS_LABELS.paid}</p>
            <dl className="text-sm space-y-1 text-green-800">
              <div className="flex justify-between"><dt>Expected</dt><dd className="font-mono">{payment.expectedAmount} USDT</dd></div>
              {payment.receivedAmount != null && (
                <div className="flex justify-between"><dt>Received</dt><dd className="font-mono">{payment.receivedAmount} USDT</dd></div>
              )}
              {payment.txHash && (
                <div><dt className="text-green-700">Tx hash</dt><dd className="font-mono text-xs break-all mt-1">{payment.txHash}</dd></div>
              )}
              {payment.paidAt && (
                <div className="flex justify-between"><dt>Paid at</dt><dd>{new Date(payment.paidAt).toLocaleString()}</dd></div>
              )}
            </dl>
          </div>
        )}

        {payment && payStatus === "underpaid" && (
          <div className="surface p-6 mb-6 rounded-xl border border-orange-200 bg-orange-50 text-orange-900 text-sm">
            <p className="font-medium mb-2">{PAYMENT_STATUS_LABELS.underpaid}</p>
            <p>Expected {payment.expectedAmount} USDT but received {payment.receivedAmount ?? "—"} USDT. Contact support with order {order.orderNumber}.</p>
            {payment.txHash && <p className="font-mono text-xs mt-2 break-all">Tx: {payment.txHash}</p>}
          </div>
        )}

        {payment && payStatus === "overpaid" && (
          <div className="surface p-6 mb-6 rounded-xl border border-blue-200 bg-blue-50 text-blue-900 text-sm">
            <p className="font-medium mb-2">{PAYMENT_STATUS_LABELS.overpaid}</p>
            <p>Received {payment.receivedAmount ?? "—"} USDT (expected {payment.expectedAmount} USDT). Our team will reconcile — order {order.orderNumber}.</p>
            {payment.txHash && <p className="font-mono text-xs mt-2 break-all">Tx: {payment.txHash}</p>}
          </div>
        )}

        {payment && payStatus === "manual_review" && (
          <div className="surface p-6 mb-6 rounded-xl border border-purple-200 bg-purple-50 text-purple-900 text-sm">
            <p className="font-medium mb-2">{PAYMENT_STATUS_LABELS.manual_review}</p>
            <p>Payment is queued for manual review. Reference order {order.orderNumber} if you contact support.</p>
          </div>
        )}

        {payment && payStatus === "expired" && (
          <div className="surface p-6 mb-6 rounded-xl border border-neutral-300 bg-neutral-50 text-neutral-700 text-sm">
            <p className="font-medium mb-2">{PAYMENT_STATUS_LABELS.expired}</p>
            <p>This payment window expired. Request a new quote or contact sales to reissue payment instructions.</p>
          </div>
        )}

        <Link href="/account/orders" className="btn-secondary">← My Orders</Link>
      </div>
    </div>
  );
}
