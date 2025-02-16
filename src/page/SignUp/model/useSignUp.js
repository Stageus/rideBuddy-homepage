// useSignUp.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useEmailVerification from '../../../shared/model/useEmailVerification';
import useIdDuplicationCheck from '../../../shared/model/useIdDuplicationCheck';
import { validateName, validatePassword, validateEmail, validateUserId } from '../../../shared/util/validators';
import useRegister from '../api/useRegister';

const useSignUp = () => {
  const [status, setStatus] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const isAllFieldsRequiredError = status === 400 && errorMessage === '모든 필드를 입력해주세요.';
  const navigate = useNavigate();

  const {
    isEmailVerified,
    isVerificationSent,
    isEmailVisible,
    timeLeft,
    handleEmailVerificationClick,
    confirmVerificationCode,
    mailToken,
  } = useEmailVerification(status, errorMessage, successMessage, setErrorMessage, setSuccessMessage, setStatus);

  const { isIdConfirmed, checkIdDuplication, resetIdDuplicationCheck } = useIdDuplicationCheck(
    status,
    errorMessage,
    successMessage,
    setErrorMessage,
    setSuccessMessage,
    setStatus,
  );

  const { registerUser } = useRegister();

  const signupClickEvent = async ({ name, userId, password, confirmPassword, email }) => {
    if (!name || !userId || !password || !confirmPassword || !email) {
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

    const userIdError = validateUserId(userId);
    if (userIdError) {
      setStatus(400);
      setErrorMessage(userIdError);
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setStatus(400);
      setErrorMessage(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setStatus(400);
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    const emailError = validateEmail(email);
    if (emailError) {
      setStatus(400);
      setErrorMessage(emailError);
      return;
    }

    if (!isIdConfirmed) {
      setStatus(400);
      setErrorMessage('아이디 중복 확인을 완료해주세요.');
      return;
    }

    if (!isEmailVerified) {
      setStatus(400);
      setErrorMessage('이메일 인증을 완료해주세요.');
      return;
    }

    const payload = {
      mail_token: mailToken,
      id: userId,
      pw: password,
      name: name,
      mail: email,
    };

    const { status: apiStatus, data } = await registerUser(payload);
    console.log('회원가입 API 응답:', { apiStatus, data }); // <-- 이 부분 추가

    if (apiStatus === 200) {
      setStatus(200);
      setErrorMessage('');
      setSuccessMessage('회원가입이 완료되었습니다.');
      resetSignupForm();
      navigate('/Login');
    } else if (apiStatus === 400) {
      setStatus(400);
      setErrorMessage('입력하신 정보 중 일부가 올바르지 않습니다.');
      setSuccessMessage('');
    } else if (apiStatus === 401) {
      setStatus(401);
      setErrorMessage('이메일 인증 토큰이 유효하지 않습니다.');
      setSuccessMessage('');
    } else if (apiStatus === 403) {
      setStatus(403);
      setErrorMessage('이메일 인증이 올바르게 진행되지 않았습니다.');
      setSuccessMessage('');
    } else if (apiStatus === 409) {
      setStatus(409);
      // API에서 id와 mail 중 어느 항목이 중복되었는지 구분할 수 있다면 조건 분기로 메시지 지정
      // 예시로 id 중복인 경우:
      setErrorMessage('이미 사용중인 아이디입니다.');
      setSuccessMessage('');
    } else {
      setStatus(apiStatus);
      setErrorMessage('서버 내부 오류가 발생했습니다.');
      setSuccessMessage('');
    }
  };

  const resetSignupForm = () => {
    setStatus(null);
    setErrorMessage('');
    setSuccessMessage('');
    resetIdDuplicationCheck();
  };

  return {
    status,
    errorMessage,
    successMessage,
    signupClickEvent,
    handleEmailVerificationClick,
    confirmVerificationCode,
    checkIdDuplication,
    isIdConfirmed,
    isVerificationSent,
    isEmailVerified,
    isEmailVisible,
    timeLeft,
    setErrorMessage,
    isAllFieldsRequiredError,
  };
};

export default useSignUp;
