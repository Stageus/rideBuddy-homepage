// hooks/useCenters.js
import { useState } from 'react';

const useCenters = () => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0); // 초기 페이지 값(필요시 조정)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchCenters = async ({ longitude, latitude }) => {
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
        // 실제 응답: { "resultData": [ { "center_idx": ..., "center_name": ... }, ... ] }
        const resultArray = data.resultData;
        if (!resultArray || resultArray.length === 0) {
          // 더 이상 데이터가 없거나 null일 경우
          setHasMore(false);
        } else {
          // 필드명을 UI에 맞게 변환
          const transformedResults = resultArray.map(item => ({
            id: item.center_idx,
            name: item.center_name,
            address: item.center_address,
            distance: item.cal, // cal -> distance (km)
          }));

          // 기존 데이터에 추가 (무한 스크롤 고려 시)
          setResults(prev => [...prev, ...transformedResults]);
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

  // resetResults 함수 추가: 결과와 페이지 상태를 초기화
  const resetResults = () => {
    setResults([]);
    setPage(0); // 초기 페이지 값(필요에 따라 0 또는 다른 값으로 변경)
    setHasMore(true);
  };

  return { results, loading, error, fetchCenters, hasMore, resetResults };
};

export default useCenters;
