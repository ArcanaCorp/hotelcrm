import { SUPABASE_HOTEL_KEY, SUPABASE_HOTEL_URL } from "@/config";
import { createClient } from "@supabase/supabase-js";

export const db = createClient(SUPABASE_HOTEL_URL, SUPABASE_HOTEL_KEY);