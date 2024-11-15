// useEmailVerification.js
import { useState } from 'react';
import { validateEmail, validateVerificationCode } from '../utill/validators';
import useVerificationCode from './useVerificationCode';
import useTimer from '../../../shared/model/useTimer';

const useEmailVerification = (status,errorMessage,successMessage,setErrorMessage,setSuccessMessage,setStatus ) => {
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isEmailVisible, setIsEmailVisible] = useState(false);
  const { verificationCode, generateVerificationCode, setVerificationCode } = useVerificationCode();
  const { timeLeft, resetTimer } = useTimer(180, isEmailVisible);

  const handleEmailVerificationClick = (email) => {
    const error = validateEmail(email);
    if (error) {
      setStatus(400);
      setErrorMessage(error);
      return;
    }

    generateVerificationCode();
    setIsVerificationSent(true);
    setErrorMessage('');
    setSuccessMessage('인증 코드가 발송되었습니다.');
    setIsEmailVisible(true);
    resetTimer();
  };

  const confirmVerificationCode = (inputVerificationCode) => {
    const error = validateVerificationCode(inputVerificationCode);
    if (error) {
      setStatus(400);
      setErrorMessage(error);
      return;
    }

    if (inputVerificationCode === verificationCode) {
      setIsEmailVerified(true);
      setSuccessMessage('이메일 인증이 완료되었습니다.');
      setErrorMessage('');
    } else {
      setIsEmailVerified(false);
      setErrorMessage('인증 코드가 일치하지 않습니다.');
    }
  };

  return {
    isEmailVerified,
    isVerificationSent,
    isEmailVisible,
    status,
    errorMessage,
    successMessage,
    timeLeft,
    handleEmailVerificationClick,
    confirmVerificationCode,
  };
};

export default useEmailVerification;
