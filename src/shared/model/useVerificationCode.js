import { useState, useCallback } from 'react';

const useVerificationCode = () => {
  const [verificationCode, setVerificationCode] = useState('');

  const generateVerificationCode = useCallback(() => {
    const generatedCode = '588393';
    setVerificationCode(generatedCode);
    console.log(`발급된 인증 코드: ${generatedCode}`);
  }, []);

  return { verificationCode, generateVerificationCode };
};

export default useVerificationCode;
