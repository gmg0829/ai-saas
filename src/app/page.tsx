import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ChatInterface } from "@/components/ChatInterface";
import { AIWriting } from "@/components/AIWriting";
import { AISummary } from "@/components/AISummary";
import { Header } from "@/components/Header";

export default async function Home() {
  const { userId } = await auth();
  const user = await currentUser();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header userId={userId} user={user} />

      <div className="container mx-auto px-4 py-8">
        {!userId ? (
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to AI SaaS
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Your AI powered productivity assistant
            </p>
            <a
              href="/sign-in"
              className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition"
            >
              Get Started
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <ChatInterface />
            <AIWriting />
            <AISummary />
          </div>
        )}
      </div>
    </main>
  );
}
