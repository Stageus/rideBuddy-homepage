// hooks/useRoads.js
import { useState } from 'react';

const useRoads = () => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRoads = async ({ longitude, latitude }) => {
    setLoading(true);
    setError(null);

    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      setError("올바른 access token이 아님");
      setLoading(false);
      return;
    }

    const requestBody = {
      page: page, 
      longitude,
      latitude,
    };

    try {
      const response = await fetch('http://3.35.94.179/info/roads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        // 여기서 roads_name을 name으로 매핑
        const transformedResults = data.body.result.map(item => ({
          id: item.roads_point_idx,
          name: item.roads_name, // 추가된 부분
          ...item,
        }));

        setResults(prev => [...prev, ...transformedResults]);
        setPage(prev => prev + 1);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "알 수 없는 오류가 발생했습니다.");
      }
    } catch (err) {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, fetchRoads };
};

export default useRoads;
