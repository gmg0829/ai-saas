"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: ["10 AI chats per day", "Basic models", "Email support"],
    cta: "Current Plan",
    disabled: true,
  },
  {
    name: "Pro",
    price: "$9.9",
    period: "/month",
    description: "For power users who need more",
    features: [
      "Unlimited AI chats",
      "Advanced models (GPT-4, Claude 3.5)",
      "Priority support",
      "Early access to new features",
    ],
    cta: "Upgrade to Pro",
    disabled: false,
  },
];

export function Pricing() {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async (priceId: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Simple Pricing</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Start free, upgrade when you need more
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-xl p-8 ${
              plan.name === "Pro"
                ? "bg-black text-white ring-2 ring-blue-500"
                : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            }`}
          >
            <h3 className="text-xl font-bold">{plan.name}</h3>
            <div className="mt-4 flex items-baseline">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-gray-500 ml-1">{plan.period}</span>
            </div>
            <p className="mt-2 text-sm opacity-70">{plan.description}</p>

            <ul className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleUpgrade(plan.name.toLowerCase())}
              disabled={plan.disabled || loading}
              className={`mt-8 w-full py-3 rounded-lg font-medium transition ${
                plan.name === "Pro"
                  ? "bg-white text-black hover:bg-gray-100"
                  : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              } disabled:opacity50 disabled:cursor-not-allowed`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
