import { useState } from 'react';
import { mailRegex } from '../../../assets/regex';

const useSendMail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mailToken, setMailToken] = useState(null);

  const sendMail = async email => {
    setLoading(true);
    setError(null);
    setMailToken(null);

    if (!mailRegex.test(email)) {
      const errMsg = '이메일 형식이 올바르지 않습니다.';
      setError(errMsg);
      setLoading(false);
      return { error: errMsg };
    }

    try {
      const response = await fetch('http://3.35.94.179/users/mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mail: email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '메일 전송 실패');
      }

      setMailToken(data.mail_token);
      return { mailToken: data.mail_token };
    } catch (err) {
      setError(err.message);
      console.log(err.message);
      return { error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { sendMail, loading, error, mailToken };
};

export default useSendMail;
