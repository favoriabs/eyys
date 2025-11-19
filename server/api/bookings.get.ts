import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async () => {
  const supabase = createClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // server-only
  );

  const { data, error } = await supabase
    .from("accommodation_bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
});
