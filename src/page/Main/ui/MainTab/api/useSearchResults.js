import { useState } from 'react';

const useSearchResults = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async ({ search, page, longitude, latitude }) => {
    const searchString = search
      ? String(search).trim().replace(/\s/g, "")
      : "";

    console.log("📡 변환된 검색어:", searchString);

    const pageNumber = Number.isInteger(page) ? page : 0;

    const longitudeValue = longitude ? Number(longitude) : 127.0; 
    const latitudeValue = latitude ? Number(latitude) : 37.5;     

    console.log("📡 API 요청 파라미터:", {
      search: searchString,
      page: pageNumber,
      longitude: longitudeValue,
      latitude: latitudeValue,
    });

    setError(null);
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("올바른 access token이 아님");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        search: searchString,
        page: pageNumber,
        longitude: longitudeValue,
        latitude: latitudeValue,
      };

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
        console.log("✅ API 응답 데이터:", result);

        if (result.resultData) {
          setData(result.resultData);
        } else {
          setError("올바른 데이터 형식이 아님");
        }
      } else {
        const result = await response.json();
        console.error("API 요청 실패:", result);

        if (response.status === 400 || response.status === 401) {
          setError(result.message);
        } else if (response.status === 500) {
          setError("내부 서버 에러");
        } else {
          setError("알 수 없는 오류 발생");
        }
      }
    } catch (err) {
      console.error("네트워크 오류 발생:", err);
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, search };
};

export default useSearchResults;
