import Link from "next/link";
import { UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Bot, Menu } from "lucide-react";

export function Header({
  userId,
  user,
}: {
  userId: string | null;
  user: any;
}) {
  return (
    <header className="border-b bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Bot className="h-8 w-8" />
            <span className="text-xl font-bold">AI Tools Hub</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/chat" className="text-sm hover:text-gray-600">
              Chat
            </Link>
            <Link href="/write" className="text-sm hover:text-gray-600">
              Write
            </Link>
            <Link href="/summarize" className="text-sm hover:text-gray-600">
              Summarize
            </Link>
            <Link href="/pricing" className="text-sm hover:text-gray-600">
              Pricing
            </Link>
            <Link href="/subscribe" className="text-sm hover:text-gray-600">
              Subscribe
            </Link>
            {userId && (
              <Link href="/profile" className="text-sm hover:text-gray-600">
                Profile
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-4">
            {userId ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <div className="flex items-center gap-2">
                <SignInButton mode="modal">
                  <button className="text-sm px-4 py-2 hover:text-gray-600">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800">
                    Get Started
                  </button>
                </SignUpButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
