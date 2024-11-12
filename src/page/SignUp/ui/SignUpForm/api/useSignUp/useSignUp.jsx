import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { idRegex, mailRegex, nameRegex, pwRegex, codeRegex } from '../../../../../../assets/regex';

const useSignup = () => {
  const [status, setStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [succesMessage, setSuccesMessage] = useState('');
  const [isIdConfirmed, setIsIdConfirmed] = useState(false); // 아이디 중복 확인 상태
  const [isEmailVerified, setIsEmailVerified] = useState(false); // 이메일 인증 상태
  const [isVerificationSent, setIsVerificationSent] = useState(false); // 인증 코드 발송 상태
  const [verificationCode, setVerificationCode] = useState(''); // 발급된 인증 코드
  const navigate = useNavigate();

  const generateVerificationCode = () => {
    const generatedCode = '588393'; // 고정된 코드로 설정 (예시)
    setVerificationCode(generatedCode);
    setErrorMessage(''); // 초기화
    setSuccesMessage('인증 코드가 발송되었습니다.');
    setIsEmailVerified(false); // 이메일 인증을 재시작하므로 초기화
    console.log(`발급된 인증 코드: ${generatedCode}`); // 디버그 용도
  };

  // 이메일 인증 요청 함수
  const handleVerifyEmail = (email) => {
    if (!email || !mailRegex.test(email)) {
      setStatus(400);
      setErrorMessage('이메일 형식을 확인해주세요.');
      return;
    }
    generateVerificationCode();
    setIsVerificationSent(true);
    setErrorMessage('');
  };

  // 아이디 중복 확인 로직
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
      setSuccesMessage('사용 가능한 아이디입니다.');
      setIsIdConfirmed(true);
    }
  };

  // 이메일 인증 코드 확인 함수
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
      setSuccesMessage('이메일 인증이 완료되었습니다.');
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

    // 개별 필드 검증
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

    // 아이디 중복 확인 여부
    if (!isIdConfirmed) {
      setStatus(400);
      setErrorMessage('아이디 중복 확인을 완료해주세요.');
      return;
    }

    // 이메일 인증 코드 검증
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

    if (inputVerificationCode !== verificationCode) {
      setStatus(400);
      setErrorMessage('인증 코드가 일치하지 않습니다.');
      return;
    } else {
      setIsEmailVerified(true);
    }

    // 서버 오류 예시 처리
    if (userId === 'ServerError') {
      setStatus(500);
      setErrorMessage('서버 내부 오류가 발생했습니다.');
    } else {
      setStatus(201);
      setErrorMessage('');
      setSuccesMessage('회원가입이 완료되었습니다.');
      resetSignupForm();
      navigate('/Login');
    }
  };

  // 가입 후 초기화 함수
  const resetSignupForm = () => {
    setStatus(null);
    setErrorMessage('');
    setSuccesMessage('');
    setIsIdConfirmed(false);
    setIsEmailVerified(false);
    setIsVerificationSent(false);
    setVerificationCode('');
  };

  return {
    status,
    errorMessage,
    succesMessage,
    signupClickEvent,
    handleVerifyEmail,
    checkIdDuplication,
    confirmVerificationCode,
    isIdConfirmed,
    isVerificationSent,
    isEmailVerified,
  };
};

export default useSignup;
