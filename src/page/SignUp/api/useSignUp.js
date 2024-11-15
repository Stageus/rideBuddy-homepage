// useSignUp.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateName, validatePassword, validateEmail, validateUserId } from '../utill/validators';
import useEmailVerification from '../model/useEmailVerification';
import useIdDuplicationCheck from '../model/useIdDuplicationCheck';


const useSignUp = () => {
  const [status, setStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const {
    isEmailVerified,
    isVerificationSent,
    isEmailVisible,
    timeLeft,
    handleEmailVerificationClick,
    confirmVerificationCode,
  } = useEmailVerification(status,errorMessage,successMessage,setErrorMessage,setSuccessMessage,setStatus );

  const {
    isIdConfirmed,
    checkIdDuplication,
    resetIdDuplicationCheck,
  } = useIdDuplicationCheck(status,errorMessage,successMessage,setErrorMessage,setSuccessMessage,setStatus);

  const signupClickEvent = ({ name, userId, password, confirmPassword, email }) => {
    if (!name && !userId && !password && !confirmPassword && !email) {
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

    if (userId === 'ServerError') {
      setStatus(500);
      setErrorMessage('서버 내부 오류가 발생했습니다.');
    } else {
      setStatus(201);
      setErrorMessage('');
      setSuccessMessage('회원가입이 완료되었습니다.');
      resetSignupForm();
      navigate('/Login');
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
    setErrorMessage
  };
};

export default useSignUp;
