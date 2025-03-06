// src/page/FindPw/api/useFind_Pw.js
import { useState } from 'react';
import { validateUserId, validateEmail } from '../../../shared/util/validators';
import useEmailVerificationPw from '../../../shared/model/useEmailVerificationPw';

const useFind_Pw = () => {
  const [status, setStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const isAllFieldsRequiredError = (status === 400 && errorMessage === '모든 필드를 입력해주세요.');

  const {
    isEmailVerified,
    isVerificationSent,
    isEmailVisible,
    timeLeft,
    mailToken,
    handleEmailVerificationClick,
    confirmVerificationCode,
  } = useEmailVerificationPw(
    status,
    errorMessage,
    successMessage,
    setErrorMessage,
    setSuccessMessage,
    setStatus
  );

 
  const findPwClickEvent = ({ userId, email }) => {
    if (!userId && !email) {
      setStatus(400);
      setErrorMessage('모든 필드를 입력해주세요.');
      return;
    }

    const userIdError = validateUserId(userId);
    if (userIdError) {
      setStatus(400);
      setErrorMessage(userIdError);
      return;
    }

    const emailError = validateEmail(email);
    if (emailError) {
      setStatus(400);
      setErrorMessage(emailError);
      return;
    }

    if (!isEmailVerified) {
      setStatus(400);
      setErrorMessage('이메일 인증을 완료해주세요.');
      return;
    }


  };

  const resetFindPwForm = () => {
    setStatus(null);
    setErrorMessage('');
    setSuccessMessage('');
  };

  return {
    status,
    errorMessage,
    successMessage,
    findPwClickEvent,
    handleEmailVerificationClick,
    confirmVerificationCode,
    isVerificationSent,
    isEmailVerified,
    isEmailVisible,
    timeLeft,
    setErrorMessage,
    isAllFieldsRequiredError,
    resetFindPwForm,
    mailToken
  };
};

export default useFind_Pw;
