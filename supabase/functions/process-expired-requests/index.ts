// Supabase Edge Function: process-expired-requests
// This function should be called by a cron job (e.g., every hour)
// to auto-decline/cancel expired service requests
//
// Setup in Supabase Dashboard:
// 1. Deploy this function: supabase functions deploy process-expired-requests
// 2. Set up cron job in Database → Extensions → pg_cron:
//    SELECT cron.schedule('process-expired-requests', '0 * * * *', 
//      $$SELECT process_expired_service_requests()$$);
//
// Or call via HTTP (for external cron like GitHub Actions):
// curl -X POST https://[PROJECT_REF].supabase.co/functions/v1/process-expired-requests \
//   -H "Authorization: Bearer [SERVICE_ROLE_KEY]"

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client with service role key for admin access
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Call the database function to process expired requests
    const { data, error } = await supabase.rpc("process_expired_service_requests");

    if (error) {
      console.error("Error processing expired requests:", error);
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const result = data?.[0] || { auto_declined: 0, auto_cancelled: 0 };
    
    console.log(`Processed expired requests: ${result.auto_declined} declined, ${result.auto_cancelled} cancelled`);

    // TODO: Send notifications for auto-declined/cancelled requests
    // This would involve:
    // 1. Querying the affected requests
    // 2. Sending emails via Resend/SendGrid
    // 3. Creating in-app notifications

    return new Response(
      JSON.stringify({ 
        success: true, 
        processed: {
          auto_declined: result.auto_declined,
          auto_cancelled: result.auto_cancelled
        },
        timestamp: new Date().toISOString()
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
