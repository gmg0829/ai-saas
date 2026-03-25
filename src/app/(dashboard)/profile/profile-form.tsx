"use client";

import { useState } from "react";
import { updateProfile } from "@/lib/supabase/profile";

interface ProfileFormProps {
  userId: string;
  defaultValues: {
    full_name: string;
    email: string;
    avatar_url: string;
  };
}

export function ProfileForm({ userId, defaultValues }: ProfileFormProps) {
  const [fullName, setFullName] = useState(defaultValues.full_name);
  const [email, setEmail] = useState(defaultValues.email);
  const [avatarUrl, setAvatarUrl] = useState(defaultValues.avatar_url);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const result = await updateProfile(userId, {
      full_name: fullName,
      email: email,
      avatar_url: avatarUrl,
    });

    setLoading(false);

    if (result) {
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } else {
      setMessage({ type: "error", text: "Failed to update profile. Please try again." });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <div>
        <label htmlFor="fullName" className="block text-sm font-medium mb-2">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white dark:bg-gray-700"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white dark:bg-gray-700"
        />
      </div>

      <div>
        <label htmlFor="avatarUrl" className="block text-sm font-medium mb-2">
          Avatar URL
        </label>
        <input
          id="avatarUrl"
          type="url"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          placeholder="https://example.com/avatar.jpg"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white dark:bg-gray-700"
        />
        {avatarUrl && (
          <div className="mt-2">
            <img
              src={avatarUrl}
              alt="Avatar preview"
              className="w-16 h-16 rounded-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-gray-200"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
