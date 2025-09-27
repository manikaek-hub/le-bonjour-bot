import { useState, useCallback } from "react";

export interface LoadingStates {
  [key: string]: boolean;
}

export const useLoadingState = (initialStates: LoadingStates = {}) => {
  const [loadingStates, setLoadingStates] = useState<LoadingStates>(initialStates);

  const setLoading = useCallback((key: string, loading: boolean) => {
    setLoadingStates(prev => ({ ...prev, [key]: loading }));
  }, []);

  const isLoading = useCallback((key: string) => {
    return !!loadingStates[key];
  }, [loadingStates]);

  const isAnyLoading = useCallback(() => {
    return Object.values(loadingStates).some(loading => loading);
  }, [loadingStates]);

  const withLoading = useCallback(
    async <T>(key: string, asyncFunction: () => Promise<T>): Promise<T> => {
      setLoading(key, true);
      try {
        const result = await asyncFunction();
        return result;
      } finally {
        setLoading(key, false);
      }
    },
    [setLoading]
  );

  return {
    loadingStates,
    setLoading,
    isLoading,
    isAnyLoading,
    withLoading,
  };
};