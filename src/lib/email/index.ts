import { Resend } from 'resend';

// Lazy initialization
let resendInstance: Resend | null = null;

function getResend(): Resend {
  if (!resendInstance) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not set');
    }
    resendInstance = new Resend(process.env.RESEND_API_KEY);
  }
  return resendInstance;
}

const FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@advisor-portal.com';
const APP_NAME = 'Advisor Portal';

// Email sending function
export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}) {
  const resend = getResend();
  
  const { data, error } = await resend.emails.send({
    from: `${APP_NAME} <${FROM_EMAIL}>`,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
    text: text || html.replace(/<[^>]*>/g, ''), // Strip HTML for text version
  });

  if (error) {
    console.error('Failed to send email:', error);
    throw error;
  }

  return data;
}

// ============================================
// EMAIL TEMPLATES
// ============================================

// Welcome email for new users
export async function sendWelcomeEmail(email: string, name: string) {
  return sendEmail({
    to: email,
    subject: `Welcome to ${APP_NAME}!`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
            .header h1 { color: white; margin: 0; font-size: 24px; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; }
            .button { display: inline-block; background: #6366f1; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: 500; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to ${APP_NAME}!</h1>
            </div>
            <div class="content">
              <p>Hi ${name || 'there'},</p>
              <p>Welcome to ${APP_NAME}! We're excited to have you on board.</p>
              <p>As a family wealth advisor, you now have access to powerful tools to manage your clients, consultations, and business operations all in one place.</p>
              <p><strong>Here's what you can do:</strong></p>
              <ul>
                <li>👨‍👩‍👧‍👦 Manage family clients and their wealth profiles</li>
                <li>📅 Schedule and track consultations</li>
                <li>💬 Communicate securely with clients</li>
                <li>📊 Track your revenue and performance</li>
                <li>📚 Access and share knowledge resources</li>
              </ul>
              <p style="text-align: center; margin-top: 30px;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}" class="button">Get Started</a>
              </p>
            </div>
            <div class="footer">
              <p>If you have any questions, reply to this email or contact our support team.</p>
              <p>&copy; ${new Date().getFullYear()} ${APP_NAME}. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  });
}

// Consultation reminder email
export async function sendConsultationReminder({
  email,
  name,
  consultationTitle,
  consultationDate,
  consultationTime,
  familyName,
}: {
  email: string;
  name: string;
  consultationTitle: string;
  consultationDate: string;
  consultationTime: string;
  familyName: string;
}) {
  return sendEmail({
    to: email,
    subject: `Reminder: Consultation with ${familyName} tomorrow`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #3b82f6; padding: 20px; text-align: center; border-radius: 12px 12px 0 0; }
            .header h1 { color: white; margin: 0; font-size: 20px; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; }
            .meeting-card { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .meeting-card h3 { margin-top: 0; color: #1f2937; }
            .meeting-info { color: #6b7280; }
            .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: 500; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📅 Consultation Reminder</h1>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>This is a reminder that you have an upcoming consultation:</p>
              
              <div class="meeting-card">
                <h3>${consultationTitle}</h3>
                <p class="meeting-info">
                  <strong>Family:</strong> ${familyName}<br>
                  <strong>Date:</strong> ${consultationDate}<br>
                  <strong>Time:</strong> ${consultationTime}
                </p>
              </div>
              
              <p style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/consultations" class="button">View Consultation</a>
              </p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} ${APP_NAME}</p>
            </div>
          </div>
        </body>
      </html>
    `,
  });
}

// Payment confirmation email
export async function sendPaymentConfirmation({
  email,
  name,
  planName,
  amount,
  currency = 'USD',
  invoiceUrl,
}: {
  email: string;
  name: string;
  planName: string;
  amount: number;
  currency?: string;
  invoiceUrl?: string;
}) {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);

  return sendEmail({
    to: email,
    subject: `Payment Confirmation - ${planName} Plan`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #10b981; padding: 20px; text-align: center; border-radius: 12px 12px 0 0; }
            .header h1 { color: white; margin: 0; font-size: 20px; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; }
            .receipt { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .receipt-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
            .receipt-row:last-child { border-bottom: none; font-weight: bold; }
            .button { display: inline-block; background: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: 500; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Payment Successful</h1>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>Thank you for your payment! Your subscription is now active.</p>
              
              <div class="receipt">
                <div class="receipt-row">
                  <span>Plan</span>
                  <span>${planName}</span>
                </div>
                <div class="receipt-row">
                  <span>Amount</span>
                  <span>${formattedAmount}/month</span>
                </div>
              </div>
              
              ${invoiceUrl ? `
              <p style="text-align: center;">
                <a href="${invoiceUrl}" class="button">View Invoice</a>
              </p>
              ` : ''}
            </div>
            <div class="footer">
              <p>Questions? Reply to this email or contact support.</p>
              <p>&copy; ${new Date().getFullYear()} ${APP_NAME}</p>
            </div>
          </div>
        </body>
      </html>
    `,
  });
}

// Payment failed email
export async function sendPaymentFailed({
  email,
  name,
  planName,
  retryUrl,
}: {
  email: string;
  name: string;
  planName: string;
  retryUrl: string;
}) {
  return sendEmail({
    to: email,
    subject: `Action Required: Payment Failed`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #ef4444; padding: 20px; text-align: center; border-radius: 12px 12px 0 0; }
            .header h1 { color: white; margin: 0; font-size: 20px; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; }
            .alert { background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 20px; margin: 20px 0; color: #dc2626; }
            .button { display: inline-block; background: #ef4444; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: 500; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>⚠️ Payment Failed</h1>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>We were unable to process your payment for the <strong>${planName}</strong> plan.</p>
              
              <div class="alert">
                <p><strong>What happened?</strong></p>
                <p>Your payment method was declined. This could be due to:</p>
                <ul>
                  <li>Insufficient funds</li>
                  <li>Expired card</li>
                  <li>Bank declined the transaction</li>
                </ul>
              </div>
              
              <p>Please update your payment method to continue using ${APP_NAME}.</p>
              
              <p style="text-align: center;">
                <a href="${retryUrl}" class="button">Update Payment Method</a>
              </p>
            </div>
            <div class="footer">
              <p>Need help? Reply to this email or contact support.</p>
              <p>&copy; ${new Date().getFullYear()} ${APP_NAME}</p>
            </div>
          </div>
        </body>
      </html>
    `,
  });
}

// New message notification
export async function sendNewMessageNotification({
  email,
  recipientName,
  senderName,
  messagePreview,
  conversationUrl,
}: {
  email: string;
  recipientName: string;
  senderName: string;
  messagePreview: string;
  conversationUrl: string;
}) {
  return sendEmail({
    to: email,
    subject: `New message from ${senderName}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #6366f1; padding: 20px; text-align: center; border-radius: 12px 12px 0 0; }
            .header h1 { color: white; margin: 0; font-size: 20px; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; }
            .message-preview { background: white; border: 1px solid #e5e7eb; border-left: 4px solid #6366f1; border-radius: 0 8px 8px 0; padding: 20px; margin: 20px 0; }
            .sender { font-weight: bold; color: #1f2937; margin-bottom: 10px; }
            .button { display: inline-block; background: #6366f1; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: 500; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>💬 New Message</h1>
            </div>
            <div class="content">
              <p>Hi ${recipientName},</p>
              <p>You have a new message:</p>
              
              <div class="message-preview">
                <div class="sender">${senderName}</div>
                <p style="color: #6b7280; margin: 0;">${messagePreview}</p>
              </div>
              
              <p style="text-align: center;">
                <a href="${conversationUrl}" class="button">View Message</a>
              </p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} ${APP_NAME}</p>
            </div>
          </div>
        </body>
      </html>
    `,
  });
}

// Password reset email
export async function sendPasswordResetEmail({
  email,
  resetUrl,
}: {
  email: string;
  resetUrl: string;
}) {
  return sendEmail({
    to: email,
    subject: `Reset Your Password`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #f59e0b; padding: 20px; text-align: center; border-radius: 12px 12px 0 0; }
            .header h1 { color: white; margin: 0; font-size: 20px; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; }
            .button { display: inline-block; background: #f59e0b; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: 500; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .warning { color: #9ca3af; font-size: 12px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 Password Reset</h1>
            </div>
            <div class="content">
              <p>We received a request to reset your password.</p>
              <p>Click the button below to create a new password:</p>
              
              <p style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" class="button">Reset Password</a>
              </p>
              
              <p class="warning">
                This link expires in 1 hour. If you didn't request a password reset, you can safely ignore this email.
              </p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} ${APP_NAME}</p>
            </div>
          </div>
        </body>
      </html>
    `,
  });
}
