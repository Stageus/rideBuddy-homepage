import { useState } from 'react';

const useLikeCenters = () => {
  const [likeCount, setLikeCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const likeCenter = async (centerIdx) => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");

    if (!token) {
      setError("로그인이 필요합니다.");
      setLoading(false);
      return;
    }

    // 센터 좋아요 API 엔드포인트 (요청 스펙에 맞게 수정)
    const url = `http://3.35.94.179/info/centers/${centerIdx}/like`;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const contentType = response.headers.get('Content-Type');
      const responseText = await response.text();

      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`예상치 못한 응답 형식: ${contentType || '알 수 없음'}`);
      }

      const data = JSON.parse(responseText);

      if (response.ok) {
        // API 명세에 따른 key: "center likeCount"
        setLikeCount(data["center likeCount"]);
        return data;
      } else {
        switch (response.status) {
          case 400:
            setError(data.message || "centerIdx에서 정규표현식 에러");
            break;
          case 401:
            setError(data.message || "올바른 access token이 아님");
            break;
          case 404:
            setError(data.message || "알맞은 centerIdx값이 아님.");
            break;
          case 500:
            setError("내부 서버 오류가 발생했습니다.");
            break;
          default:
            setError(`서버 오류 ${response.status}: ${data.message || '알 수 없음'}`);
        }
      }
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        setError('서버에 연결할 수 없습니다. 네트워크 상태를 확인하세요.');
      } else if (err.message.includes('예상치 못한 응답 형식')) {
        setError('서버가 HTML을 반환했습니다. API 설정을 확인하세요.');
      } else {
        setError(err.message || '알 수 없는 오류가 발생했습니다.');
      }
      console.error('좋아요 API 호출 중 에러:', err);
    } finally {
      setLoading(false);
    }
  };

  return { likeCount, loading, error, likeCenter, setLikeCount };
};

export default useLikeCenters;
