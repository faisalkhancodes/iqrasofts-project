import { useState, useCallback } from 'react';

/**
 * Custom hook for API calls with loading and error states
 * Handles common API operation patterns
 */
export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (url, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json', ...options.headers },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      return { data, ok: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(message);
      return { data: null, ok: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  return { request, loading, error, setError };
}
