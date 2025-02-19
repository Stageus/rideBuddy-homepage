import { useState } from 'react';

function useProfileList() {
  const [profileList, setProfileList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfileList = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('인증 토큰이 없습니다. 로그인 후 이용해주세요.');
      }

      const response = await fetch('http://3.35.94.179/mypages/profile/list', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        let data = {};
        try {
          data = await response.json();
        } catch (err) {
        }

        if (response.status === 401) {
          throw new Error(data.message || '올바른 access token이 아님');
        } else if (response.status === 500) {
          throw new Error(data.message || '서버 내부 에러');
        } else {
          throw new Error(data.message || '프로필 리스트 불러오기 실패');
        }
      }

      const result = await response.json();
      console.log('[useProfileList] 서버 응답:', result);

      setProfileList(result.result || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    profileList,
    isLoading,
    error,
    fetchProfileList,
  };
}

export default useProfileList;
