import { SUPABASE_ARCANA_CORE_KEY, SUPABASE_ARCANA_CORE_URL } from "@/config";
import { createBrowserClient } from "@supabase/ssr";

export function createClientAuth() {
    return createBrowserClient(SUPABASE_ARCANA_CORE_URL, SUPABASE_ARCANA_CORE_KEY);
}