import { useState } from 'react';

export default function useChangePw() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const changePw = async (pw) => {
    setIsLoading(true);
    setErrorMessage('');
    setIsSuccess(false);

    try {
      const token = localStorage.getItem('token'); 

      if (!token) {
        setErrorMessage('토큰이 존재하지 않습니다.');
        setIsLoading(false);
        return;
      }

      const response = await fetch('http://3.35.94.179/users/change-pw/mypages', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ pw }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        const data = await response.json();

        switch (response.status) {
          case 400:
            setErrorMessage(data?.message || '비밀번호 형식 오류');
            break;
          case 401:
            setErrorMessage(data?.message || '인증 실패');
            break;
          case 403:
            setErrorMessage(data?.message || '권한 없음');
            break;
          case 500:
            setErrorMessage('서버 에러가 발생했습니다.');
            break;
          default:
            setErrorMessage('알 수 없는 에러가 발생했습니다.');
            break;
        }
      }
    } catch (error) {
      setErrorMessage(error?.message || '요청 처리 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isSuccess,
    errorMessage,
    changePw,
  };
}
