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

// Helper to send notifications for auto-declined requests
async function sendDeclinedNotifications(
  supabase: ReturnType<typeof createClient>,
  count: number
) {
  if (count === 0) return;

  // Get recently auto-declined requests (within last hour to avoid duplicate notifications)
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  
  const { data: declinedRequests, error } = await supabase
    .from("service_requests")
    .select(`
      id,
      request_number,
      family_id,
      consultant_id,
      original_amount,
      families:family_id (
        name,
        email,
        advisor_id
      ),
      profiles:consultant_id (
        first_name,
        last_name,
        email
      )
    `)
    .eq("status", "declined_consultant")
    .eq("decline_reason", "No response within 48 hours (auto-declined)")
    .gte("updated_at", oneHourAgo);

  if (error) {
    console.error("Error fetching declined requests:", error);
    return;
  }

  // Create in-app notifications for each declined request
  for (const request of declinedRequests || []) {
    const family = request.families as any;
    const consultant = request.profiles as any;
    
    // Notify family advisor about auto-decline
    if (family?.advisor_id) {
      await supabase.from("notifications").insert({
        user_id: family.advisor_id,
        type: "service_request",
        title: "Service Request Auto-Declined",
        description: `Request ${request.request_number} was auto-declined because the consultant didn't respond within 48 hours.`,
      });
    }
    
    // Notify consultant about their auto-decline
    if (consultant?.email) {
      await supabase.from("notifications").insert({
        user_id: request.consultant_id,
        type: "service_request",
        title: "Service Request Expired",
        description: `Your service request ${request.request_number} from ${family?.name || "a family"} has been auto-declined due to no response within 48 hours.`,
      });
    }
  }
  
  console.log(`Created notifications for ${declinedRequests?.length || 0} auto-declined requests`);
}

// Helper to send notifications for auto-cancelled requests
async function sendCancelledNotifications(
  supabase: ReturnType<typeof createClient>,
  count: number
) {
  if (count === 0) return;

  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  
  const { data: cancelledRequests, error } = await supabase
    .from("service_requests")
    .select(`
      id,
      request_number,
      family_id,
      consultant_id,
      total_amount,
      families:family_id (
        name,
        email,
        advisor_id
      ),
      profiles:consultant_id (
        first_name,
        last_name,
        email
      )
    `)
    .eq("status", "cancelled")
    .eq("decline_reason", "Family did not approve within 7 days (auto-cancelled)")
    .gte("updated_at", oneHourAgo);

  if (error) {
    console.error("Error fetching cancelled requests:", error);
    return;
  }

  // Create in-app notifications for each cancelled request
  for (const request of cancelledRequests || []) {
    const family = request.families as any;
    const consultant = request.profiles as any;
    
    // Notify family advisor about auto-cancellation
    if (family?.advisor_id) {
      await supabase.from("notifications").insert({
        user_id: family.advisor_id,
        type: "service_request",
        title: "Service Request Auto-Cancelled",
        description: `Request ${request.request_number} was auto-cancelled because no approval was received within 7 days.`,
      });
    }
    
    // Notify consultant about auto-cancellation
    if (request.consultant_id) {
      await supabase.from("notifications").insert({
        user_id: request.consultant_id,
        type: "service_request",
        title: "Service Request Cancelled",
        description: `Service request ${request.request_number} for ${family?.name || "a family"} was auto-cancelled due to no family approval within 7 days.`,
      });
    }
  }
  
  console.log(`Created notifications for ${cancelledRequests?.length || 0} auto-cancelled requests`);
}

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

    // Send notifications for auto-declined/cancelled requests
    await Promise.all([
      sendDeclinedNotifications(supabase, result.auto_declined),
      sendCancelledNotifications(supabase, result.auto_cancelled),
    ]);

    return new Response(
      JSON.stringify({ 
        success: true, 
        processed: {
          auto_declined: result.auto_declined,
          auto_cancelled: result.auto_cancelled
        },
        notifications_sent: true,
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
