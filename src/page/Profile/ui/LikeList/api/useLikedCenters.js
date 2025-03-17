import { useState, useEffect, useCallback } from 'react';

const API_URL = 'http://3.35.94.179/mypages/centers/like-list';

const useLikedCenters = (page) => {
  const [data, setData] = useState([]); // 기존 데이터를 유지하며 추가
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터가 있는지 확인

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
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ page }),
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
      const newData = jsonResponse.result || [];
      setData((prev) => [...prev, ...newData]); // 기존 데이터에 새 데이터 추가
      setHasMore(newData.length > 0); // 데이터가 더 있는지 확인
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchLikedCenters();
  }, [fetchLikedCenters]);

  return { data, loading, error, hasMore };
};

export default useLikedCenters;