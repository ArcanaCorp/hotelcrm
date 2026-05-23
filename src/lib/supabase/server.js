import { SUPABASE_ARCANA_CORE_KEY, SUPABASE_ARCANA_CORE_URL } from "@/config";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
    const cookieStore = await cookies();
    return createServerClient(SUPABASE_ARCANA_CORE_URL, SUPABASE_ARCANA_CORE_KEY, {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        );
                    } catch {}
                },
            },
        }
    );
}