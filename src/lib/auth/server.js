import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { hasPermission } from "./rbac";

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

/**
 * Creates a server-side Supabase client reading secure HTTP cookies.
 * Returns null if Supabase credentials are not configured.
 */
export async function createServerSupabaseClient() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const cookieStore = await cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Can fail in Server Components
        }
      },
    },
  });
}

/**
 * Retrieves the current authenticated user and profile.
 * Fails closed if Supabase is unconfigured or session is invalid.
 */
export async function getServerUser() {
  if (!isSupabaseConfigured()) {
    return { user: null, profile: null, unconfigured: true };
  }

  try {
    const supabase = await createServerSupabaseClient();
    if (!supabase) return { user: null, profile: null, unconfigured: true };

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return { user: null, profile: null, unconfigured: false };
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("id, email, full_name, role, status")
      .eq("id", user.id)
      .single();

    return { user, profile: profile || null, unconfigured: false };
  } catch (err) {
    return { user: null, profile: null, unconfigured: false };
  }
}

/**
 * Guard utility for server actions and API routes.
 * Fails closed: 503 if unconfigured, 401 if unauthenticated, 403 if unauthorized.
 */
export async function requireServerPermission(requiredPermission) {
  if (!isSupabaseConfigured()) {
    return {
      authorized: false,
      status: 503,
      error: "Authentication service unavailable.",
    };
  }

  const { user, profile } = await getServerUser();

  if (!user || !profile) {
    return { authorized: false, status: 401, error: "Authentication required." };
  }

  if (profile.status !== "active") {
    return { authorized: false, status: 403, error: "Account suspended or inactive." };
  }

  const isAllowed = hasPermission(profile.role, requiredPermission);
  if (!isAllowed) {
    return { authorized: false, status: 403, error: "Access denied." };
  }

  return { authorized: true, user, profile };
}
