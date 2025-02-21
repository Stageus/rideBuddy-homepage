import { useState, useCallback } from 'react';

const useFetchInfoPin = () => {
  const [data, setData] = useState(null); // API 성공 시 응답 데이터 저장
  const [error, setError] = useState(null); // API 호출 시 발생한 에러 메시지 저장
  const [loading, setLoading] = useState(false); // 로딩 상태

  // sw, ne 객체는 각각 { longitude: number, latitude: number } 형태여야 합니다.
  const fetchInfoPin = useCallback(async (sw, ne) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      // 로컬스토리지에서 access token 추출
      const token = localStorage.getItem('token');
      if (!token) {
        setError("올바른 access token이 아님");
        setLoading(false);
        return;
      }
      
      const payload = {
        sw: {
          longitude: sw.longitude,
          latitude: sw.latitude
        },
        ne: {
          longitude: ne.longitude,
          latitude: ne.latitude
        }
      };

      const response = await fetch('http://3.35.94.179/info/pin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const json = await response.json();
        // 응답 스펙에 따르면 응답 데이터는 json.body.result 에 담겨야 합니다.
        // 만약 다른 형태로 온다면 json.result 또는 json.resultData를 사용합니다.
        const result = json?.body?.result || json.result || json.resultData;
        setData(result);
      } else {
        // 응답 상태 코드 400, 401, 500 등의 경우 에러 메시지를 설정
        const errJson = await response.json();
        setError(errJson.message || '알 수 없는 에러 발생');
      }
    } catch (err) {
      console.error(err);
      setError('내부 서버 에러');
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, loading, fetchInfoPin };
};

export default useFetchInfoPin;
