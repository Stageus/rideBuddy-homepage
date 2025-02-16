// useIdDuplicationCheck.js
import { useState } from 'react';
import { validateUserId } from '../util/validators';
import useCheckId from '../../page/SignUp/api/useCheckId';

const useIdDuplicationCheck = (status, errorMessage, successMessage, setErrorMessage, setSuccessMessage, setStatus) => {
  const [isIdConfirmed, setIsIdConfirmed] = useState(false);
  const { checkId } = useCheckId();

  const checkIdDuplication = async userId => {
    // 클라이언트 단 유효성 검사
    const error = validateUserId(userId);
    if (error) {
      setStatus(400);
      setErrorMessage(error);
      setIsIdConfirmed(false);
      return;
    }

    // API 호출로 중복 체크 진행
    const { status: responseStatus, data } = await checkId(userId);

    if (responseStatus === 200) {
      setStatus(null);
      setErrorMessage('');
      setSuccessMessage('사용 가능한 아이디입니다.');
      setIsIdConfirmed(true);
    } else if (responseStatus === 400) {
      setStatus(400);
      setErrorMessage('올바른 형식이 아닙니다.');
      setSuccessMessage('');
      setIsIdConfirmed(false);
    } else if (responseStatus === 409) {
      setStatus(409);
      setErrorMessage('이미 사용중인 아이디입니다.');
      setSuccessMessage('');
      setIsIdConfirmed(false);
    } else {
      // 500 또는 기타 에러 상황 처리
      setStatus(responseStatus);
      setErrorMessage('서버 오류가 발생했습니다.');
      setSuccessMessage('');
      setIsIdConfirmed(false);
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
