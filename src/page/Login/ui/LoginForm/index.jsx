import React, { useState } from 'react';
import { StyledButton, StyledLink } from '../../../../style/styles';
import { StyledLoginForm, StyledSNSLoginDiv, StyledSignUpDiv } from './style/style';
import { SiNaver } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';
import useTestLogin from './api/useTestLogin';
import SNSLoginButton from './ui/SNSLogin';
import InputField from './ui/InputField';

const LoginForm = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [status, errorMessage, loginClickEvent] = useTestLogin();

  const handleLoginClick = () => {
    loginClickEvent(userId, password);
  };

  const handleNaverLogin = () => {
    const clientId = "RaXvdKNHdhG09w5hPjrI";
    const redirectUri = encodeURIComponent("http://localhost:5173/NaverCallback");
    const state = Math.random().toString(36).substring(2);
    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;
    window.location.href = naverAuthUrl;
  };

  const handleGoogleLogin = () => {
    const clientId = "YOUR_GOOGLE_CLIENT_ID"; // 구글 클라이언트 ID
    const redirectUri = encodeURIComponent("http://localhost:5173/GoogleCallback");
    const scope = encodeURIComponent("profile email"); // 구글에서 요청할 권한
    const state = Math.random().toString(36).substring(2);
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;
    window.location.href = googleAuthUrl;
  };

  return (
    <StyledLoginForm>
      <h1>Hello!</h1>
      <p>만나서 반갑습니다.</p>

      <InputField
        label="아이디 입력"
        id="user-id"
        placeholder="아이디 입력"
        value={userId}
        onChange={setUserId}
        errorMessage={errorMessage}
        link={{ to: '/FindId', text: '아이디 찾기' }}
        status={status}
      />

      <InputField
        label="비밀번호 입력"
        type="password"
        id="password"
        placeholder="비밀번호 입력"
        value={password}
        onChange={setPassword}
        errorMessage={status !== 404 && status !== 400 && status !== 500 ? errorMessage : ''}
        link={{ to: '/FindPw', text: '비밀번호 찾기' }}
        status={status}
      />

      <StyledButton width="100%" type="button" onClick={handleLoginClick}>
        로그인
      </StyledButton>

      <span>SNS 로그인 하기</span>

      <StyledSNSLoginDiv>
        <SNSLoginButton icon={<FcGoogle />} label="구글로 로그인" onClick={handleGoogleLogin} />
        <SNSLoginButton logo="naver" icon={<SiNaver />} label="네이버로 로그인" onClick={handleNaverLogin} />
      </StyledSNSLoginDiv>

      <StyledSignUpDiv>
        <StyledLink to="/SignUp">계정이 아직 없으신가요?</StyledLink>
      </StyledSignUpDiv>
    </StyledLoginForm>
  );
};

export default LoginForm;