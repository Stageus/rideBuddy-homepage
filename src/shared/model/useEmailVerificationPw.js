import { useState, useEffect } from 'react';
import useTimer from './useTimer';
import useVerifyMail from '../../page/SignUp/api/useVerifyMail';
import { validateVerificationCode } from '../util/validators';
import useSendMailToken from '../../page/FindPw/api/useSendMailToken';

const useEmailVerificationPw = (
  status,
  errorMessage,
  successMessage,
  setErrorMessage,
  setSuccessMessage,
  setStatus
) => {
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isEmailVisible, setIsEmailVisible] = useState(false);

  const { timeLeft, resetTimer } = useTimer(180, isEmailVisible);

  const {
    sendMailToken,
    loading: mailLoading,
    error: mailError,
    mailToken,
  } = useSendMailToken();

  const { verifyMail, loading: verifyLoading } = useVerifyMail();

  useEffect(() => {
    if (mailToken) console.log('mailToken:', mailToken);
    if (mailError) console.log('mailError:', mailError);
  }, [mailToken, mailError]);


const handleEmailVerificationClick = async (userId, email) => {
  const result = await sendMailToken(userId, email);

  if (result && result.error) {
    setStatus(400);
    setErrorMessage(result.error);
    return;
  }

  if (result && result.mailToken) {
    setIsVerificationSent(true);
    setErrorMessage('');
    setSuccessMessage('인증 코드가 발송되었습니다.');
    setIsEmailVisible(true);
    resetTimer();
  }
};



  const confirmVerificationCode = async (inputVerificationCode) => {
    const verificationError = validateVerificationCode(inputVerificationCode);
    if (verificationError) {
      setStatus(400);
      setErrorMessage(verificationError);
      return;
    }

    const result = await verifyMail(mailToken, inputVerificationCode);

    if (result.error) {
      setIsEmailVerified(false);
      setErrorMessage(result.error);
    } else if (result.success) {
      setIsEmailVerified(true);
      setSuccessMessage('이메일 인증이 완료되었습니다.');
      setErrorMessage('');
    }
  };

  return {
    isEmailVerified,
    isVerificationSent,
    isEmailVisible,
    timeLeft,
    mailLoading,
    verifyLoading,
    handleEmailVerificationClick,
    confirmVerificationCode,
    mailToken
  };
};

export default useEmailVerificationPw;
