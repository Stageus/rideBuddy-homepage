import { useState, useCallback } from 'react';

const useFindIdAPI = () => {
  const [id, setId] = useState(null);
  const [status, setStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const findId = useCallback(async ({ name, mail }) => {
    setLoading(true);
    setStatus(null);
    setErrorMessage('');
    setId(null);

    try {
      const response = await fetch('http://3.35.94.179/users/find-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, mail }),
      });

      const data = await response.json();

      if (response.ok) {
        // Response 200
        setId(data.id);
        setStatus(200);
        return { status: 200, data }; 
      } else if (response.status === 400) {
        // Response 400: 정규표현식 에러
        setStatus(400);
        setErrorMessage(data.message);
        return { status: 400, data };
      } else if (response.status === 404) {
        // Response 404: 해당하는 id를 찾을 수 없음
        setStatus(404);
        setErrorMessage(data.message);
        return { status: 404, data };
      } else {
        // 그 외 에러(500 등)
        setStatus(500);
        setErrorMessage('내부 서버 에러');
        return { status: 500, data: { message: '내부 서버 에러' } };
      }
    } catch (error) {
      setStatus(500);
      setErrorMessage('내부 서버 에러');
      console.error('Error in useFindIdAPI:', error);
      return { status: 500, data: { message: '내부 서버 에러' } };
    } finally {
      setLoading(false);
    }
  }, []);

  const resetFindId = useCallback(() => {
    setId(null);
    setStatus(null);
    setErrorMessage('');
  }, []);

  return {
    id,
    status,
    errorMessage,
    loading,
    findId,
    resetFindId,
  };
};

export default useFindIdAPI;
