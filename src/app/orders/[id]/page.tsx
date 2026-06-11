"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PAYMENT, CONTACT } from "@/lib/config";
import { emailComposeUrl } from "@/lib/email-link";

type PaymentInfo = {
  id: string;
  expectedAmount: number;
  paymentAddress: string;
  paymentNetwork: string;
  paymentCurrency: string;
  paymentStatus: string;
  verificationStatus: string;
  expiresAt: string;
  txHash: string | null;
};

type OrderData = {
  id: string;
  orderNumber: string;
  status: string;
  totalUsd: number;
  items: { product: { name: string; slug: string }; quantity: number; unitPrice: number }[];
  payment: PaymentInfo | null;
};

export default function OrderPage() {
  const params = useParams<{ id: string }>();
  const orderId = params.id;
  const [order, setOrder] = useState<OrderData | null>(null);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    fetch(`/api/orders/${orderId}`)
      .then((r) => r.json())
      .then(setOrder)
      .catch(console.error);
  }, [orderId]);

  useEffect(() => {
    if (!order?.payment) return;
    const interval = setInterval(async () => {
      const res = await fetch(`/api/payment/verify?paymentId=${order.payment!.id}`);
      const data = await res.json();
      if (data.status === "paid") {
        fetch(`/api/orders/${orderId}`).then((r) => r.json()).then(setOrder);
      }
      const expires = new Date(order.payment!.expiresAt).getTime() - Date.now();
      if (expires <= 0) {
        setTimeLeft("Expired");
      } else {
        const mins = Math.floor(expires / 60000);
        const secs = Math.floor((expires % 60000) / 1000);
        setTimeLeft(`${mins}:${secs.toString().padStart(2, "0")}`);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [order, orderId]);

  if (!order) {
    return <div className="section container-wide text-neutral-500">Loading order...</div>;
  }

  const payment = order.payment;

  return (
    <div className="section">
      <div className="container-wide max-w-2xl">
        <h1 className="section-title">Order {order.orderNumber}</h1>
        <p className="text-neutral-600 mb-6">
          Status: <span className="text-neutral-900 font-medium">{order.status}</span>
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
            <span>Total</span>
            <span>${order.totalUsd.toLocaleString()}</span>
          </div>
        </div>

        {payment && order.status === "Waiting for Payment" && (
          <div className="surface p-6 mb-6 rounded-xl border border-blue-200 bg-blue-50/50">
            <h2 className="font-semibold text-neutral-900 mb-4">USDT Payment (Tron TRC20)</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">Amount</span>
                <span className="text-neutral-900 font-mono">{payment.expectedAmount} USDT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Network</span>
                <span className="text-neutral-900">{payment.paymentNetwork}</span>
              </div>
              <div>
                <span className="text-neutral-600 block mb-1">Address</span>
                <code className="block bg-white border border-neutral-200 p-3 rounded-lg text-blue-800 text-xs break-all">
                  {payment.paymentAddress}
                </code>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Contract</span>
                <span className="text-neutral-900 font-mono text-xs">{PAYMENT.contract}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Min Payment</span>
                <span className="text-neutral-900">{PAYMENT.minAmount} USDT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Expires In</span>
                <span className="text-amber-700 font-medium">{timeLeft}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Verification</span>
                <span className="text-neutral-700">{payment.verificationStatus}</span>
              </div>
            </div>
            <p className="text-xs text-neutral-500 mt-4">
              Send exact USDT amount via Tron TRC20. Payment is verified automatically when Tron API is configured.{" "}
              <a href={emailComposeUrl()} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                Contact {CONTACT.email}
              </a>{" "}
              if you need help.
            </p>
          </div>
        )}

        {order.status === "Paid" && (
          <div className="surface p-6 mb-6 rounded-xl border border-green-200 bg-green-50 text-green-800">
            Payment received. Our team will confirm your order shortly.
          </div>
        )}

        <Link href="/account/orders" className="btn-secondary">← My Orders</Link>
      </div>
    </div>
  );
}
