import { useState } from 'react';
import useEmailVerification from '../../../shared/model/useEmailVerification';
import { validateEmail, validateName } from '../../../shared/util/validators';
import useFindIdAPI from './useFindIdAPI';

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
  } = useEmailVerification(
    status,
    errorMessage,
    successMessage,
    setErrorMessage,
    setSuccessMessage,
    setStatus
  );

  // API 훅에서 findId 함수를 받아옴
  const { findId } = useFindIdAPI();

  const findIdClickEvent = async ({ name, email }) => {
    // 필드 검증
    if (!name && !email) {
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

    // API 호출 (로컬 테스트 로직 제거)
    try {
      const response = await findId({ name, mail: email });
      console.log('findId API response:', response); // 응답 결과 디버그 로그
      if (response.status === 200) {
        setStatus(200);
        setErrorMessage('');
        setSuccessMessage(`아이디는 '${response.data.id}'입니다.`);
      } else {
        console.log('API responded with error:', response);
        setStatus(response.status);
        setErrorMessage(response.data.message);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error during findId API call:', error); // 에러 디버그 로그
      setStatus(500);
      setErrorMessage('내부 서버 에러');
      setSuccessMessage('');
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
