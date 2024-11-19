import { useState } from 'react';
import useEmailVerification from '../../../shared/model/useEmailVerification';
import { validateEmail, validateName } from '../../../shared/util/validators';

const useFind_Id = () => {
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

  const findIdClickEvent = ({ name, email }) => {
    if (!name || !email) {
      setStatus(400);
      setErrorMessage('모든 필드를 입력해주세요.');
      return;
    }

    const nameError = validateName(name);
    if (nameError) {
      setStatus(400);
      setErrorMessage(nameError);
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

    // 실제 아이디 찾기 로직 구현
    if (email === 'example@example.com') {
      setStatus(200);
      setErrorMessage('');
      setSuccessMessage(`아이디는 'user123'입니다.`);
    } else {
      setStatus(404);
      setErrorMessage('등록된 이메일이 없습니다.');
    }
  };

  const resetFindIdForm = () => {
    setStatus(null);
    setErrorMessage('');
    setSuccessMessage('');
  };

  return {
    status,
    errorMessage,
    successMessage,
    findIdClickEvent,
    handleEmailVerificationClick,
    confirmVerificationCode,
    isVerificationSent,
    isEmailVerified,
    isEmailVisible,
    timeLeft,
    setErrorMessage,
    isAllFieldsRequiredError,
    resetFindIdForm,
  };
};

export default useFind_Id;
