import { useState, useEffect, useCallback } from 'react';

const API_URL = 'http://3.35.94.179/mypages/centers/like-list';

const useLikedCenters = (page = 0) => {
  const [data, setData] = useState([]);      
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLikedCenters = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Access token not found');
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ page })
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        if (response.status === 400) {
          throw new Error(errorResponse.message || '페이지 값 정규표현식 에러');
        } else if (response.status === 401) {
          throw new Error(errorResponse.message || '올바른 access token이 아님');
        } else if (response.status === 500) {
          throw new Error(errorResponse.message || '내부서버에러');
        } else {
          throw new Error('예상치 못한 에러 발생');
        }
      }

      const jsonResponse = await response.json();
      setData(jsonResponse.result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchLikedCenters();
  }, [fetchLikedCenters]);

  return { data, loading, error, refetch: fetchLikedCenters };
};

export default useLikedCenters;
