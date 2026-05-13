import { useState, useEffect, useCallback, useRef } from 'react';

export function useApi(fetchFn, userId, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const fetch = useCallback(async () => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const result = await fetchFn(userId);
      if (!controller.signal.aborted) {
        setData(result);
      }
    } catch (err) {
      if (!controller.signal.aborted) {
        setError(err.message || 'Something went wrong');
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, [userId, ...deps]);

  useEffect(() => {
    fetch();
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
