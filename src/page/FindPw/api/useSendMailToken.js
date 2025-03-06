import { useState, useCallback } from "react";

const useSendMailToken = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mailToken, setMailToken] = useState(null);

  const sendMailToken = useCallback(async (id, mail) => {
    setLoading(true);
    setError(null);
    setMailToken(null);

    // Validation
    const idRegex = /^[a-zA-Z]{1,20}$/;
    const mailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,30}$/;

    if (!idRegex.test(id)) {
      setError("id에서 정규표현식 에러");
      setLoading(false);
      return;
    }

    if (!mailRegex.test(mail)) {
      setError("mail에서 정규표현식 에러");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://3.35.94.179/users/mail/withId", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, mail }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setMailToken(data.mail_token);
        return { mailToken: data.mail_token };
      } else if (response.status === 400) {
        setError(data.message);
        return { error: data.message };
      } else if (response.status === 404) {
        setError("해당하는 계정이 없음.");
        return { error: "해당하는 계정이 없음." };
      } else if (response.status === 500) {
        setError("sendMail 실패");
        return { error: "sendMail 실패" };
      } else {
        setError("알 수 없는 오류 발생");
        return { error: "알 수 없는 오류 발생" };
      }
    } catch (err) {
      setError("네트워크 오류 발생");
      return { error: "네트워크 오류 발생" };
    } finally {
      setLoading(false);
    }
  }, []);

  return { sendMailToken, loading, error, mailToken };
};

export default useSendMailToken;
