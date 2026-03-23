import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Header } from "@/components/Header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header userId={userId} user={user} />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
