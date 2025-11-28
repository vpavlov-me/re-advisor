/**
 * Script to create test users with different roles and seed their data
 * Uses service_role key for admin operations
 * Run with: npx tsx scripts/seed-test-users-v2.ts
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qwpmdfkycedyefxvloti.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3cG1kZmt5Y2VkeWVmeHZsb3RpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDI1MzQwMSwiZXhwIjoyMDc5ODI5NDAxfQ.YKQcBcmBKHY8r9jkE6NvsIHeCP2Ep6u5uFLCGDpy7no';

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Test users configuration
const testUsers = [
  {
    email: 'victoria.sterling@readvisor.app',
    password: 'TestAdvisor123!',
    profile: {
      first_name: 'Victoria',
      last_name: 'Sterling',
      title: 'Senior Family Advisor',
      phone: '+1 (555) 100-0001',
      company: 'Sterling Advisory Group',
      location: 'New York, NY',
      timezone: 'America/New_York',
      bio: 'Senior family advisor with 15+ years of experience in wealth management, succession planning, and family governance.',
      linkedin: 'https://linkedin.com/in/victoria-sterling',
      completion_percentage: 95,
    },
    role: 'senior-advisor',
  },
  {
    email: 'marcus.chen@readvisor.app',
    password: 'TestAdvisor123!',
    profile: {
      first_name: 'Marcus',
      last_name: 'Chen',
      title: 'Family Advisor',
      phone: '+1 (555) 100-0002',
      company: 'Chen Consulting',
      location: 'San Francisco, CA',
      timezone: 'America/Los_Angeles',
      bio: 'Emerging family advisor specializing in tech entrepreneur families.',
      linkedin: 'https://linkedin.com/in/marcus-chen',
      completion_percentage: 60,
    },
    role: 'new-advisor',
  },
  {
    email: 'elizabeth.blackwell@readvisor.app',
    password: 'TestAdvisor123!',
    profile: {
      first_name: 'Elizabeth',
      last_name: 'Blackwell',
      title: 'Principal Family Advisor',
      phone: '+1 (555) 100-0003',
      company: 'Blackwell & Partners',
      location: 'Chicago, IL',
      timezone: 'America/Chicago',
      bio: 'Principal advisor managing complex multi-family office relationships.',
      linkedin: 'https://linkedin.com/in/elizabeth-blackwell',
      completion_percentage: 100,
    },
    role: 'enterprise-advisor',
  },
];

// Families data for each advisor
const familiesData: Record<string, any[]> = {
  'senior-advisor': [
    {
      name: 'Harrington Family',
      members_count: 4,
      role: 'personal-advisor',
      payment_status: 'paid',
      status: 'active',
      industry: 'Real Estate',
      location: 'Los Angeles, CA',
      email: 'office@harringtonfamily.com',
      phone: '+1 (310) 555-0456',
      description: 'Established real estate dynasty transitioning to third generation leadership.',
    },
    {
      name: 'Morrison Family',
      members_count: 2,
      role: 'consultant',
      payment_status: 'paid',
      status: 'active',
      industry: 'Healthcare',
      location: 'Boston, MA',
      email: 'info@morrisonhealthcare.com',
      phone: '+1 (617) 555-0789',
      description: 'Healthcare professionals establishing family governance framework.',
    },
  ],
  'new-advisor': [
    {
      name: 'Chen Tech Family',
      members_count: 2,
      role: 'consultant',
      payment_status: 'pending',
      status: 'active',
      industry: 'Technology',
      location: 'Palo Alto, CA',
      email: 'family@chentech.io',
      phone: '+1 (650) 555-0100',
      description: 'First-generation wealth family from successful startup exit.',
    },
  ],
  'enterprise-advisor': [
    {
      name: 'Blackwell Dynasty',
      members_count: 5,
      role: 'personal-advisor',
      payment_status: 'paid',
      status: 'active',
      industry: 'Finance',
      location: 'Chicago, IL',
      email: 'office@blackwelldynasty.com',
      phone: '+1 (312) 555-0001',
      description: 'Multi-generational financial dynasty with complex trust structures.',
    },
    {
      name: 'Van Der Berg Family',
      members_count: 3,
      role: 'personal-advisor',
      payment_status: 'paid',
      status: 'active',
      industry: 'Manufacturing',
      location: 'Amsterdam, Netherlands',
      email: 'office@vandenbergholdings.eu',
      phone: '+31 20 555 0001',
      description: 'European industrial family with cross-border governance needs.',
    },
    {
      name: 'Al-Rashid Family Office',
      members_count: 3,
      role: 'consultant',
      payment_status: 'paid',
      status: 'active',
      industry: 'Investment',
      location: 'Dubai, UAE',
      email: 'info@alrashidfo.ae',
      phone: '+971 4 555 0001',
      description: 'Middle Eastern family office seeking Western governance best practices.',
    },
  ],
};

// Family members templates
const familyMembersTemplates: Record<string, any[]> = {
  'Harrington Family': [
    { name: 'Clara Harrington', role: 'Matriarch', email: 'clara@harrington.com' },
    { name: 'Oliver Harrington', role: 'CEO', email: 'oliver@harrington.com' },
    { name: 'Emma Harrington', role: 'CFO', email: 'emma@harrington.com' },
    { name: 'William Harrington', role: 'Board Member', email: 'william@harrington.com' },
  ],
  'Morrison Family': [
    { name: 'Dr. James Morrison', role: 'Patriarch', email: 'james@morrisonmed.com' },
    { name: 'Dr. Sarah Morrison', role: 'Co-Founder', email: 'sarah@morrisonmed.com' },
  ],
  'Chen Tech Family': [
    { name: 'David Chen', role: 'Founder', email: 'david@chentech.io' },
    { name: 'Linda Chen', role: 'Co-Founder', email: 'linda@chentech.io' },
  ],
  'Blackwell Dynasty': [
    { name: 'Richard Blackwell III', role: 'Chairman', email: 'richard@blackwell.com' },
    { name: 'Victoria Blackwell', role: 'Vice Chair', email: 'victoria@blackwell.com' },
    { name: 'Thomas Blackwell', role: 'Director', email: 'thomas@blackwell.com' },
    { name: 'Catherine Blackwell', role: 'Director', email: 'catherine@blackwell.com' },
    { name: 'James Blackwell Jr.', role: 'Next Gen Lead', email: 'james.jr@blackwell.com' },
  ],
  'Van Der Berg Family': [
    { name: 'Henrik Van Der Berg', role: 'CEO', email: 'henrik@vdb.eu' },
    { name: 'Marta Van Der Berg', role: 'CFO', email: 'marta@vdb.eu' },
    { name: 'Johan Van Der Berg', role: 'COO', email: 'johan@vdb.eu' },
  ],
  'Al-Rashid Family Office': [
    { name: 'Ahmed Al-Rashid', role: 'Principal', email: 'ahmed@alrashid.ae' },
    { name: 'Fatima Al-Rashid', role: 'Director', email: 'fatima@alrashid.ae' },
    { name: 'Omar Al-Rashid', role: 'Advisor', email: 'omar@alrashid.ae' },
  ],
};

async function fixTrigger() {
  console.log('🔧 Checking and fixing trigger...');
  
  // Try to drop and recreate trigger via RPC if possible
  // If this fails, we'll create profiles manually
  try {
    const { error } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE OR REPLACE FUNCTION public.handle_new_user()
        RETURNS TRIGGER AS $$
        BEGIN
          INSERT INTO public.profiles (id, email, first_name, last_name)
          VALUES (
            NEW.id,
            NEW.email,
            COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
            COALESCE(NEW.raw_user_meta_data->>'last_name', '')
          )
          ON CONFLICT (id) DO NOTHING;
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql SECURITY DEFINER;
      `
    });
    if (error) {
      console.log('ℹ️  Trigger fix via RPC not available, will create profiles manually');
    } else {
      console.log('✅ Trigger fixed');
    }
  } catch (e) {
    console.log('ℹ️  Will create profiles manually');
  }
}

async function createTestUser(userData: typeof testUsers[0]) {
  console.log(`\n📝 Creating user: ${userData.email}`);
  
  // First check if user already exists
  const { data: existingUsers } = await supabase.auth.admin.listUsers();
  const existingUser = existingUsers?.users?.find(u => u.email === userData.email);
  
  if (existingUser) {
    console.log(`ℹ️  User already exists: ${existingUser.id}`);
    
    // Update profile anyway
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: existingUser.id,
        ...userData.profile,
        email: userData.email,
      });
    
    if (profileError) {
      console.error(`❌ Error updating profile:`, profileError.message);
    } else {
      console.log(`✅ Profile updated`);
    }
    
    return {
      userId: existingUser.id,
      role: userData.role,
      email: userData.email,
    };
  }
  
  // First, create the profile (before the user, to avoid trigger issues)
  const tempId = crypto.randomUUID();
  
  // Create user with admin API
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: userData.email,
    password: userData.password,
    email_confirm: true,
    user_metadata: {
      first_name: userData.profile.first_name,
      last_name: userData.profile.last_name,
    },
  });

  if (authError) {
    console.error(`❌ Error creating user ${userData.email}:`, authError.message);
    return null;
  }

  if (!authData.user) {
    console.error(`❌ No user returned for ${userData.email}`);
    return null;
  }

  console.log(`✅ User created: ${authData.user.id}`);

  // Create/update profile manually
  const { error: profileError } = await supabase
    .from('profiles')
    .upsert({
      id: authData.user.id,
      ...userData.profile,
      email: userData.email,
    });

  if (profileError) {
    console.error(`❌ Error creating profile:`, profileError.message);
  } else {
    console.log(`✅ Profile created`);
  }

  return {
    userId: authData.user.id,
    role: userData.role,
    email: userData.email,
  };
}

async function seedFamiliesForUser(userId: string, role: string) {
  const families = familiesData[role] || [];
  console.log(`\n👨‍👩‍👧‍👦 Creating ${families.length} families for role: ${role}`);

  for (const family of families) {
    // Create family
    const { data: familyData, error: familyError } = await supabase
      .from('families')
      .insert({
        ...family,
        advisor_id: userId,
        last_contact: new Date().toISOString(),
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (familyError) {
      console.error(`❌ Error creating family ${family.name}:`, familyError.message);
      continue;
    }

    console.log(`  ✅ Family created: ${family.name}`);

    // Add family members
    const members = familyMembersTemplates[family.name] || [
      { name: `${family.name.split(' ')[0]} Member`, role: 'Member', email: `member@example.com` },
    ];

    for (const member of members) {
      await supabase.from('family_members').insert({
        family_id: familyData.id,
        name: member.name,
        role: member.role,
        email: member.email,
      });
    }
    console.log(`     📋 Added ${members.length} members`);

    // Add a task
    await supabase.from('tasks').insert({
      family_id: familyData.id,
      advisor_id: userId,
      title: `Review ${family.name} quarterly report`,
      priority: 'high',
      completed: false,
      due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    });

    // Add a service
    await supabase.from('services').insert({
      family_id: familyData.id,
      advisor_id: userId,
      name: 'Family Governance Advisory',
      status: 'Active',
      progress: Math.floor(Math.random() * 80) + 20,
      price: '$15,000',
      start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    });

    // Add a consultation
    await supabase.from('consultations').insert({
      family_id: familyData.id,
      advisor_id: userId,
      title: 'Quarterly Strategy Review',
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: '10:00 AM',
      status: 'scheduled',
    });
    
    console.log(`     ✅ Added task, service, consultation`);
  }
}

async function seedNotifications(userId: string) {
  console.log(`\n🔔 Creating notifications`);
  
  const notifications = [
    { type: 'message', title: 'New message from Harrington Family', description: 'Clara sent you a message about the upcoming council meeting.' },
    { type: 'alert', title: 'Upcoming consultation', description: 'You have a scheduled meeting in 2 hours.' },
    { type: 'update', title: 'Document updated', description: 'Family constitution draft has been updated.' },
    { type: 'reminder', title: 'Task due soon', description: 'Review quarterly governance report is due tomorrow.' },
  ];

  for (const notification of notifications) {
    await supabase.from('notifications').insert({
      user_id: userId,
      type: notification.type,
      title: notification.title,
      description: notification.description,
      read: Math.random() > 0.5,
      created_at: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }
  
  console.log(`  ✅ Added ${notifications.length} notifications`);
}

async function main() {
  console.log('🚀 Starting test user creation...\n');
  console.log('=' .repeat(60));

  await fixTrigger();

  const createdUsers: Array<{ email: string; password: string; userId: string; role: string }> = [];

  for (const userData of testUsers) {
    const result = await createTestUser(userData);
    
    if (result) {
      createdUsers.push({
        email: userData.email,
        password: userData.password,
        userId: result.userId,
        role: result.role,
      });

      // Seed families and related data
      await seedFamiliesForUser(result.userId, result.role);

      // Seed notifications
      await seedNotifications(result.userId);
    }
  }

  console.log('\n' + '=' .repeat(60));
  console.log('\n✅ Test user creation completed!\n');
  
  console.log('📋 CREATED TEST USERS:');
  console.log('-'.repeat(60));
  
  for (const user of createdUsers) {
    console.log(`\n👤 ${user.role.toUpperCase()}`);
    console.log(`   Email:    ${user.email}`);
    console.log(`   Password: ${user.password}`);
    console.log(`   User ID:  ${user.userId}`);
  }
  
  console.log('\n' + '-'.repeat(60));
  console.log('\n✅ All users are ready to login!\n');
}

main().catch(console.error);
