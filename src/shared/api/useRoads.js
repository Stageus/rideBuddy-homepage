// hooks/useRoads.js
import { useState } from 'react';

const useRoads = () => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchRoads = async ({ longitude, latitude }) => {
    if (loading || !hasMore) return;
    setLoading(true);
    setError(null);

    const accessToken = localStorage.getItem('token');
    if (!accessToken) {
      setError('올바른 access token이 아님');
      setLoading(false);
      return;
    }

    const requestBody = {
      page,
      longitude,
      latitude,
    };

    try {
      const response = await fetch('http://3.35.94.179/info/roads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        const resultArray = data.resultData;
        if (!resultArray || resultArray.length === 0) {
          setHasMore(false);
        } else {
          const transformedResults = resultArray.map(item => ({
            id: item.road_point_idx,
            name: item.road_name,
            address: item.road_address,
            distance: item.cal,
            type: item.road_type,
          }));

          setResults(prev => [...prev, ...transformedResults]);
          setPage(prev => prev + 1);
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || '알 수 없는 오류 발생');
      }
    } catch (err) {
      setError('네트워크 오류 발생');
    } finally {
      setLoading(false);
    }
  };

  const resetResults = () => {
    setResults([]);
    setPage(0);
    setHasMore(true);
  };

  return { results, loading, error, fetchRoads, hasMore, resetResults };
};

export default useRoads;
