// useLoginApi.js
import { useCallback } from 'react';

const useLoginApi = () => {
  const loginUser = useCallback(async (id, pw) => {
    const credentials = { id, pw };
    try {
      const response = await fetch('http://3.35.94.179/users/login/local', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      return { status: response.status, data };
    } catch (error) {
      return { status: 500, data: { message: '서버 내부 에러가 발생했습니다.' } };
    }
  }, []);

  return { loginUser };
};

export default useLoginApi;
