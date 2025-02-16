// useTestLogin.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { idRegex, pwRegex } from '../../../../../assets/regex';
import useLoginApi from './useLoginApi';

const useTestLogin = () => {
  const [status, setStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { loginUser } = useLoginApi();

  // 에러 처리 함수
  const handleErrorResponse = status => {
    switch (status) {
      case 400:
        setErrorMessage('요청한 형식이 잘못되었습니다.');
        break;
      case 404:
        setErrorMessage('아이디 또는 비밀번호가 잘못되었습니다.');
        break;
      case 500:
        setErrorMessage('서버 내부 오류가 발생했습니다.');
        break;
      default:
        setErrorMessage('로그인 실패. 다시 시도해주세요.');
    }
  };

  // 로그인 처리 함수
  const loginClickEvent = async (userId, password) => {
    // 아이디와 비밀번호 입력 여부 검사
    if (!userId && !password) {
      setStatus(400);
      setErrorMessage('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }
    if (!userId) {
      setStatus(400);
      setErrorMessage('아이디를 입력해주세요.');
      return;
    }
    if (!password) {
      setStatus(400);
      setErrorMessage('비밀번호를 입력해주세요.');
      return;
    }

    // 아이디 정규식 검사
    if (!idRegex.test(userId)) {
      setStatus(400);
      setErrorMessage('아이디 또는 비밀번호 형식을 확인해주세요.');
      return;
    }
    // 비밀번호 정규식 검사
    if (!pwRegex.test(password)) {
      setStatus(400);
      setErrorMessage('아이디 또는 비밀번호 형식을 확인해주세요.');
      return;
    }

    // API 호출
    const { status: apiStatus, data } = await loginUser(userId, password);

    if (apiStatus === 200) {
      setStatus(200);
      setErrorMessage('');
      // API에서 반환한 access_token을 localStorage에 저장
      localStorage.setItem('token', data.access_token);
      navigate('/Main');
    } else {
      setStatus(apiStatus);
      // 서버에서 주는 메시지를 콘솔에 출력
      console.log('서버 응답 메시지:', data.message);
      handleErrorResponse(apiStatus);
    }
  };

  return [status, errorMessage, loginClickEvent];
};

export default useTestLogin;
