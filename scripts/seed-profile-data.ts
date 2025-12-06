import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const TARGET_EMAIL = 'v.pavlov@reluna.com';

async function seedProfileData() {
  console.log('🌱 Starting profile data seeding...\n');

  try {
    // Get user by email
    const { data: authUser, error: authError } = await supabase.auth.admin.listUsers();
    if (authError) throw authError;

    const user = authUser.users.find(u => u.email === TARGET_EMAIL);
    if (!user) {
      console.error(`❌ User with email ${TARGET_EMAIL} not found`);
      process.exit(1);
    }

    console.log(`✅ Found user: ${user.email} (ID: ${user.id})\n`);

    // 1. Update Profile with detailed bio
    console.log('📝 Updating profile information...');
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        first_name: 'Vladimir',
        last_name: 'Pavlov',
        title: 'Senior Financial Advisor & Wealth Management Specialist',
        bio: `With over 15 years of experience in financial advisory and wealth management, I specialize in helping individuals and families achieve their long-term financial goals. My approach combines comprehensive financial planning with personalized investment strategies tailored to each client's unique circumstances.

I hold multiple certifications including CFP®, CFA®, and ChFC®, and have successfully managed portfolios exceeding $500M in assets. My expertise spans retirement planning, tax optimization, estate planning, and risk management.

I believe in building lasting relationships with my clients based on trust, transparency, and results. Whether you're planning for retirement, saving for your children's education, or building generational wealth, I'm here to guide you every step of the way.

Outside of work, I'm passionate about financial literacy education and regularly conduct workshops for young professionals and families. I'm also an active member of the Financial Planning Association and frequently contribute to industry publications.`,
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        timezone: 'America/Los_Angeles',
        company: 'Reluna Financial Group',
        website: 'https://reluna.com',
        linkedin: 'https://linkedin.com/in/vladimirpavlov',
        twitter: 'https://twitter.com/vladimirpavlov'
      })
      .eq('id', user.id);

    if (profileError) throw profileError;
    console.log('✅ Profile updated\n');

    // 2. Add Experience entries
    console.log('💼 Adding work experience...');
    const experiences = [
      {
        advisor_id: user.id,
        role: 'Senior Financial Advisor',
        company: 'Reluna Financial Group',
        start_date: '2018-01-01',
        end_date: null,
        is_current: true,
        description: 'Lead advisor managing high-net-worth client portfolios. Specialize in comprehensive wealth management, retirement planning, and tax-efficient investment strategies. Consistently exceed performance benchmarks and maintain 98% client retention rate.',
        location: 'San Francisco, CA',
        display_order: 1
      },
      {
        advisor_id: user.id,
        role: 'Financial Advisor',
        company: 'Morgan Stanley Wealth Management',
        start_date: '2014-06-01',
        end_date: '2017-12-31',
        is_current: false,
        description: 'Provided comprehensive financial planning services to individual and family clients. Managed investment portfolios averaging $5M. Developed expertise in estate planning and intergenerational wealth transfer strategies.',
        location: 'New York, NY',
        display_order: 2
      },
      {
        advisor_id: user.id,
        role: 'Associate Financial Advisor',
        company: 'Charles Schwab',
        start_date: '2010-08-01',
        end_date: '2014-05-31',
        is_current: false,
        description: 'Assisted senior advisors in portfolio management and client relationship development. Conducted financial analysis and research. Built foundation in investment strategies and financial planning principles.',
        location: 'San Francisco, CA',
        display_order: 3
      }
    ];

    for (const exp of experiences) {
      const { error } = await supabase.from('experience').insert(exp);
      if (error) console.error('Error adding experience:', error);
    }
    console.log(`✅ Added ${experiences.length} experience entries\n`);

    // 3. Add Education entries
    console.log('🎓 Adding education...');
    const education = [
      {
        advisor_id: user.id,
        degree: 'Master of Business Administration (MBA)',
        institution: 'Stanford Graduate School of Business',
        field_of_study: 'Finance & Investments',
        start_year: '2008',
        end_year: '2010',
        grade: '3.9 GPA',
        description: 'Concentrated in Finance with focus on portfolio management and corporate finance. Dean\'s List all semesters. Member of Finance Club and Investment Society.',
        display_order: 1
      },
      {
        advisor_id: user.id,
        degree: 'Bachelor of Science in Economics',
        institution: 'University of California, Berkeley',
        field_of_study: 'Economics',
        start_year: '2004',
        end_year: '2008',
        grade: 'Summa Cum Laude',
        description: 'Graduated with highest honors. Thesis on behavioral finance and investor decision-making. President of Economics Student Association.',
        display_order: 2
      }
    ];

    for (const edu of education) {
      const { error } = await supabase.from('education').insert(edu);
      if (error) console.error('Error adding education:', error);
    }
    console.log(`✅ Added ${education.length} education entries\n`);

    // 4. Add Skills
    console.log('🛠️ Adding skills...');
    const skills = [
      'Financial Planning',
      'Wealth Management',
      'Portfolio Management',
      'Retirement Planning',
      'Estate Planning',
      'Tax Optimization',
      'Risk Management',
      'Investment Strategy',
      'Asset Allocation',
      'Client Relationship Management',
      'Financial Analysis',
      'Market Research',
      'Regulatory Compliance',
      'Trust & Estate Administration',
      'Alternative Investments'
    ];

    for (let i = 0; i < skills.length; i++) {
      const { error } = await supabase.from('skills').insert({
        advisor_id: user.id,
        name: skills[i],
        proficiency: i < 5 ? 'expert' : i < 10 ? 'intermediate' : 'beginner',
        display_order: i + 1
      });
      if (error) console.error('Error adding skill:', error);
    }
    console.log(`✅ Added ${skills.length} skills\n`);

    // 5. Add Recommendations
    console.log('⭐ Adding recommendations...');
    const recommendations = [
      {
        advisor_id: user.id,
        author_name: 'Sarah Mitchell',
        author_title: 'CEO',
        author_company: 'TechStart Ventures',
        relationship: 'Former Client',
        rating: 5,
        text: 'Vladimir has been instrumental in helping me navigate complex financial decisions during my company\'s growth phase. His expertise in tax-efficient strategies saved me over $200K last year alone. He\'s not just knowledgeable - he truly cares about his clients\' success and takes time to explain every recommendation. I\'ve referred several colleagues to him, and they all echo my sentiments. Highly recommend!',
        is_featured: true,
        is_visible: true,
        display_order: 1
      },
      {
        advisor_id: user.id,
        author_name: 'Dr. James Chen',
        author_title: 'Chief Medical Officer',
        author_company: 'Bay Area Medical Center',
        relationship: 'Current Client',
        rating: 5,
        text: 'As a busy physician, I needed someone I could trust completely with my financial future. Vladimir has exceeded all expectations. He developed a comprehensive plan that addressed my retirement, my children\'s education, and estate planning. His proactive communication and transparent approach give me complete peace of mind. Worth every penny!',
        is_featured: true,
        is_visible: true,
        display_order: 2
      },
      {
        advisor_id: user.id,
        author_name: 'Emily Rodriguez',
        author_title: 'VP of Marketing',
        author_company: 'Fortune 500 Tech Company',
        relationship: 'Current Client',
        rating: 5,
        text: 'Working with Vladimir transformed my approach to wealth management. He helped me restructure my portfolio during the market volatility and our returns have been exceptional. What I appreciate most is his educational approach - I now understand the "why" behind every investment decision. He\'s a true partner in building my financial future.',
        is_featured: true,
        is_visible: true,
        display_order: 3
      },
      {
        advisor_id: user.id,
        author_name: 'Michael Thompson',
        author_title: 'Retired Executive',
        author_company: 'Previously at Goldman Sachs',
        relationship: 'Current Client',
        rating: 5,
        text: 'After 30 years in finance myself, I\'m very selective about who I trust with my wealth. Vladimir stands out for his integrity, deep knowledge, and strategic thinking. He\'s helped my wife and I optimize our retirement income while minimizing tax burden. His estate planning recommendations have also ensured our legacy is protected for future generations.',
        is_featured: false,
        is_visible: true,
        display_order: 4
      },
      {
        advisor_id: user.id,
        author_name: 'Lisa Anderson',
        author_title: 'Entrepreneur',
        author_company: 'Anderson Design Studio',
        relationship: 'Former Client',
        rating: 5,
        text: 'Vladimir helped me through a complex business exit and the subsequent wealth management. His guidance on diversification and tax planning was invaluable. He\'s patient, explains everything in plain English, and always puts my interests first. Couldn\'t ask for a better advisor!',
        is_featured: false,
        is_visible: true,
        display_order: 5
      }
    ];

    for (const rec of recommendations) {
      const { error } = await supabase.from('recommendations').insert(rec);
      if (error) console.error('Error adding recommendation:', error);
    }
    console.log(`✅ Added ${recommendations.length} recommendations\n`);

    // 6. Add Expertise areas
    console.log('🎯 Adding expertise areas...');
    const expertiseAreas = [
      'Retirement Planning',
      'Investment Management',
      'Tax Planning',
      'Estate Planning',
      'Risk Management',
      'College Savings',
      'Business Succession Planning',
      'Charitable Giving Strategies'
    ];

    for (let i = 0; i < expertiseAreas.length; i++) {
      const { error } = await supabase.from('expertise').insert({
        advisor_id: user.id,
        area: expertiseAreas[i],
        display_order: i + 1
      });
      if (error && !error.message.includes('duplicate')) {
        console.error('Error adding expertise:', error);
      }
    }
    console.log(`✅ Added ${expertiseAreas.length} expertise areas\n`);

    console.log('🎉 Profile data seeding completed successfully!\n');
    console.log('📊 Summary:');
    console.log(`   - Profile updated with detailed bio`);
    console.log(`   - ${experiences.length} work experiences`);
    console.log(`   - ${education.length} education entries`);
    console.log(`   - ${skills.length} professional skills`);
    console.log(`   - ${recommendations.length} client recommendations`);
    console.log(`   - ${expertiseAreas.length} expertise areas`);
    console.log('\n✅ You can now test the filled UI at http://localhost:3000/profile');

  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
}

// Run the seeder
seedProfileData();
