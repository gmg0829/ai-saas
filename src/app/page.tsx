import { Header } from "@/components/Header";
import { Bot, Sparkles, Zap, Shield } from "lucide-react";

async function getAuthUser() {
  try {
    const { auth, currentUser } = await import("@clerk/nextjs/server");
    const { userId } = await auth();
    const user = await currentUser();
    return { userId, user };
  } catch {
    return { userId: null, user: null };
  }
}

const features = [
  {
    icon: Bot,
    title: "AI Chat",
    description: "Have intelligent conversations with GPT-4 powered assistant",
    href: "/chat",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Sparkles,
    title: "AI Writing",
    description: "Generate high-quality content with advanced AI models",
    href: "/write",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "AI Summarize",
    description: "Instantly summarize articles and documents",
    href: "/summarize",
    color: "from-orange-500 to-yellow-500",
  },
];

const benefits = [
  { label: "Powered by GPT-4" },
  { label: "24/7 Availability" },
  { label: "Secure & Private" },
  { label: "No credit card required" },
];

export default async function Home() {
  const { userId, user } = await getAuthUser();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950">
      <Header userId={userId} user={user} />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-600 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-400">
              <Sparkles className="h-4 w-4" />
              <span>Powered by Advanced AI</span>
            </div>

            {/* Heading */}
            <h1 className="mt-8 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                AI-Powered
              </span>
              <br />
              Productivity Tools
            </h1>

            {/* Subheading */}
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Transform your workflow with intelligent AI tools. Chat, write, and
              summarize content in seconds with enterprise-grade accuracy.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/sign-in"
                className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5"
              >
                Get Started Free
                <Sparkles className="h-4 w-4 transition-transform group-hover:scale-110" />
              </a>
              <a
                href="/chat"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-8 py-4 text-base font-semibold text-gray-700 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                Try Demo
              </a>
            </div>

            {/* Benefits */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              {benefits.map((benefit) => (
                <div key={benefit.label} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  <span>{benefit.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white/50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Everything you need, nothing you don't
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Three powerful AI tools designed to supercharge your productivity
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <a
                key={feature.title}
                href={feature.href}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 dark:border-gray-800 dark:bg-gray-800"
              >
                {/* Icon */}
                <div
                  className={`inline-flex rounded-xl bg-gradient-to-br ${feature.color} p-3 text-white shadow-lg`}
                >
                  <feature.icon className="h-6 w-6" />
                </div>

                {/* Content */}
                <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>

                {/* Arrow */}
                <div className="mt-4 flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  Try now
                  <svg
                    className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: "10K+", label: "Active Users" },
              { value: "1M+", label: "AI Responses" },
              { value: "99.9%", label: "Uptime" },
              { value: "4.9/5", label: "User Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 px-8 py-16 shadow-2xl sm:px-12 lg:flex lg:items-center lg:justify-between">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />

            <div className="relative text-center lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to boost your productivity?
              </h2>
              <p className="mt-4 text-lg leading-8 text-indigo-100">
                Join thousands of users who've already transformed their workflow
              </p>
            </div>

            <div className="mt-8 flex-shrink-0 lg:mt-0">
              <a
                href="/sign-in"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-indigo-600 shadow-lg transition-all hover:bg-gray-100"
              >
                <Shield className="h-5 w-5" />
                Start Free Trial
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Bot className="h-6 w-6 text-indigo-600" />
              <span className="font-semibold text-gray-900 dark:text-white">
                AI Tools Hub
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2024 AI Tools Hub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
