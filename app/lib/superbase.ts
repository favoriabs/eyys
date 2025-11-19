import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Define environment variables (recommended)
const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Create typed client
export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey
);
