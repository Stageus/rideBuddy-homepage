// useIdDuplicationCheck.js
import { useState } from 'react';
import { validateUserId } from '../util/validators';


const useIdDuplicationCheck = (status, errorMessage, successMessage, setErrorMessage, setSuccessMessage, setStatus) => {
  const [isIdConfirmed, setIsIdConfirmed] = useState(false);

  const checkIdDuplication = userId => {
    const error = validateUserId(userId);
    if (error) {
      setStatus(400);
      setErrorMessage(error);
      setIsIdConfirmed(false);
      return;
    }

    if (userId === 'User') {
      setStatus(409);
      setErrorMessage('이미 사용 중인 아이디입니다.');
      setIsIdConfirmed(false);
    } else {
      setStatus(null);
      setErrorMessage('');
      setSuccessMessage('사용 가능한 아이디입니다.');
      setIsIdConfirmed(true);
    }
  };

  const resetIdDuplicationCheck = () => {
    setIsIdConfirmed(false);
    setStatus(null);
    setErrorMessage('');
    setSuccessMessage('');
  };

  return {
    isIdConfirmed,
    status,
    errorMessage,
    successMessage,
    checkIdDuplication,
    resetIdDuplicationCheck,
  };
};

export default useIdDuplicationCheck;
