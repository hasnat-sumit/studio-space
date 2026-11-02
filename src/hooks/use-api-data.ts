"use client";

import { useCallback, useEffect, useState } from "react";
import { ApiError } from "@/lib/api/client";

export interface ApiDataState<T> {
  /** The latest good data; kept during a reload so the page doesn't flicker. */
  data: T | null;
  error: ApiError | null;
  isLoading: boolean;
  reload: () => void;
}

/**
 * Loads data once on mount, with an explicit `reload()` for after mutations.
 * `load` must be stable: a module-level function or a `useCallback`.
 */
export function useApiData<T>(load: () => Promise<T>): ApiDataState<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let ignore = false;

    load()
      .then((result) => {
        if (ignore) return;
        setData(result);
        setError(null);
      })
      .catch((cause: unknown) => {
        if (ignore) return;
        setError(
          cause instanceof ApiError
            ? cause
            : new ApiError("Something went wrong. Please try again.")
        );
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [load, version]);

  const reload = useCallback(() => setVersion((current) => current + 1), []);

  return { data, error, isLoading, reload };
}
