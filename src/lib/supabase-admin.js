import "server-only";
import { createClient } from "@supabase/supabase-js";

let supabaseAdminInstance = null;

export function getSupabaseAdmin() {
  if (!supabaseAdminInstance) {
    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error(
        "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"
      );
    }

    supabaseAdminInstance = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }
  return supabaseAdminInstance;
}

export const supabaseAdmin = new Proxy(
  {},
  {
    get(_target, prop) {
      const client = getSupabaseAdmin();
      const val = client[prop];
      return typeof val === "function" ? val.bind(client) : val;
    },
  }
);
