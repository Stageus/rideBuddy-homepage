import { useState, useCallback } from 'react';

const useVerificationCode = () => {
  const [verificationCode, setVerificationCode] = useState('');

  const generateVerificationCode = useCallback(() => {
    const generatedCode = '588393'; // 실제 사용에서는 난수를 생성하거나 API 호출을 통해 코드를 생성하도록 변경 가능
    setVerificationCode(generatedCode);
    console.log(`발급된 인증 코드: ${generatedCode}`);
  }, []);

  return { verificationCode, generateVerificationCode };
};

export default useVerificationCode;
