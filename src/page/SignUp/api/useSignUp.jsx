import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { idRegex, mailRegex, nameRegex, pwRegex, codeRegex } from '../../../assets/regex';

const useSignUp = () => {
  const [status, setStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isIdConfirmed, setIsIdConfirmed] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const navigate = useNavigate();

  const generateVerificationCode = () => {
    const generatedCode = '588393';
    setVerificationCode(generatedCode);
    setErrorMessage('');
    setSuccessMessage('인증 코드가 발송되었습니다.');
    setIsEmailVerified(false);
    console.log(`발급된 인증 코드: ${generatedCode}`);
  };

  const handleVerifyClick = (email) => {
    if (!email || !mailRegex.test(email)) {
      setStatus(400);
      setErrorMessage('이메일 형식을 확인해주세요.');
      return false;
    }
    generateVerificationCode();
    setIsVerificationSent(true);
    setErrorMessage('');
    setSuccessMessage('인증 코드가 발송되었습니다.');
    return true;
  };

  const checkIdDuplication = (userId) => {
    if (!userId || !idRegex.test(userId)) {
      setStatus(400);
      setErrorMessage('아이디 형식을 확인해주세요.');
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

  const confirmVerificationCode = (inputVerificationCode) => {
    if (!inputVerificationCode) {
      setStatus(400);
      setErrorMessage('인증 코드를 입력해주세요.');
      return;
    }

    if (!codeRegex.test(inputVerificationCode)) {
      setStatus(400);
      setErrorMessage('인증 코드는 6자리 숫자여야 합니다.');
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

  const signupClickEvent = ({ name, userId, password, confirmPassword, email, inputVerificationCode }) => {
    if (!name && !userId && !password && !confirmPassword && !email && !inputVerificationCode) {
      setStatus(400);
      setErrorMessage('모든 필드를 입력해주세요.');
      return;
    }

    if (!name || !nameRegex.test(name)) {
      setStatus(400);
      setErrorMessage('이름 형식을 확인해주세요.');
      return;
    }

    if (!userId || !idRegex.test(userId)) {
      setStatus(400);
      setErrorMessage('아이디 형식을 확인해주세요.');
      return;
    }

    if (!password || !pwRegex.test(password)) {
      setStatus(400);
      setErrorMessage('비밀번호 형식을 확인해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      setStatus(400);
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!email || !mailRegex.test(email)) {
      setStatus(400);
      setErrorMessage('이메일 형식을 확인해주세요.');
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
    setIsIdConfirmed(false);
    setIsEmailVerified(false);
    setIsVerificationSent(false);
    setVerificationCode('');
  };

  return {
    status,
    setStatus,
    errorMessage,
    setErrorMessage,
    successMessage,
    signupClickEvent,
    handleVerifyClick,
    checkIdDuplication,
    confirmVerificationCode,
    isIdConfirmed,
    isVerificationSent,
    isEmailVerified,
  };
};

export default useSignUp;
