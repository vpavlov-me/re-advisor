/**
 * Test script to verify portal functionality for authenticated users
 * Run with: npx tsx scripts/test-portal-authenticated.ts
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://yqgwdiuevgeufydbqjup.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZ3dkaXVldmdldWZ5ZGJxanVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2MDYyNDQsImV4cCI6MjA0ODE4MjI0NH0.UhYoFZq-usiJ-BTFBLTPuXpVWloDlSISFZPIYXlz6Vg";

// Service role key for admin access (testing only)
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Use service role for admin queries
const adminSupabase = SUPABASE_SERVICE_KEY 
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
  : null;

interface TestResult {
  name: string;
  passed: boolean;
  details: string;
}

const results: TestResult[] = [];

function logResult(name: string, passed: boolean, details: string) {
  results.push({ name, passed, details });
  const emoji = passed ? "✅" : "❌";
  console.log(`${emoji} ${name}: ${details}`);
}

async function testUserLogin() {
  console.log("\n📋 Testing User Login Flow...\n");
  
  // Test with a known test user
  const testEmail = "test.advisor@test.com";
  const testPassword = "TestPassword123!";
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: testEmail,
      password: testPassword
    });
    
    if (error) {
      // This is expected if the test user doesn't exist
      logResult("Login (test user)", false, `Expected - test user may not exist: ${error.message}`);
      return null;
    }
    
    logResult("Login (test user)", true, `Logged in as ${data.user?.email}`);
    return data.user;
  } catch (err) {
    logResult("Login (test user)", false, `Error: ${err}`);
    return null;
  }
}

async function testProfileAccess(userId: string) {
  console.log("\n📋 Testing Profile Access...\n");
  
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    
    if (error) {
      logResult("Profile fetch", false, `Error: ${error.message}`);
      return null;
    }
    
    logResult("Profile fetch", true, `Profile found: ${data.email}, Status: ${data.profile_status}`);
    return data;
  } catch (err) {
    logResult("Profile fetch", false, `Error: ${err}`);
    return null;
  }
}

async function testNotificationPreferences(userId: string) {
  console.log("\n📋 Testing Notification Preferences Access...\n");
  
  try {
    const { data, error } = await supabase
      .from("notification_preferences")
      .select("*")
      .eq("user_id", userId)
      .single();
    
    if (error) {
      logResult("Notification preferences fetch", false, `Error: ${error.message}`);
      return null;
    }
    
    logResult("Notification preferences fetch", true, 
      `Settings: push=${data.push_enabled}, email=${data.email_enabled}`);
    return data;
  } catch (err) {
    logResult("Notification preferences fetch", false, `Error: ${err}`);
    return null;
  }
}

async function testFamiliesAccess(userId: string) {
  console.log("\n📋 Testing Families Access...\n");
  
  try {
    const { data, error } = await supabase
      .from("families")
      .select(`
        id, name, status,
        members:family_members(id, name, role)
      `)
      .eq("advisor_id", userId);
    
    if (error) {
      logResult("Families fetch", false, `Error: ${error.message}`);
      return null;
    }
    
    logResult("Families fetch", true, `Found ${data?.length || 0} families`);
    return data;
  } catch (err) {
    logResult("Families fetch", false, `Error: ${err}`);
    return null;
  }
}

async function testNotificationsAccess(userId: string) {
  console.log("\n📋 Testing Notifications Access...\n");
  
  try {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(10);
    
    if (error) {
      logResult("Notifications fetch", false, `Error: ${error.message}`);
      return null;
    }
    
    logResult("Notifications fetch", true, `Found ${data?.length || 0} notifications`);
    return data;
  } catch (err) {
    logResult("Notifications fetch", false, `Error: ${err}`);
    return null;
  }
}

async function testProfileUpdate(userId: string) {
  console.log("\n📋 Testing Profile Update...\n");
  
  try {
    // First get current profile
    const { data: current } = await supabase
      .from("profiles")
      .select("bio")
      .eq("id", userId)
      .single();
    
    const testBio = `Test bio updated at ${new Date().toISOString()}`;
    
    const { error } = await supabase
      .from("profiles")
      .update({ bio: testBio })
      .eq("id", userId);
    
    if (error) {
      logResult("Profile update", false, `Error: ${error.message}`);
      return false;
    }
    
    // Verify update
    const { data: updated } = await supabase
      .from("profiles")
      .select("bio")
      .eq("id", userId)
      .single();
    
    if (updated?.bio === testBio) {
      logResult("Profile update", true, "Bio updated successfully");
      
      // Restore original bio
      await supabase
        .from("profiles")
        .update({ bio: current?.bio || "" })
        .eq("id", userId);
        
      return true;
    } else {
      logResult("Profile update", false, "Update didn't persist");
      return false;
    }
  } catch (err) {
    logResult("Profile update", false, `Error: ${err}`);
    return false;
  }
}

async function testCredentialsTable(userId: string) {
  console.log("\n📋 Testing Credentials Access...\n");
  
  try {
    const { data, error } = await supabase
      .from("credentials")
      .select("*")
      .eq("advisor_id", userId);
    
    if (error) {
      logResult("Credentials fetch", false, `Error: ${error.message}`);
      return null;
    }
    
    logResult("Credentials fetch", true, `Found ${data?.length || 0} credentials`);
    return data;
  } catch (err) {
    logResult("Credentials fetch", false, `Error: ${err}`);
    return null;
  }
}

async function testExpertiseTable(userId: string) {
  console.log("\n📋 Testing Expertise Access...\n");
  
  try {
    const { data, error } = await supabase
      .from("expertise")
      .select("*")
      .eq("advisor_id", userId);
    
    if (error) {
      logResult("Expertise fetch", false, `Error: ${error.message}`);
      return null;
    }
    
    logResult("Expertise fetch", true, `Found ${data?.length || 0} expertise areas`);
    return data;
  } catch (err) {
    logResult("Expertise fetch", false, `Error: ${err}`);
    return null;
  }
}

// Test with admin access to verify data exists
async function verifyDataWithAdmin() {
  if (!adminSupabase) {
    console.log("\n⚠️  No service role key provided - skipping admin verification\n");
    return;
  }
  
  console.log("\n📋 Admin Verification (bypassing RLS)...\n");
  
  // Check recent users
  const { data: users } = await adminSupabase
    .from("profiles")
    .select("id, email, profile_status, joined_date")
    .order("joined_date", { ascending: false })
    .limit(5);
  
  console.log("Recent profiles:");
  users?.forEach(u => {
    console.log(`  - ${u.email}: ${u.profile_status}, joined: ${u.joined_date}`);
  });
  
  // Check notification preferences
  const { data: prefs } = await adminSupabase
    .from("notification_preferences")
    .select("user_id, push_enabled, email_enabled")
    .limit(5);
  
  console.log(`\nNotification preferences: ${prefs?.length || 0} records`);
}

async function runAllTests() {
  console.log("🚀 Starting Portal Authentication Tests\n");
  console.log("=".repeat(50));
  
  // First verify data exists via admin
  await verifyDataWithAdmin();
  
  // Try to login with test user
  const user = await testUserLogin();
  
  if (!user) {
    console.log("\n⚠️  Could not login with test user. Creating a new test user...\n");
    
    // Try to sign up a new test user
    const testEmail = `test.portal.${Date.now()}@test.com`;
    const testPassword = "TestPassword123!";
    
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: {
        data: {
          first_name: "Test",
          last_name: "Portal"
        }
      }
    });
    
    if (signUpError) {
      console.log(`❌ Could not create test user: ${signUpError.message}`);
      console.log("\n📋 Running tests with existing user data via SQL...\n");
      
      // Use admin to get a valid user ID
      if (adminSupabase) {
        const { data: existingUser } = await adminSupabase
          .from("profiles")
          .select("id")
          .limit(1)
          .single();
        
        if (existingUser) {
          console.log(`Using existing user ID: ${existingUser.id}`);
          
          // These tests will fail due to RLS, but we can verify the structure
          await testProfileAccess(existingUser.id);
          await testNotificationPreferences(existingUser.id);
          await testFamiliesAccess(existingUser.id);
          await testNotificationsAccess(existingUser.id);
          await testCredentialsTable(existingUser.id);
          await testExpertiseTable(existingUser.id);
        }
      }
    } else if (signUpData.user) {
      console.log(`✅ Created test user: ${testEmail}`);
      
      // Wait for triggers to complete
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Login with new user
      const { data: loginData } = await supabase.auth.signInWithPassword({
        email: testEmail,
        password: testPassword
      });
      
      if (loginData?.user) {
        const userId = loginData.user.id;
        
        // Run all tests
        await testProfileAccess(userId);
        await testNotificationPreferences(userId);
        await testFamiliesAccess(userId);
        await testNotificationsAccess(userId);
        await testProfileUpdate(userId);
        await testCredentialsTable(userId);
        await testExpertiseTable(userId);
        
        // Cleanup - sign out
        await supabase.auth.signOut();
      }
    }
  } else {
    const userId = user.id;
    
    // Run all tests
    await testProfileAccess(userId);
    await testNotificationPreferences(userId);
    await testFamiliesAccess(userId);
    await testNotificationsAccess(userId);
    await testProfileUpdate(userId);
    await testCredentialsTable(userId);
    await testExpertiseTable(userId);
    
    // Sign out
    await supabase.auth.signOut();
  }
  
  // Summary
  console.log("\n" + "=".repeat(50));
  console.log("📊 Test Summary\n");
  
  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;
  
  console.log(`Total: ${results.length} tests`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  
  if (failed > 0) {
    console.log("\n Failed tests:");
    results.filter(r => !r.passed).forEach(r => {
      console.log(`  - ${r.name}: ${r.details}`);
    });
  }
  
  console.log("\n");
}

runAllTests().catch(console.error);
