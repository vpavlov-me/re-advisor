import { unstable_cache } from "next/cache";
import { cache } from "react";
import { supabase } from "./supabaseClient";

// Cache tags for revalidation
export const CACHE_TAGS = {
  FAMILIES: "families",
  CONSULTATIONS: "consultations",
  MESSAGES: "messages",
  NOTIFICATIONS: "notifications",
  SERVICES: "services",
  LEARNING_PATHS: "learning-paths",
  PROFILE: "profile",
  TRANSACTIONS: "transactions",
} as const;

// Revalidate intervals (in seconds)
export const REVALIDATE = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
  DAY: 86400, // 24 hours
} as const;

/**
 * Cached fetch for families
 */
export const getCachedFamilies = unstable_cache(
  async (advisorId: string) => {
    const { data, error } = await supabase
      .from("families")
      .select(`
        id,
        name,
        status,
        created_at,
        member_count,
        total_wealth
      `)
      .eq("advisor_id", advisorId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },
  ["families"],
  {
    revalidate: REVALIDATE.MEDIUM,
    tags: [CACHE_TAGS.FAMILIES],
  }
);

/**
 * Cached fetch for services
 */
export const getCachedServices = unstable_cache(
  async (advisorId: string) => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("advisor_id", advisorId);

    if (error) throw error;
    return data;
  },
  ["services"],
  {
    revalidate: REVALIDATE.LONG,
    tags: [CACHE_TAGS.SERVICES],
  }
);

/**
 * Cached fetch for learning paths
 */
export const getCachedLearningPaths = unstable_cache(
  async () => {
    const { data, error } = await supabase
      .from("learning_paths")
      .select(`
        id,
        title,
        description,
        category,
        updated_at,
        author
      `)
      .order("updated_at", { ascending: false });

    if (error) throw error;
    return data;
  },
  ["learning-paths"],
  {
    revalidate: REVALIDATE.LONG,
    tags: [CACHE_TAGS.LEARNING_PATHS],
  }
);

/**
 * Cached fetch for single learning path
 */
export const getCachedLearningPath = unstable_cache(
  async (pathId: string) => {
    const { data, error } = await supabase
      .from("learning_paths")
      .select(`
        *,
        modules:learning_path_modules(
          id,
          title,
          description,
          duration,
          order,
          resources:learning_path_resources(*)
        )
      `)
      .eq("id", pathId)
      .single();

    if (error) throw error;
    return data;
  },
  ["learning-path"],
  {
    revalidate: REVALIDATE.MEDIUM,
    tags: [CACHE_TAGS.LEARNING_PATHS],
  }
);

/**
 * Cached fetch for dashboard stats
 */
export const getCachedDashboardStats = unstable_cache(
  async (advisorId: string) => {
    const [familiesCount, servicesCount, consultationsCount, revenueData] =
      await Promise.all([
        supabase
          .from("families")
          .select("*", { count: "exact", head: true })
          .eq("advisor_id", advisorId),
        supabase
          .from("services")
          .select("*", { count: "exact", head: true })
          .eq("advisor_id", advisorId),
        supabase
          .from("consultations")
          .select("*", { count: "exact", head: true })
          .eq("advisor_id", advisorId)
          .eq("status", "scheduled"),
        supabase
          .from("transactions")
          .select("amount")
          .eq("advisor_id", advisorId)
          .eq("type", "income"),
      ]);

    const revenue =
      revenueData.data?.reduce((acc, curr) => {
        const amount = parseFloat(
          curr.amount?.replace(/[^0-9.-]+/g, "") || "0"
        );
        return acc + amount;
      }, 0) || 0;

    return {
      familiesCount: familiesCount.count || 0,
      servicesCount: servicesCount.count || 0,
      consultationsCount: consultationsCount.count || 0,
      revenue,
    };
  },
  ["dashboard-stats"],
  {
    revalidate: REVALIDATE.SHORT,
    tags: [
      CACHE_TAGS.FAMILIES,
      CACHE_TAGS.SERVICES,
      CACHE_TAGS.CONSULTATIONS,
      CACHE_TAGS.TRANSACTIONS,
    ],
  }
);

/**
 * React cache for request-level deduplication
 * Use this for data that should be deduplicated within a single request
 */
export const getProfile = cache(async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
});

/**
 * React cache for current user
 */
export const getCurrentUser = cache(async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});
