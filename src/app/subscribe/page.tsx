"use client";

import { useState } from "react";
import { Mail, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SubscribePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950 py-20">
      <div className="container mx-auto px-4 max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <div className="text-center">
            <div className="inline-flex p-3 bg-indigo-100 dark:bg-indigo-900 rounded-xl mb-4">
              <Mail className="h-6 w-6 text-indigo-600" />
            </div>
            <h1 className="text-2xl font-bold">Subscribe to Updates</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Get the latest news and features delivered to your inbox.
            </p>
          </div>

          {status === "success" ? (
            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900 rounded-lg text-center">
              <p className="text-green-700 dark:text-green-300">Thanks for subscribing!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-4 w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  "Subscribe"
                )}
              </button>
              {status === "error" && (
                <p className="mt-2 text-sm text-red-600 text-center">Failed to subscribe. Try again.</p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
