// Test fixtures - sample data for tests

export const mockUser = {
  id: 'test-user-id',
  email: 'test@example.com',
  email_confirmed_at: new Date().toISOString(),
  user_metadata: {
    first_name: 'Test',
    last_name: 'User',
  },
  created_at: new Date().toISOString(),
};

export const mockProfile = {
  id: 'test-user-id',
  first_name: 'Test',
  last_name: 'User',
  email: 'test@example.com',
  phone: '+1234567890',
  company: 'Test Company',
  title: 'Senior Advisor',
  bio: 'Test bio',
  location: 'New York, USA',
  timezone: 'America/New_York',
  avatar_url: 'https://example.com/avatar.jpg',
  website: 'https://example.com',
  linkedin: 'https://linkedin.com/in/testuser',
  twitter: '@testuser',
  stripe_customer_id: 'cus_test123',
  stripe_account_status: 'active',
  subscription_plan: 'pro',
  kyc_status: 'verified',
  is_first_login: false,
  onboarding_progress: 100,
  profile_status: 'complete',
  completion_percentage: 100,
  family_id: 1,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export const mockFamily = {
  id: 1,
  advisor_id: 'test-user-id',
  name: 'Smith Family',
  wealth: '$10M+',
  members_count: 4,
  role: 'personal-advisor' as const,
  payment_status: 'paid' as const,
  status: 'active' as const,
  last_contact: new Date().toISOString(),
  industry: 'Technology',
  location: 'San Francisco, CA',
  email: 'smith@example.com',
  phone: '+1234567890',
  description: 'High net worth family',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export const mockFamilyMember = {
  id: 1,
  family_id: 1,
  name: 'John Smith',
  role: 'head',
  email: 'john@example.com',
  avatar: 'https://example.com/john.jpg',
  created_at: new Date().toISOString(),
};

export const mockConversation = {
  id: 1,
  family_id: 1,
  title: 'Investment Discussion',
  last_message: 'Looking forward to our next meeting',
  last_message_time: new Date().toISOString(),
  unread_count: 2,
  pinned: false,
  created_at: new Date().toISOString(),
  family: {
    name: 'Smith Family',
    status: 'active',
  },
};

export const mockMessage = {
  id: 1,
  conversation_id: 1,
  sender_id: 'test-user-id',
  sender_name: 'Test User',
  content: 'Hello, this is a test message',
  read: true,
  is_own: true,
  created_at: new Date().toISOString(),
};

export const mockConsultation = {
  id: 1,
  family_id: 1,
  advisor_id: 'test-user-id',
  title: 'Quarterly Review',
  date: '2025-01-15',
  time: '14:00',
  duration: '60 min',
  status: 'scheduled' as const,
  payment_status: 'paid' as const,
  price: '$500',
  meeting_link: 'https://meet.example.com/abc123',
  location: null,
  type: 'video' as const,
  agenda: ['Portfolio review', 'Risk assessment', 'Q1 planning'],
  notes: 'Prepare financial reports',
  created_at: new Date().toISOString(),
  family: {
    name: 'Smith Family',
  },
  members: [],
};

export const mockNotification = {
  id: 1,
  user_id: 'test-user-id',
  type: 'message' as const,
  title: 'New message from Smith Family',
  description: 'You have a new message regarding the investment plan',
  read: false,
  created_at: new Date().toISOString(),
};

export const mockService = {
  id: 1,
  advisor_id: 'test-user-id',
  name: 'Wealth Management',
  service_type_id: 1,
  description: 'Comprehensive wealth management services',
  rate: 500,
  rate_type: 'hourly' as const,
  max_clients: 10,
  current_clients: 5,
  is_published: true,
  status: 'Active',
  progress: 50,
  family_id: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  service_type: {
    id: 1,
    name: 'Wealth Advisory',
    category: 'advisory',
    description: 'Wealth advisory services',
    icon: 'briefcase',
    is_active: true,
    sort_order: 1,
  },
};

export const mockServiceType = {
  id: 1,
  name: 'Wealth Advisory',
  category: 'advisory',
  description: 'Wealth advisory services',
  icon: 'briefcase',
  is_active: true,
  sort_order: 1,
};

export const mockInvitation = {
  id: 'inv-123',
  family_id: 1,
  invited_by: 'test-user-id',
  email: 'invite@example.com',
  role: 'member' as const,
  invite_code: 'ABC12345',
  status: 'pending' as const,
  message: 'Welcome to our family office',
  expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  accepted_at: null,
  accepted_by: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

// Multiple items for list tests
export const mockFamilies = [
  mockFamily,
  {
    ...mockFamily,
    id: 2,
    name: 'Johnson Family',
    status: 'pending' as const,
    members_count: 2,
  },
  {
    ...mockFamily,
    id: 3,
    name: 'Williams Family',
    status: 'inactive' as const,
    members_count: 6,
  },
];

export const mockConsultations = [
  mockConsultation,
  {
    ...mockConsultation,
    id: 2,
    title: 'Tax Planning Session',
    status: 'confirmed' as const,
    date: '2025-01-20',
  },
  {
    ...mockConsultation,
    id: 3,
    title: 'Estate Planning',
    status: 'completed' as const,
    date: '2024-12-15',
  },
];

export const mockNotifications = [
  mockNotification,
  {
    ...mockNotification,
    id: 2,
    type: 'payment' as const,
    title: 'Payment received',
    read: true,
  },
  {
    ...mockNotification,
    id: 3,
    type: 'consultation' as const,
    title: 'Upcoming consultation',
    read: false,
  },
];
