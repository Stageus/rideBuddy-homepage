// useRegisterApi.js
import { useCallback } from 'react';

const useRegister = () => {
  /**
   * 회원가입 API 호출 함수
   * @param {Object} userData - 회원가입 데이터 { mail_token, id, pw, name, mail }
   * @returns {Promise<{status: number, data: Object}>} - 응답 상태와 데이터를 반환
   */
  const registerUser = useCallback(async userData => {
    try {
      const response = await fetch('http://3.35.94.179/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      return { status: response.status, data };
    } catch (error) {
      return {
        status: 500,
        data: { message: '서버와의 통신 중 오류가 발생했습니다.' },
      };
    }
  }, []);

  return { registerUser };
};

export default useRegister;
