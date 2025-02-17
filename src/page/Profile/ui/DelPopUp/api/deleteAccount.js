import { useState } from 'react';

export const useDeleteAccount = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteAccount = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('access token이 존재하지 않습니다.');
      }

      const response = await fetch('http://3.35.94.179/users/my', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('올바른 access token이 아님');
        } else if (response.status === 500) {
          throw new Error('내부 서버 에러');
        } else {
          let errorData = {};
          try {
            errorData = await response.json();
          } catch (e) {}
          throw new Error(errorData.message || '알 수 없는 에러가 발생했습니다.');
        }
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteAccount, loading, error };
};
