import { useState, useEffect } from 'react';
import { AuthorInfo, AuthorInfoResponse } from '../types';

// 防重复请求标志
let isLoading = false;

export const useAuthorInfo = () => {
  const [authorInfo, setAuthorInfo] = useState<AuthorInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 如果正在加载中，避免重复请求
    if (isLoading) {
      setLoading(true);
      return;
    }

    const fetchAuthorInfo = async () => {
      try {
        isLoading = true;
        setLoading(true);
        setError(null);
        
        // API端点地址
        const response = await fetch('https://rambot.ai-mindflicker.com/api/v1/author/author-info');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: AuthorInfoResponse = await response.json();
        
        if (data.success) {
          setAuthorInfo(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch author info');
        }
      } catch (err) {
        console.error('Error fetching author info:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        isLoading = false;
        setLoading(false);
      }
    };

    fetchAuthorInfo();
  }, []);

  return { authorInfo, loading, error };
};
