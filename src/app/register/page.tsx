"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
        name: form.get("name"),
      }),
    });
    if (res.ok) {
      router.push("/contact");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Registration failed");
    }
    setLoading(false);
  }

  return (
    <div className="section">
      <div className="container-wide max-w-md">
        <h1 className="section-title text-center">Create Account</h1>
        <p className="text-neutral-500 text-sm text-center mb-6">
          Optional account for existing customers — new buyers should use the contact form or WhatsApp for quotes.
        </p>
        <form onSubmit={handleSubmit} className="border border-neutral-800 p-6 space-y-4 bg-neutral-950">
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div>
            <label className="block text-sm text-neutral-500 mb-1">Name</label>
            <input name="name" className="input-field" />
          </div>
          <div>
            <label className="block text-sm text-neutral-500 mb-1">Email</label>
            <input name="email" type="email" required className="input-field" />
          </div>
          <div>
            <label className="block text-sm text-neutral-500 mb-1">Password</label>
            <input name="password" type="password" required minLength={8} className="input-field" />
          </div>
          <button type="submit" disabled={loading} className="btn-secondary w-full">
            {loading ? "Creating…" : "Create Account"}
          </button>
          <p className="text-center text-sm text-neutral-500">
            <Link href="/contact" className="text-white underline underline-offset-4">Get a quote instead</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
