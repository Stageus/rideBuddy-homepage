// hooks/useCenters.js
import { useState } from 'react';

const useCenters = () => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchCenters = async ({ longitude, latitude }) => {
    // 중복 요청 방지
    if (loading || !hasMore) return;
    setLoading(true);
    setError(null);

    const accessToken = localStorage.getItem('token');
    if (!accessToken) {
      setError('올바른 access token이 아님');
      setLoading(false);
      return;
    }

    // 페이지 번호를 동적으로 전달
    const requestBody = {
      page, // 이전 페이지 상태 사용
      longitude,
      latitude,
    };

    try {
      const response = await fetch('http://3.35.94.179/info/centers', {
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
        // 결과가 없으면 더 이상 불러올 데이터가 없다고 처리
        if (!resultArray || resultArray.length === 0) {
          setHasMore(false);
        } else {
          const transformedResults = resultArray.map(item => ({
            id: item.center_idx,
            name: item.center_name,
            address: item.center_address,
            distance: item.cal,
            latitude: item.latitude,   
            longitude: item.longitude, 
          }));

          // 기존 결과에 누적하여 추가
          setResults(prev => [...prev, ...transformedResults]);
          // 페이지 번호 증가
          setPage(prev => prev + 1);
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || '알 수 없는 오류가 발생했습니다.');
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 새 검색 시 결과 초기화: 페이지 번호도 초기화
  const resetResults = () => {
    setResults([]);
    setPage(0);
    setHasMore(true);
  };

  return { results, loading, error, fetchCenters, hasMore, resetResults};
};

export default useCenters;
