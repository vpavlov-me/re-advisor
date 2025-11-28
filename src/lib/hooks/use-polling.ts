"use client";

import { useEffect, useRef, useCallback, useState } from "react";

interface UsePollingOptions {
  /** Interval in milliseconds (default: 30000 = 30 seconds) */
  interval?: number;
  /** Whether polling is enabled (default: true) */
  enabled?: boolean;
  /** Whether to run immediately on mount (default: true) */
  immediate?: boolean;
  /** Callback when an error occurs */
  onError?: (error: Error) => void;
}

/**
 * Hook for polling data at regular intervals
 */
export function usePolling<T>(
  fetchFn: () => Promise<T>,
  options: UsePollingOptions = {}
): {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  isPolling: boolean;
} {
  const {
    interval = 30000,
    enabled = true,
    immediate = true,
    onError,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState<Error | null>(null);
  const [isPolling, setIsPolling] = useState(enabled);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  const refresh = useCallback(async () => {
    if (!isMountedRef.current) return;
    
    try {
      setLoading(true);
      const result = await fetchFn();
      if (isMountedRef.current) {
        setData(result);
        setError(null);
      }
    } catch (err) {
      if (isMountedRef.current) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        onError?.(error);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [fetchFn, onError]);

  useEffect(() => {
    isMountedRef.current = true;

    if (immediate) {
      refresh();
    }

    if (enabled && interval > 0) {
      intervalRef.current = setInterval(refresh, interval);
      setIsPolling(true);
    }

    return () => {
      isMountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, interval, immediate, refresh]);

  return { data, loading, error, refresh, isPolling };
}

/**
 * Hook for visibility-based polling (only polls when tab is visible)
 */
export function useVisibilityPolling<T>(
  fetchFn: () => Promise<T>,
  options: UsePollingOptions = {}
): ReturnType<typeof usePolling<T>> {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return usePolling(fetchFn, {
    ...options,
    enabled: options.enabled !== false && isVisible,
  });
}

/**
 * Hook for focus-based refresh (refreshes when window gains focus)
 */
export function useFocusRefresh<T>(
  fetchFn: () => Promise<T>,
  options: Omit<UsePollingOptions, "interval"> = {}
): ReturnType<typeof usePolling<T>> & { lastRefreshTime: Date | null } {
  const [lastRefreshTime, setLastRefreshTime] = useState<Date | null>(null);
  const result = usePolling(fetchFn, { ...options, interval: 0, enabled: false });

  useEffect(() => {
    const handleFocus = () => {
      // Only refresh if last refresh was more than 5 seconds ago
      const now = new Date();
      if (!lastRefreshTime || now.getTime() - lastRefreshTime.getTime() > 5000) {
        result.refresh();
        setLastRefreshTime(now);
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [result, lastRefreshTime]);

  return { ...result, lastRefreshTime };
}

/**
 * Hook for stale-while-revalidate pattern
 */
export function useStaleWhileRevalidate<T>(
  fetchFn: () => Promise<T>,
  cacheKey: string,
  options: UsePollingOptions = {}
): ReturnType<typeof usePolling<T>> & { isStale: boolean } {
  const [isStale, setIsStale] = useState(false);
  const cacheRef = useRef<{ data: T; timestamp: number } | null>(null);

  const wrappedFetch = useCallback(async (): Promise<T> => {
    // Try to get from cache first
    if (cacheRef.current) {
      setIsStale(true);
    }

    const result = await fetchFn();
    cacheRef.current = { data: result, timestamp: Date.now() };
    setIsStale(false);
    return result;
  }, [fetchFn]);

  const result = usePolling(wrappedFetch, options);

  // Return cached data if available while loading
  const data = result.loading && cacheRef.current 
    ? cacheRef.current.data 
    : result.data;

  return { ...result, data, isStale };
}

/**
 * Auto-refresh button component props generator
 */
export function useAutoRefreshState(intervalMs: number = 30000) {
  const [secondsUntilRefresh, setSecondsUntilRefresh] = useState(Math.floor(intervalMs / 1000));
  const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] = useState(true);

  useEffect(() => {
    if (!isAutoRefreshEnabled) return;

    const countdown = setInterval(() => {
      setSecondsUntilRefresh((prev) => {
        if (prev <= 1) {
          return Math.floor(intervalMs / 1000);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [isAutoRefreshEnabled, intervalMs]);

  return {
    secondsUntilRefresh,
    isAutoRefreshEnabled,
    toggleAutoRefresh: () => setIsAutoRefreshEnabled((prev) => !prev),
    resetCountdown: () => setSecondsUntilRefresh(Math.floor(intervalMs / 1000)),
  };
}

/**
 * Create a refresh trigger that can be used to manually trigger refreshes
 */
export function useRefreshTrigger() {
  const [trigger, setTrigger] = useState(0);

  const refresh = useCallback(() => {
    setTrigger((prev) => prev + 1);
  }, []);

  return { trigger, refresh };
}
