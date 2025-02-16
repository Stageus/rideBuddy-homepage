import { useState, useEffect } from 'react';
import useVerificationCode from './useVerificationCode';
import useTimer from './useTimer';
import useSendMail from '../../page/SignUp/api/useSendMail';
import useVerifyMail from '../../page/SignUp/api/useVerifyMail';
import { validateEmail, validateVerificationCode } from '../util/validators';

const useEmailVerification = (status, errorMessage, successMessage, setErrorMessage, setSuccessMessage, setStatus) => {
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isEmailVisible, setIsEmailVisible] = useState(false);

  // 필요시 로컬 인증 코드를 사용할 수 있음 (현재는 사용하지 않음)
  // const { verificationCode, generateVerificationCode } = useVerificationCode();
  const { timeLeft, resetTimer } = useTimer(180, isEmailVisible);

  const { sendMail, loading, error: mailError, mailToken } = useSendMail();
  const { verifyMail, loading: verifyLoading } = useVerifyMail();

  // mailToken이 업데이트 될 때마다 콘솔에 출력해 디버깅할 수 있습니다.
  useEffect(() => {
    console.log('mailToken 업데이트:', mailToken);
  }, [mailToken]);

  const handleEmailVerificationClick = async email => {
    // 이메일 형식 검증
    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      setStatus(400);
      setErrorMessage(emailValidationError);
      return;
    }

    // 메일 전송 시도
    const result = await sendMail(email);
    if (result && result.error) {
      setStatus(400);
      setErrorMessage(result.error);
      return;
    }

    // 메일 전송 후 mailToken 값 확인 (디버깅용)
    console.log('메일 토큰:', mailToken);

    setIsVerificationSent(true);
    setErrorMessage('');
    setSuccessMessage('인증 코드가 발송되었습니다.');
    setIsEmailVisible(true);
    resetTimer();
  };

  const confirmVerificationCode = async inputVerificationCode => {
    // 입력된 인증 코드 형식 검증
    const verificationError = validateVerificationCode(inputVerificationCode);
    if (verificationError) {
      setStatus(400);
      setErrorMessage(verificationError);
      return;
    }

    // 서버에서 인증 확인
    const result = await verifyMail(mailToken, inputVerificationCode);
    if (result.error) {
      setIsEmailVerified(false);
      setErrorMessage(result.error);
    } else if (result.success) {
      setIsEmailVerified(true);
      setSuccessMessage('이메일 인증이 완료되었습니다.');
      setErrorMessage('');
    }
  };

  return {
    isEmailVerified,
    isVerificationSent,
    isEmailVisible,
    status,
    errorMessage,
    successMessage,
    timeLeft,
    loading, // 메일 전송 로딩 상태 (useSendMail)
    verifyLoading, // 서버 인증 로딩 상태 (useVerifyMail)
    mailToken, // 메일 전송 후 받은 토큰
    handleEmailVerificationClick,
    confirmVerificationCode,
  };
};

export default useEmailVerification;
