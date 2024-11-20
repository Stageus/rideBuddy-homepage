import { useState } from 'react';
import useEmailVerification from '../../../shared/model/useEmailVerification';
import { validateUserId, validateEmail } from '../../../shared/util/validators';

const useFind_Pw = () => {
  const [status, setStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const isAllFieldsRequiredError = status === 400 && errorMessage === '모든 필드를 입력해주세요.';

  const {
    isEmailVerified,
    isVerificationSent,
    isEmailVisible,
    timeLeft,
    handleEmailVerificationClick,
    confirmVerificationCode,
  } = useEmailVerification(status, errorMessage, successMessage, setErrorMessage, setSuccessMessage, setStatus);

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

    if (userId === 'user123' && email === 'example@example.com') {
      setStatus(200);
      setErrorMessage('');
      setSuccessMessage(`임시 비밀번호는 'tempPassword123!'입니다.`);
    } else {
      setStatus(404);
      setErrorMessage('등록된 사용자 정보가 없습니다.');
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
  };
};

export default useFind_Pw;
