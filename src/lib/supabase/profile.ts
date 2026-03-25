import { getSupabaseClient } from "../supabase";

export interface Profile {
  id?: string;
  user_id: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  preferences?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
}

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null; // No profile found
    }
    console.error("Error fetching profile:", error);
    return null;
  }

  return data as Profile;
}

export async function createProfile(
  userId: string,
  profile: Partial<Profile> = {}
): Promise<Profile | null> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("profiles")
    .insert({
      user_id: userId,
      email: profile.email,
      full_name: profile.full_name,
      avatar_url: profile.avatar_url,
      preferences: profile.preferences || {},
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating profile:", error);
    return null;
  }

  return data as Profile;
}

export async function updateProfile(
  userId: string,
  updates: Partial<Profile>
): Promise<Profile | null> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("profiles")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    console.error("Error updating profile:", error);
    return null;
  }

  return data as Profile;
}

export async function upsertProfile(
  userId: string,
  profile: Partial<Profile>
): Promise<Profile | null> {
  const existing = await getProfile(userId);
  if (existing) {
    return updateProfile(userId, profile);
  }
  return createProfile(userId, profile);
}

export async function getOrCreateProfile(
  userId: string,
  defaults: Partial<Profile> = {}
): Promise<Profile> {
  const existing = await getProfile(userId);
  if (existing) {
    return existing;
  }
  const created = await createProfile(userId, defaults);
  return created || { user_id: userId, ...defaults };
}
