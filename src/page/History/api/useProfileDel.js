import { useState } from 'react';

const useDeleteProfileImage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteProfileImage = async (img_idx) => {
    setLoading(true);
    setError(null);

    // img_idx 정규표현식 검증: 숫자만 포함되어야 함
    const regex = /^\d+$/;
    if (!regex.test(String(img_idx))) {
      const errorMsg = 'img_idx에서 정규표현식 에러';
      setError(errorMsg);
      setLoading(false);
      throw new Error(errorMsg);
    }

    // 로컬스토리지에서 토큰 가져오기
    const token = localStorage.getItem('token');
    if (!token) {
      const errorMsg = '인증 토큰이 없습니다.';
      setError(errorMsg);
      setLoading(false);
      throw new Error(errorMsg);
    }

    try {
      const response = await fetch('http://3.35.94.179/mypages/profile', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ img_idx }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '에러가 발생했습니다.');
      }

      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return { deleteProfileImage, loading, error };
};

export default useDeleteProfileImage;
