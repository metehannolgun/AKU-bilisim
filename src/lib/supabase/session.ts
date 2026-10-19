import {
  createServerClient,
  type CookieOptions,
} from "@supabase/ssr";
import type { NextRequest, NextResponse } from "next/server";
import { getSupabaseConfig } from "./config";
import type { Database } from "@/types/database";

type PendingCookie = {
  name: string;
  value: string;
  options: CookieOptions;
};

export async function updateSession(
  request: NextRequest,
  handleRouting: (request: NextRequest) => NextResponse,
) {
  const { url, publishableKey } = getSupabaseConfig();

  const pendingCookies: PendingCookie[] = [];
  const refreshHeaders = new Headers();

 const supabase = createServerClient<Database>(url, publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },

      setAll(cookiesToSet, headers) {
        for (const cookie of cookiesToSet) {
          request.cookies.set(cookie.name, cookie.value);
          pendingCookies.push(cookie);
        }

        for (const [name, value] of Object.entries(headers)) {
          refreshHeaders.set(name, value);
        }
      },
    },
  });

  await supabase.auth.getClaims();

  const response = handleRouting(request);

  for (const { name, value, options } of pendingCookies) {
    response.cookies.set(name, value, options);
  }

  refreshHeaders.forEach((value, name) => {
    response.headers.set(name, value);
  });

  return response;
}