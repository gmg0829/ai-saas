import { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getProfile, updateProfile } from "@/lib/supabase/profile";
import { ProfileForm } from "./profile-form";

export const metadata: Metadata = {
  title: "Profile Settings",
  description: "Manage your profile settings",
};

export default async function ProfilePage() {
  const { auth, currentUser } = await import("@clerk/nextjs/server");
  const { userId } = await auth();
  const clerkUser = await currentUser();

  if (!userId) {
    redirect("/sign-in");
  }

  // Get profile from Supabase, fallback to Clerk data
  const profile = await getProfile(userId);
  const defaultValues = {
    full_name: profile?.full_name || clerkUser?.fullName || "",
    email: profile?.email || clerkUser?.emailAddresses[0]?.emailAddress || "",
    avatar_url: profile?.avatar_url || clerkUser?.imageUrl || "",
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <ProfileForm userId={userId} defaultValues={defaultValues} />
      </div>
    </div>
  );
}
