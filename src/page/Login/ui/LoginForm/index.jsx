import React, { useState } from 'react';
import { StyledButton, StyledInput, StyledLink, StyledErrorMessage } from '../../../../style/styles';
import {
  SpaceBetweenDiv,
  StyledInputDiv,
  StyledLoginForm,
  StyledSignUpDiv,
  StyledSNSLoginBtn,
  StyledSNSLoginDiv,
} from './style/style';
import { SiNaver } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';
import useTestLogin from './api/useTestLogin';

const LoginForm = () => {
  const [userId, setUserId] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [status, errorMessage, loginClickEvent] = useTestLogin(); 

  const handleLoginClick = () => {
    loginClickEvent(userId, password);
  };

  const handleGoogleLogin = () => {
    console.log('구글 로그인');
  };

  const handleNaverLogin = () => {
    console.log('네이버 로그인');
  };

  return (
    <StyledLoginForm>
      <h1>Hello!</h1>
      <p>만나서 반갑습니다.</p>

      <StyledInputDiv>
        <label htmlFor="user-id">아이디 입력</label>
        <div>
          <StyledInput
            type="text"
            id="user-id"
            name="user-id"
            placeholder="아이디 입력"
            value={userId}
            onChange={e => setUserId(e.target.value)} // 입력 변경 시 상태 업데이트
            required
            status={status}
          />

          <SpaceBetweenDiv padding="1px">
            {errorMessage ? <StyledErrorMessage>{errorMessage}</StyledErrorMessage> : <div></div>}
            <StyledLink href="/findId">아이디 찾기</StyledLink>
          </SpaceBetweenDiv>
        </div>
      </StyledInputDiv>

      <StyledInputDiv padding="1px">
        <label htmlFor="password">비밀번호 입력</label>
        <div>
          <StyledInput
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={e => setPassword(e.target.value)} // 입력 변경 시 상태 업데이트
            required
            status={status}
          />
          <SpaceBetweenDiv padding="1px">
            {errorMessage && status != 500 && status != 400 && status != 404 ? (
              <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
            ) : (
              <div></div>
            )}
            <StyledLink href="/findPassword">비밀번호 찾기</StyledLink>
          </SpaceBetweenDiv>
        </div>
      </StyledInputDiv>

      <StyledButton width="100%" type="button" onClick={handleLoginClick}>
        로그인
      </StyledButton>

      <span>SNS 로그인 하기</span>

      <StyledSNSLoginDiv>
        <StyledSNSLoginBtn aria-label="구글로 로그인" onClick={handleGoogleLogin}>
          <FcGoogle />
        </StyledSNSLoginBtn>
        <StyledSNSLoginBtn logo="naver" aria-label="네이버로 로그인" onClick={handleNaverLogin}>
          <SiNaver />
        </StyledSNSLoginBtn>
      </StyledSNSLoginDiv>

      <StyledSignUpDiv>
        <StyledLink>계정이 아직 없으신가요?</StyledLink>
      </StyledSignUpDiv>
    </StyledLoginForm>
  );
};

export default LoginForm;
