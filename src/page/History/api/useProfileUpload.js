// hooks/useProfileUpload.js
import { useState } from 'react';

function useProfileUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadProfile = async (file) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('로그인이 필요합니다.');
      }

      if (!file) {
        throw new Error('첨부된 파일이 없음.');
      }

      const formData = new FormData();
      formData.append('profile', file);

      const response = await fetch('http://3.35.94.179/mypages/profile', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        let errorData = {};
        try {
          errorData = await response.json();
        } catch (_) {}

        if (response.status === 400) {
          throw new Error(errorData.message || '올바른 확장자가 아님');
        } else if (response.status === 401) {
          throw new Error(errorData.message || '올바른 access token이 아님');
        } else if (response.status === 500) {
          throw new Error(errorData.message || '서버 내부 에러');
        } else {
          throw new Error(errorData.message || '업로드 실패');
        }
      }

      return await response.json();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    uploadProfile,
    isLoading,
    error,
  };
}

export default useProfileUpload;
