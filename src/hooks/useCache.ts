import { useState, useEffect, useCallback } from "react";

interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

interface UseCacheOptions {
  ttl?: number; // Time to live in milliseconds (default: 5 minutes)
  staleWhileRevalidate?: boolean; // Return stale data while fetching fresh data
}

export const useCache = <T>(
  key: string,
  fetcher: () => Promise<T>,
  options: UseCacheOptions = {}
) => {
  const { ttl = 5 * 60 * 1000, staleWhileRevalidate = true } = options;
  
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastFetched, setLastFetched] = useState<number>(0);

  // Get cache from localStorage
  const getCachedData = useCallback((): CacheItem<T> | null => {
    try {
      const cached = localStorage.getItem(`cache_${key}`);
      if (!cached) return null;
      
      const item: CacheItem<T> = JSON.parse(cached);
      
      // Check if cache is expired
      if (Date.now() > item.expiry) {
        localStorage.removeItem(`cache_${key}`);
        return null;
      }
      
      return item;
    } catch {
      return null;
    }
  }, [key]);

  // Set cache in localStorage
  const setCachedData = useCallback((data: T) => {
    try {
      const item: CacheItem<T> = {
        data,
        timestamp: Date.now(),
        expiry: Date.now() + ttl
      };
      localStorage.setItem(`cache_${key}`, JSON.stringify(item));
    } catch (error) {
      console.warn('Failed to cache data:', error);
    }
  }, [key, ttl]);

  // Fetch fresh data
  const fetchData = useCallback(async (useStale = false) => {
    if (!useStale) {
      setLoading(true);
    }
    setError(null);

    try {
      const freshData = await fetcher();
      setData(freshData);
      setCachedData(freshData);
      setLastFetched(Date.now());
      return freshData;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      if (!useStale) {
        setLoading(false);
      }
    }
  }, [fetcher, setCachedData]);

  // Check if data is stale
  const isStale = useCallback(() => {
    return Date.now() - lastFetched > ttl;
  }, [lastFetched, ttl]);

  // Refresh data (force refetch)
  const refresh = useCallback(() => {
    return fetchData(false);
  }, [fetchData]);

  // Invalidate cache
  const invalidate = useCallback(() => {
    localStorage.removeItem(`cache_${key}`);
    setData(null);
    setLastFetched(0);
  }, [key]);

  // Initial load
  useEffect(() => {
    const cachedItem = getCachedData();
    
    if (cachedItem) {
      // Use cached data
      setData(cachedItem.data);
      setLastFetched(cachedItem.timestamp);
      
      // If stale-while-revalidate is enabled and data is stale, fetch fresh data
      if (staleWhileRevalidate && Date.now() - cachedItem.timestamp > ttl) {
        fetchData(true); // Fetch in background
      }
    } else {
      // No cache, fetch fresh data
      fetchData(false);
    }
  }, [key, getCachedData, fetchData, ttl, staleWhileRevalidate]);

  return {
    data,
    loading,
    error,
    isStale: isStale(),
    refresh,
    invalidate,
    lastFetched: new Date(lastFetched)
  };
};