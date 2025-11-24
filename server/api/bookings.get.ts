import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async () => {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // service role for admin queries
  );

  const { data, error } = await supabase
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data.map((r) => ({
    ...r,
    proof_url: r.proof_url
      ? `${process.env.SUPABASE_URL}/storage/v1/object/public/payment_proofs/${r.proof_url}`
      : null,
  }));
});
