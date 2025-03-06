import { useState } from 'react';

function useChangePassword() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  /**
   * @param {string} mailToken
   * @param {string} pw 
   */

  const changePassword = async (mailToken, pw) => {
    setLoading(true);
    setErrorMsg('');
    setSuccess(false);

    try {
      const response = await fetch('http://3.35.94.179/users/change-pw', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mail_token: mailToken,
          pw,
        }),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        const data = await response.json();

        switch (response.status) {
          case 400:
            setErrorMsg(data.message || '정규표현식 에러가 발생했습니다.');
            break;
          case 401:
            setErrorMsg(data.message || 'mail_token이 유효하지 않습니다.');
            break;
          case 403:
            setErrorMsg(data.message || 'mail_token이 인증되지 않았습니다.');
            break;
          case 500:
          default:
            setErrorMsg(data.message || '서버 오류가 발생했습니다.');
            break;
        }
      }
    } catch (error) {
      console.error(error);
      setErrorMsg('네트워크 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return { changePassword, loading, errorMsg, success };
}

export default useChangePassword;
