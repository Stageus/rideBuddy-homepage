// useCheckIdApi.js
import { useCallback } from 'react';

const useCheckId = () => {
  const checkId = useCallback(async userId => {
    try {
      const response = await fetch('http://3.35.94.179/users/duplicate-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userId }),
      });
      const data = await response.json();
      return { status: response.status, data };
    } catch (error) {
      // 네트워크 오류 등 예외 상황 처리
      return { status: 500, data: { message: '서버와의 통신 중 오류가 발생했습니다.' } };
    }
  }, []);

  return { checkId };
};

export default useCheckId;
