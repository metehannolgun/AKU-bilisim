import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseConfig } from "./config";
import type { Database } from "@/types/database";

export async function createClient() {
  const { url, publishableKey } = getSupabaseConfig();
  const cookieStore = await cookies();

   return createServerClient<Database>(url, publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },

      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Server Component çerez yazamaz.
          // Oturum yenilemeyi proxy katmanı üstlenir.
        }
      },
    },
  });
}