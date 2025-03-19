/// <reference types="deno.ns" />
import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async () => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !supabaseKey) {
    return new Response(
      JSON.stringify({ success: false, error: "Missing Supabase credentials" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { error } = await supabase
    .from("rooms")
    .delete()
    .lt("expire_at", new Date().toISOString());

  if (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }

  return new Response(
    JSON.stringify({ success: true, message: "Expired rooms deleted." }),
    {
      headers: { "Content-Type": "application/json" },
      status: 200,
    }
  );
});
