import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  sendWelcomeEmail,
  sendConsultationReminder,
  sendPaymentConfirmation,
  sendPaymentFailed,
  sendNewMessageNotification,
  sendPasswordResetEmail,
} from "@/lib/email";

type EmailType =
  | "welcome"
  | "consultation-reminder"
  | "payment-confirmation"
  | "payment-failed"
  | "new-message"
  | "password-reset";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    
    // Get current user for authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { type, data } = await request.json() as { type: EmailType; data: Record<string, unknown> };

    if (!type) {
      return NextResponse.json({ error: "Email type is required" }, { status: 400 });
    }

    let result;

    switch (type) {
      case "welcome":
        result = await sendWelcomeEmail(
          data.email as string,
          data.name as string
        );
        break;

      case "consultation-reminder":
        result = await sendConsultationReminder({
          email: data.email as string,
          name: data.name as string,
          consultationTitle: data.consultationTitle as string,
          consultationDate: data.consultationDate as string,
          consultationTime: data.consultationTime as string,
          familyName: data.familyName as string,
        });
        break;

      case "payment-confirmation":
        result = await sendPaymentConfirmation({
          email: data.email as string,
          name: data.name as string,
          planName: data.planName as string,
          amount: data.amount as number,
          currency: data.currency as string | undefined,
          invoiceUrl: data.invoiceUrl as string | undefined,
        });
        break;

      case "payment-failed":
        result = await sendPaymentFailed({
          email: data.email as string,
          name: data.name as string,
          planName: data.planName as string,
          retryUrl: data.retryUrl as string,
        });
        break;

      case "new-message":
        result = await sendNewMessageNotification({
          email: data.email as string,
          recipientName: data.recipientName as string,
          senderName: data.senderName as string,
          messagePreview: data.messagePreview as string,
          conversationUrl: data.conversationUrl as string,
        });
        break;

      case "password-reset":
        result = await sendPasswordResetEmail({
          email: data.email as string,
          resetUrl: data.resetUrl as string,
        });
        break;

      default:
        return NextResponse.json({ error: "Unknown email type" }, { status: 400 });
    }

    return NextResponse.json({ success: true, messageId: result?.id });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
