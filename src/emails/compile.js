#!/usr/bin/env node

/**
 * Email Template Compiler
 * Compiles Handlebars templates with sample data to HTML
 */

const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

// Paths
const TEMPLATES_DIR = path.join(__dirname, 'templates');
const PARTIALS_DIR = path.join(__dirname, 'partials');
const RENDERED_DIR = path.join(__dirname, 'rendered');

// Ensure rendered directory exists
if (!fs.existsSync(RENDERED_DIR)) {
  fs.mkdirSync(RENDERED_DIR, { recursive: true });
}

// Register partials
console.log('📦 Registering partials...');
const headerPartial = fs.readFileSync(path.join(PARTIALS_DIR, 'header.hbs'), 'utf8');
const footerPartial = fs.readFileSync(path.join(PARTIALS_DIR, 'footer.hbs'), 'utf8');
const stylesPartial = fs.readFileSync(path.join(PARTIALS_DIR, 'styles.hbs'), 'utf8');
const buttonPartial = fs.readFileSync(path.join(PARTIALS_DIR, 'button.hbs'), 'utf8');
const buttonSecondaryPartial = fs.readFileSync(path.join(PARTIALS_DIR, 'button-secondary.hbs'), 'utf8');
const buttonDestructivePartial = fs.readFileSync(path.join(PARTIALS_DIR, 'button-destructive.hbs'), 'utf8');

Handlebars.registerPartial('header', headerPartial);
Handlebars.registerPartial('footer', footerPartial);
Handlebars.registerPartial('styles', stylesPartial);
Handlebars.registerPartial('button', buttonPartial);
Handlebars.registerPartial('button-secondary', buttonSecondaryPartial);
Handlebars.registerPartial('button-destructive', buttonDestructivePartial);

// Register helpers
Handlebars.registerHelper('concat', (...args) => {
  args.pop(); // Remove the options object
  return args.join('');
});

// Sample data for each email template
const SAMPLE_DATA = {
  // Common data for all emails
  common: {
    portal_url: 'https://my.refamily.com',
    support_url: 'https://support.refamily.com',
    current_year: new Date().getFullYear(),
    user_email: 'victoria.sterling@example.com',
    user_name: 'Victoria Sterling',
  },

  // F1.1 - Email Verification
  'F1.1-email-verification': {
    verification_url: 'https://my.refamily.com/verify?token=abc123',
  },

  // F1.2 - Email Verified
  'F1.2-email-verified': {
    profile_url: 'https://my.refamily.com/profile/setup',
    getting_started_url: 'https://my.refamily.com/getting-started',
  },

  // F1.4 - Password Reset
  'F1.4-password-reset': {
    reset_url: 'https://my.refamily.com/reset-password?token=xyz789',

    // F1.5 - Password Changed
    'F1.5-password-changed': {
      change_date: 'December 11, 2025',
      change_time: '3:45 PM',
      timezone: 'EST',
      device_info: 'Chrome on macOS',
      location: 'New York, NY',
      security_url: 'https://my.refamily.com/security',

      // F1.6 - Unusual Activity
      'F1.6-unusual-activity': {
        failed_attempts: 5,
        location: 'Unknown Location (Tokyo, Japan)',
        ip_address: '192.0.2.1',
        attempt_time: 'December 11, 2025 at 2:30 AM EST',
        device_info: 'Unknown Device (Firefox on Windows)',
        reset_password_url: 'https://my.refamily.com/reset-password',
        security_review_url: 'https://my.refamily.com/security/review',
        lock_account_url: 'https://my.refamily.com/security/lock',
      },
    },

    // F2.3 - Subscription Activated
    'F2.3-subscription-activated': {
      plan_name: 'Family Portal Premium',
      monthly_amount: '299.00',
      first_invoice_date: 'January 1, 2026',
      getting_started_url: 'https://my.refamily.com/getting-started',
      docs_url: 'https://docs.refamily.com',
      onboarding_call_url: 'https://calendly.com/refamily/onboarding',

      // F2.4 - Monthly Invoice
      'F2.4-monthly-invoice': {
        billing_period: 'December 2025',
        invoice_number: 'INV-2025-12-001',
        invoice_date: 'December 1, 2025',
        due_date: 'December 15, 2025',
        total_amount: '349.00',
        line_items: [
          {
            description: 'Family Portal Subscription',
            details: 'Monthly subscription (Dec 1 - Dec 31, 2025)',
            amount: '299.00'
          },
          {
            description: 'Additional Advisor Seat',
            details: 'Dr. James Mitchell (prorated from Dec 5)',
            amount: '50.00'
          }
        ],
        payment_method: 'Visa',
        card_last_4: '4242',
        download_invoice_url: 'https://my.refamily.com/billing/invoices/INV-2025-12-001/download',
        view_billing_url: 'https://my.refamily.com/billing',
        billing_history_url: 'https://my.refamily.com/billing/history',
      },
    },
  },

  // F2.6 - Payment Failed
  'F2.6-payment-failed': {
    amount: '299.00',
    card_last_4: '4242',
    failure_reason: 'Insufficient funds',
    update_payment_url: 'https://my.refamily.com/billing/payment-method',

    // F4.2 - Meeting Reminder 24h
    'F4.2-meeting-reminder-24h': {
      meeting_title: 'Q4 2025 Family Council Meeting',
      meeting_date: 'Thursday, December 12, 2025',
      meeting_time: '2:00 PM',
      timezone: 'EST',
      duration: '2 hours',
      location: 'Conference Room A, Sterling Building',
      video_link: 'https://meet.refamily.com/q4-council',
      meeting_url: 'https://my.refamily.com/meetings/123',
      agenda: [
        'Review 2025 financial performance',
        'Discuss succession planning updates',
        'Vote on philanthropic initiatives for 2026',
      ],
      preparation_materials: [
        { name: 'Q4 Financial Report.pdf', url: '#' },
        { name: 'Agenda Details.docx', url: '#' }
      ]
    },

    // F5.3 - Direct Message
    'F5.3-direct-message': {
      sender_name: 'Marcus Chen',
      sent_time: 'Today at 2:30 PM',
      message_preview: 'Hi Victoria, I wanted to discuss the upcoming budget review meeting. Can we schedule a quick call before Thursday to align on our priorities?',
      message_url: 'https://my.refamily.com/messages/456',
      conversation_context: 'Budget Review Discussion',
      notification_settings_url: 'https://my.refamily.com/settings/notifications',

      // F6.6 - Decision Results
      'F6.6-decision-results': {
        decision_title: 'Expand Family Foundation Grant Budget',
        proposer_name: 'Victoria Sterling',
        voting_period: 'December 1-10, 2025',
        total_voters: 8,
        outcome: 'APPROVED',
        outcome_class: 'success',
        outcome_verb: 'approved',
        approval_percentage: '87.5',
        participation_rate: '100',
        vote_breakdown: [
          { option: 'Approve', count: 7, percentage: '87.5' },
          { option: 'Reject', count: 0, percentage: '0' },
          { option: 'Request More Information', count: 1, percentage: '12.5' }
        ],
        implementation_plan: 'The grant budget will be increased from $500,000 to $750,000 effective January 1, 2026. The Grant Committee will review applications for the additional funding starting in Q1.',
        implementation_timeline: 'January 1, 2026',
        implementation_owner: 'Grant Committee Chair',
        user_vote: 'Approve',
        user_vote_date: 'December 5, 2025 at 3:15 PM',
        view_results_url: 'https://my.refamily.com/decisions/456/results',
      },

      // F8.1 - Course Enrolled
      'F8.1-course-enrolled': {
        course_name: 'Family Governance Fundamentals',
        course_category: 'Governance & Leadership',
        course_level: 'Beginner',
        estimated_duration: '4 weeks (2-3 hours/week)',
        module_count: 6,
        course_description: 'Learn the foundations of effective family governance, including creating constitutions, establishing decision-making processes, and managing family dynamics across generations.',
        learning_outcomes: [
          'Understand the principles of family governance',
          'Learn how to create and maintain a Family Constitution',
          'Develop effective decision-making frameworks',
          'Navigate multi-generational family dynamics',
          'Implement best practices from leading family offices'
        ],
        modules: [
          { number: 1, title: 'Introduction to Family Governance', duration: '45 minutes', locked: false },
          { number: 2, title: 'Creating Your Family Constitution', duration: '60 minutes', locked: true },
          { number: 3, title: 'Decision-Making Frameworks', duration: '50 minutes', locked: true },
          { number: 4, title: 'Multi-Generational Dynamics', duration: '55 minutes', locked: true },
          { number: 5, title: 'Best Practices & Case Studies', duration: '60 minutes', locked: true },
          { number: 6, title: 'Implementation & Next Steps', duration: '40 minutes', locked: true }
        ],
        certificate_available: true,
        start_course_url: 'https://my.refamily.com/education/courses/family-governance-fundamentals',
      },
    },
  },

  // F3.2 - Advisor Accepted
  'F3.2-advisor-accepted': {
    advisor_name: 'Dr. James Mitchell',
    advisor_email: 'james.mitchell@advisors.com',
    advisor_role: 'Financial Advisor',
    acceptance_date: 'December 10, 2025',
    modules: ['Financial Planning', 'Asset Management', 'Tax Strategy'],
    permission_level: 'Read & Write',
    prorated_charge: '45.00',
    view_access_url: 'https://my.refamily.com/advisors/james-mitchell',
  },

  // F4.1 - Meeting Scheduled
  'F4.1-meeting-scheduled': {
    meeting_title: 'Q4 2025 Family Council Meeting',
    meeting_date: 'December 15, 2025',
    meeting_time: '2:00 PM',
    timezone: 'EST',
    duration: '2 hours',
    video_link: 'https://meet.refamily.com/q4-council',
    confirm_url: 'https://my.refamily.com/meetings/123/confirm',
    decline_url: 'https://my.refamily.com/meetings/123/decline',
    rsvp_deadline: 'December 13, 2025',
    agenda: [
      'Review 2025 financial performance',
      'Discuss succession planning updates',
      'Vote on philanthropic initiatives for 2026',
      'Strategic planning for family businesses'
    ],
    participants: [
      'Victoria Sterling (Chair)',
      'Marcus Chen (Family Council)',
      'Elizabeth Blackwell (Family Council)',
      'Dr. James Mitchell (Financial Advisor)'
    ],
    preparation_materials: [
      { name: 'Q4 Financial Report.pdf', url: '#' },
      { name: 'Succession Plan Draft.docx', url: '#' }
    ]
  },

  // F6.1 - New Decision Proposal
  'F6.1-new-decision-proposal': {
    decision_title: 'Expand Family Foundation Grant Budget',
    proposer_name: 'Victoria Sterling',
    category: 'Philanthropy',
    priority: 'High',
    priority_class: 'high',
    proposal_description: 'Increase our annual grant budget from $500,000 to $750,000 to support additional education initiatives in underserved communities.',
    impact_statement: 'This increase would allow us to support 5 additional organizations and impact approximately 2,000 more students annually.',
    voting_options: ['Approve', 'Reject', 'Request More Information'],
    vote_url: 'https://my.refamily.com/decisions/456/vote',
    voting_deadline: 'December 20, 2025 at 5:00 PM EST',
    days_remaining: 10,
    required_quorum: '75',
    supporting_documents: [
      { name: 'Proposed Budget Breakdown.xlsx', url: '#' },
      { name: 'Impact Analysis Report.pdf', url: '#' }
    ]
  },

  // F7.1 - Task Assigned
  'F7.1-task-assigned': {
    task_title: 'Review and Update Family Constitution',
    assigner_name: 'Victoria Sterling',
    assigner_email: 'victoria.sterling@example.com',
    due_date: 'January 15, 2026',
    priority: 'High',
    priority_class: 'high',
    category: 'Governance',
    task_description: 'Conduct a comprehensive review of our Family Constitution and propose updates to reflect our evolving family structure and values. Focus on succession planning provisions and conflict resolution procedures.',
    requirements: [
      'Review current constitution document (v2.0)',
      'Interview key family stakeholders',
      'Research best practices from similar family offices',
      'Draft proposed amendments with rationale',
      'Present findings at next Family Council meeting'
    ],
    task_url: 'https://my.refamily.com/tasks/789',
    resources: [
      { name: 'Current Family Constitution v2.0', url: '#' },
      { name: 'Best Practices Guide', url: '#' },
      { name: 'Stakeholder Contact List', url: '#' }
    ]
  },

  // A2.1 - Family Invitation (Advisor)
  'A2.1-family-invitation': {
    is_advisor: true,
    family_name: 'The Sterling Family',
    admin_name: 'Victoria Sterling',
    advisor_role: 'Lead Financial Advisor',
    expiration_date: 'December 18, 2025',
    is_family_council: true,
    modules: [
      {
        name: 'Financial Planning',
        description: 'Portfolio management and investment strategy',
        permission: 'Read & Write'
      },
      {
        name: 'Asset Management',
        description: 'Family asset tracking and valuation',
        permission: 'Read & Write'
      },
      {
        name: 'Meetings',
        description: 'Family Council and committee meetings',
        permission: 'Attend & Contribute'
      },
      {
        name: 'Decisions',
        description: 'Advisory input on family decisions',
        permission: 'View & Comment'
      }
    ],
    accept_url: 'https://my.refamily.com/invitations/accept?token=inv123',
    decline_url: 'https://my.refamily.com/invitations/decline?token=inv123',
  },

  // A3.1 - Daily Summary (Advisor)
  'A3.1-daily-summary': {
    is_advisor: true,
    family_count: 3,
    current_date: 'Wednesday, December 11, 2025',
    total_updates: 12,
    priority_count: 4,
    dashboard_url: 'https://my.refamily.com/advisor/dashboard',
    settings_url: 'https://my.refamily.com/settings/notifications',
    families: [
      {
        family_name: 'The Sterling Family',
        has_priority_items: true,
        priority_count: 2,
        portal_url: 'https://my.refamily.com/families/sterling',
        meetings: [
          {
            title: 'Q4 Financial Review',
            date: 'December 15, 2025',
            time: '2:00 PM EST',
            url: 'https://my.refamily.com/families/sterling/meetings/123'
          }
        ],
        decisions: [
          {
            title: 'Foundation Budget Increase',
            needs_input: true,
            voting_soon: true,
            url: 'https://my.refamily.com/families/sterling/decisions/456'
          }
        ],
        messages: [
          {
            from: 'Victoria Sterling',
            preview: 'Can we schedule a call to discuss the Q4 performance...',
            url: 'https://my.refamily.com/families/sterling/messages/789'
          }
        ]
      },
      {
        family_name: 'The Chen Family',
        has_priority_items: false,
        priority_count: 0,
        portal_url: 'https://my.refamily.com/families/chen',
        tasks: [
          {
            title: 'Estate Planning Document Review',
            due_date: 'December 20, 2025',
            overdue: false,
            url: 'https://my.refamily.com/families/chen/tasks/456'
          }
        ]
      },
      {
        family_name: 'The Blackwell Family',
        has_priority_items: true,
        priority_count: 2,
        portal_url: 'https://my.refamily.com/families/blackwell',
        decisions: [
          {
            title: 'Succession Plan Approval',
            needs_input: true,
            voting_soon: false,
            url: 'https://my.refamily.com/families/blackwell/decisions/789'
          }
        ],
        tasks: [
          {
            title: 'Trust Amendment Preparation',
            due_date: 'December 10, 2025',
            overdue: true,
            url: 'https://my.refamily.com/families/blackwell/tasks/123'
          }
        ]
      }
    ]
  }
};

// Compile templates
console.log('🔨 Compiling templates...\n');

const templates = fs.readdirSync(TEMPLATES_DIR).filter(file => file.endsWith('.hbs'));

let compiled = 0;
let errors = 0;

templates.forEach(templateFile => {
  try {
    const templateName = path.basename(templateFile, '.hbs');
    const templatePath = path.join(TEMPLATES_DIR, templateFile);
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    
    // Compile template
    const template = Handlebars.compile(templateSource);
    
    // Get sample data
    const data = {
      ...SAMPLE_DATA.common,
      ...(SAMPLE_DATA[templateName] || {})
    };
    
    // Render
    const html = template(data);
    
    // Save
    const outputFile = path.join(RENDERED_DIR, `${templateName}.html`);
    fs.writeFileSync(outputFile, html);
    
    console.log(`✅ ${templateName}.html`);
    compiled++;
  } catch (error) {
    console.error(`❌ ${templateFile}: ${error.message}`);
    errors++;
  }
});

console.log(`\n📊 Results: ${compiled} compiled, ${errors} errors`);
console.log(`📁 Output directory: ${RENDERED_DIR}`);

if (errors === 0) {
  console.log('\n✨ All templates compiled successfully!');
  process.exit(0);
} else {
  console.log(`\n⚠️  Compilation completed with ${errors} error(s)`);
  process.exit(1);
}
