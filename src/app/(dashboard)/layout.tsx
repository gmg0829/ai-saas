import { Header } from "@/components/Header";

async function getAuthUser() {
  try {
    const { auth, currentUser } = await import("@clerk/nextjs/server");
    const { userId } = await auth();
    const user = await currentUser();
    return { userId, user };
  } catch (error) {
    console.error("Auth error:", error);
    return { userId: null, user: null };
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId, user } = await getAuthUser();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header userId={userId} user={user} />
      <main className="container mx-auto px-4 py-8">
        {!userId ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="text-2xl font-bold mb-4">Login Required</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Please sign in to access AI Chat, Write, and Summarize tools.
            </p>
            <a
              href="/sign-in"
              className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition"
            >
              Sign In
            </a>
          </div>
        ) : (
          children
        )}
      </main>
    </div>
  );
}
