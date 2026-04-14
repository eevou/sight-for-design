import { useState, useEffect } from 'react';
import { HistoryItem, getAnalysisHistory } from '@/services/api';
import { mockHistory } from '@/data/mockData';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

export const useAnalysisHistory = () => {
  const [data, setData] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (USE_MOCK) {
          await new Promise((r) => setTimeout(r, 500));
          setData(mockHistory);
        } else {
          const result = await getAnalysisHistory();
          setData(result);
        }
      } catch (err) {
        console.error('Failed to fetch history:', err);
        setError('Failed to load history');
        setData(mockHistory);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};
