/**
 * Email Catalog - Advisor Portal only
 */

export type EmailPriority = 'critical' | 'high' | 'normal' | 'low';
export type EmailPortal = 'family' | 'advisor';
export type EmailCategory =
  | 'authentication'
  | 'advisors'
  | 'communication'
  | 'system';

export interface EmailTemplate {
  id: string;
  portal: EmailPortal;
  category: EmailCategory;
  trigger: string;
  recipient: string;
  subject: string;
  keyContent: string;
  cta?: string;
  priority: EmailPriority;
  canOptOut: boolean;
  templateFile: string;
}

export const EMAIL_CATALOG: Record<string, EmailTemplate> = {
  // ==========================================
  // ADVISOR PORTAL - Authentication & Access (A1.x)
  // ==========================================
  'A1.1': {
    id: 'A1.1',
    portal: 'advisor',
    category: 'authentication',
    trigger: 'User registration',
    recipient: 'New Advisor',
    subject: 'Welcome to ReFamily Advisor Portal - Verify your email',
    keyContent: 'Welcome message, verification link, expires in 24 hours',
    cta: 'Verify Email',
    priority: 'critical',
    canOptOut: false,
    templateFile: 'A1.1-email-verification.hbs'
  },
  'A1.2': {
    id: 'A1.2',
    portal: 'advisor',
    category: 'authentication',
    trigger: 'Email verified',
    recipient: 'Advisor',
    subject: 'Email verified - Complete your advisor profile',
    keyContent: 'Confirmation, profile setup requirements, multi-family access explanation',
    cta: 'Complete Profile',
    priority: 'high',
    canOptOut: false,
    templateFile: 'A1.2-email-verified.hbs'
  },
  'A1.3': {
    id: 'A1.3',
    portal: 'advisor',
    category: 'authentication',
    trigger: 'Password reset requested',
    recipient: 'Advisor',
    subject: 'Reset your password - Action required',
    keyContent: 'Reset link, expires in 1 hour, security reminder',
    cta: 'Reset Password',
    priority: 'critical',
    canOptOut: false,
    templateFile: 'A1.3-password-reset.hbs'
  },
  'A1.4': {
    id: 'A1.4',
    portal: 'advisor',
    category: 'authentication',
    trigger: 'Password changed',
    recipient: 'Advisor',
    subject: 'Password changed successfully',
    keyContent: 'Confirmation, security alert, contact support if unauthorized',
    priority: 'high',
    canOptOut: false,
    templateFile: 'A1.4-password-changed.hbs'
  },
  'A1.5': {
    id: 'A1.5',
    portal: 'advisor',
    category: 'authentication',
    trigger: 'New device login',
    recipient: 'Advisor',
    subject: 'New device login detected',
    keyContent: 'Device info, location, time, revoke access option',
    cta: 'Review Devices',
    priority: 'high',
    canOptOut: false,
    templateFile: 'A1.5-new-device.hbs'
  },

  'A2.1': {
    id: 'A2.1',
    portal: 'advisor',
    category: 'advisors',
    trigger: 'Advisor invited to join a family portal',
    recipient: 'Advisor',
    subject: "You're invited to join {{family_name}}'s Family Portal",
    keyContent: 'Invitation details, role, permissions/modules, expiry date',
    cta: 'Accept Invitation',
    priority: 'high',
    canOptOut: false,
    templateFile: 'A2.1-family-invitation.hbs'
  },
  'A2.2': {
    id: 'A2.2',
    portal: 'advisor',
    category: 'advisors',
    trigger: 'Invitation accepted confirmation',
    recipient: 'Advisor',
    subject: 'Access granted: {{family_name}}\'s Family Portal',
    keyContent: 'Modules you can access, permissions granted, Family Council status',
    cta: 'Explore Portal',
    priority: 'high',
    canOptOut: false,
    templateFile: 'A2.2-access-granted.hbs'
  },
  'A2.3': {
    id: 'A2.3',
    portal: 'advisor',
    category: 'advisors',
    trigger: 'Access configuration changed',
    recipient: 'Advisor',
    subject: 'Access updated: {{family_name}}\'s Family Portal',
    keyContent: 'Modules added/removed, permission changes, effective date',
    cta: 'Review Changes',
    priority: 'high',
    canOptOut: false,
    templateFile: 'A2.3-access-updated.hbs'
  },
  'A2.4': {
    id: 'A2.4',
    portal: 'advisor',
    category: 'advisors',
    trigger: 'Family access removed',
    recipient: 'Advisor',
    subject: 'Access removed: {{family_name}}\'s Family Portal',
    keyContent: 'Removal effective date, reason if provided, next steps',
    priority: 'high',
    canOptOut: false,
    templateFile: 'A2.4-access-removed.hbs'
  },
  'A2.5': {
    id: 'A2.5',
    portal: 'advisor',
    category: 'advisors',
    trigger: 'Family Council membership granted',
    recipient: 'Advisor',
    subject: 'Family Council access granted: {{family_name}}',
    keyContent: 'Council privileges, responsibilities, governance rights',
    cta: 'Review Role',
    priority: 'high',
    canOptOut: false,
    templateFile: 'A2.5-council-granted.hbs'
  },
  'A2.6': {
    id: 'A2.6',
    portal: 'advisor',
    category: 'advisors',
    trigger: 'New family added to portfolio',
    recipient: 'Advisor',
    subject: 'New family client: {{family_name}} added',
    keyContent: 'Family name, modules/permissions, primary contact, onboarding steps',
    cta: 'Get Started',
    priority: 'normal',
    canOptOut: true,
    templateFile: 'A2.6-family-added.hbs'
  },
  'A3.1': {
    id: 'A3.1',
    portal: 'advisor',
    category: 'communication',
    trigger: 'Daily multi-family digest for advisor',
    recipient: 'Advisor',
    subject: 'Daily summary: Updates across {{family_count}} families',
    keyContent: 'Per-family updates: meetings, decisions, tasks, messages, priority items',
    cta: 'View Multi-Family Dashboard',
    priority: 'normal',
    canOptOut: true,
    templateFile: 'A3.1-daily-summary.hbs'
  },
  'A3.2': {
    id: 'A3.2',
    portal: 'advisor',
    category: 'communication',
    trigger: 'High-priority family alert',
    recipient: 'Advisor',
    subject: 'Priority alert: {{family_name}} - {{event_type}}',
    keyContent: 'Urgent family situation requiring attention, context, recommended action',
    cta: 'Take Action',
    priority: 'high',
    canOptOut: true,
    templateFile: 'A3.2-priority-alert.hbs'
  },
  'A3.3': {
    id: 'A3.3',
    portal: 'advisor',
    category: 'communication',
    trigger: 'Family meeting invitation',
    recipient: 'Advisor',
    subject: 'Meeting invitation: {{family_name}} - {{meeting_title}}',
    keyContent: 'Meeting details, advisory role, preparation materials, RSVP required',
    cta: 'Confirm/Decline',
    priority: 'high',
    canOptOut: true,
    templateFile: 'A3.3-meeting-invitation.hbs'
  },
  'A3.4': {
    id: 'A3.4',
    portal: 'advisor',
    category: 'communication',
    trigger: 'Family decision input requested',
    recipient: 'Advisor',
    subject: 'Input requested: {{family_name}} - {{decision_title}}',
    keyContent: 'Decision details, advisory role, input deadline, scope',
    cta: 'Provide Input',
    priority: 'high',
    canOptOut: true,
    templateFile: 'A3.4-decision-input.hbs'
  },

  // ==========================================
  // ADVISOR PORTAL - System & Support (A4.x)
  // ==========================================
  'A4.1': {
    id: 'A4.1',
    portal: 'advisor',
    category: 'system',
    trigger: 'Platform update deployed',
    recipient: 'Advisor',
    subject: 'Advisor Portal updated - New features',
    keyContent: 'Release notes, new features relevant to advisors, improvements',
    cta: 'Explore Updates',
    priority: 'normal',
    canOptOut: true,
    templateFile: 'A4.1-platform-update.hbs'
  },
  'A4.2': {
    id: 'A4.2',
    portal: 'advisor',
    category: 'system',
    trigger: 'Support ticket created',
    recipient: 'Advisor',
    subject: 'Support ticket created: #{{ticket_id}}',
    keyContent: 'Ticket details, expected response time, tracking link',
    cta: 'Track Ticket',
    priority: 'normal',
    canOptOut: true,
    templateFile: 'A4.2-support-ticket-created.hbs'
  },
  'A4.3': {
    id: 'A4.3',
    portal: 'advisor',
    category: 'system',
    trigger: 'Support ticket resolved',
    recipient: 'Advisor',
    subject: 'Support ticket resolved: #{{ticket_id}}',
    keyContent: 'Resolution details, satisfaction survey, reopen option',
    cta: 'Rate Support',
    priority: 'normal',
    canOptOut: true,
    templateFile: 'A4.3-support-ticket-resolved.hbs'
  }
};

export function getEmailsByPortal(portal: EmailPortal): EmailTemplate[] {
  return Object.values(EMAIL_CATALOG).filter(email => email.portal === portal);
}

export function getEmailsByCategory(category: EmailCategory): EmailTemplate[] {
  return Object.values(EMAIL_CATALOG).filter(email => email.category === category);
}

export function getEmailsByPriority(priority: EmailPriority): EmailTemplate[] {
  return Object.values(EMAIL_CATALOG).filter(email => email.priority === priority);
}

export function getEmailTemplate(id: string): EmailTemplate | undefined {
  return EMAIL_CATALOG[id];
}
