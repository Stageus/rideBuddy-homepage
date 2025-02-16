import { useState } from 'react';
import { codeRegex } from '../../../assets/regex';

const useVerifyMail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const verifyMail = async (mailToken, inputVerificationCode) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    // 인증 코드 형식 검증 (정규표현식: /^[0-9]{6}$/)
    if (!codeRegex.test(inputVerificationCode.toString())) {
      const errMsg = '인증 코드 형식이 올바르지 않습니다.';
      setError(errMsg);
      setLoading(false);
      return { error: errMsg };
    }

    try {
      // POST 요청으로 body에 데이터를 담아 전송
      const response = await fetch('http://3.35.94.179/users/mail/check', {
        method: 'POST', // GET -> POST로 변경
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mail_token: mailToken.toString(), // 토큰을 문자열로 변환하여 전달
          code: Number(inputVerificationCode), // 인증 코드를 숫자로 전달
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '메일 인증 실패');
      }

      setSuccess(true);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { verifyMail, loading, error, success };
};

export default useVerifyMail;
