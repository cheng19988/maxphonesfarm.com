"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
    });
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Login failed");
    }
    setLoading(false);
  }

  return (
    <div className="section">
      <div className="container-wide max-w-md">
        <h1 className="section-title text-center">Internal Login</h1>
        <p className="text-neutral-500 text-sm text-center mb-6">Staff and existing customer access only — not required for quotes.</p>
        <form onSubmit={handleSubmit} className="border border-neutral-800 p-6 space-y-4 bg-neutral-950">
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div>
            <label className="block text-sm text-neutral-500 mb-1">Email</label>
            <input name="email" type="email" required className="input-field" />
          </div>
          <div>
            <label className="block text-sm text-neutral-500 mb-1">Password</label>
            <input name="password" type="password" required className="input-field" />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Logging in…" : "Login"}
          </button>
          <p className="text-center text-sm text-neutral-500">
            Need a quote? <Link href="/contact" className="text-white underline underline-offset-4">Contact sales</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
