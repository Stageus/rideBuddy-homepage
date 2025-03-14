import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { searchResultsState } from '../../../../../shared/recoil/atoms/atomState';


const useSearchResults = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const setSearchResults = useSetRecoilState(searchResultsState);

  const search = async ({ search, page: requestedPage, longitude, latitude, append = false }) => {
    const pageNumber = Number.isInteger(requestedPage) ? requestedPage : 0;
    const longitudeValue = longitude ? Number(longitude) : 127.0;
    const latitudeValue = latitude ? Number(latitude) : 37.5;

    setError(null);
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("올바른 access token이 아님");
      setLoading(false);
      console.log("🚫 Token 없음");
      return;
    }

    try {
      const payload = { search, page: pageNumber, longitude: longitudeValue, latitude: latitudeValue };
      const response = await fetch("http://3.35.94.179/info/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        const apiData = result.resultData || result.data || [];
        setSearchResults(prev => {
          const newData = append ? [...prev, ...apiData] : apiData;
          return newData;
        });
        setPage(pageNumber);
        setHasMore(apiData.length > 0);
      } else {
        const result = await response.json();
        console.error("API 요청 실패:", result);
        setError(
          response.status === 400 || response.status === 401
            ? result.message
            : response.status === 500
            ? "내부 서버 에러"
            : "알 수 없는 오류 발생"
        );
        setHasMore(false);
      }
    } catch (err) {
      console.error("네트워크 오류 발생:", err);
      setError("네트워크 오류가 발생했습니다.");
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, search, hasMore, page };
};

export default useSearchResults;