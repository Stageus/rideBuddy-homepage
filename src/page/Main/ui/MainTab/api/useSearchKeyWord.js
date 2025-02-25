import { useState } from 'react';

const useSearchKeyWord = () => {
  const [data, setData] = useState(null);       
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(null);      

  const searchKeyWord = async (searchTerm) => {
    const regex = /^[가-힣]{2,20}$/;
    if (!regex.test(searchTerm)) {
      if (searchTerm.length < 2) {
        setError("검색어는 2글자 이상이어야 합니다.");
      } else {
        setError("search에서 정규표현식 에러");
      }
      return;
    }

    setError(null);
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("올바른 access token이 아님");
      setLoading(false);
      return;
    }

    try {
      const searchPayload = { search: searchTerm };
      const response = await fetch("http://3.35.94.179/info/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(searchPayload)
      });

      if (response.ok) {
        const result = await response.json();
        setData(result.Data);
      } else if (response.status === 400 || response.status === 401) {
        const result = await response.json();
        setError(result.message);
      } else if (response.status === 500) {
        setError("내부 서버 에러");
      } else {
        setError("알 수 없는 오류 발생");
      }
    } catch (err) {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, searchKeyWord };
};

export default useSearchKeyWord;
