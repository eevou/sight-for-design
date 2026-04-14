import { useState, useEffect } from 'react';
import { AnalysisResult, getAnalysisResult } from '@/services/api';
import { mockAnalysisResult } from '@/data/mockData';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

export const useAnalysisResult = (id: string) => {
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (USE_MOCK) {
          // Simulate network delay
          await new Promise((r) => setTimeout(r, 500));
          setData(mockAnalysisResult);
        } else {
          const result = await getAnalysisResult(id);
          setData(result);
        }
      } catch (err) {
        console.error('Failed to fetch analysis result:', err);
        setError('Failed to load analysis result');
        // Fallback to mock data on error
        setData(mockAnalysisResult);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return { data, loading, error };
};
