import React from 'react';
import { StyledButton, StyledInput, StyledLink } from '../../../../style/styles';
import { StyledInputDiv, StyledLoginForm, StyledSignUpDiv, StyledSNSLoginBtn, StyledSNSLoginDiv } from './style/style';
import { SiNaver } from 'react-icons/si';
import { FcGoogle } from "react-icons/fc";

const LoginForm = () => {
  const handleLoginClick = () => {
    // 로그인 버튼 클릭 시 처리할 로직
    console.log('로그인 버튼 클릭됨');
  };

  const handleGoogleLogin = () => {
    // 구글 로그인 처리 로직
    console.log('구글 로그인');
  };

  const handleNaverLogin = () => {
    // 네이버 로그인 처리 로직
    console.log('네이버 로그인');
  };

  return (
    <StyledLoginForm>
      <h1>Hello!</h1>
      <p>만나서 반갑습니다.</p>

      <StyledInputDiv>
        <label htmlFor="user-id">아이디 입력</label>
        <div>
          <StyledInput type="text" id="user-id" name="user-id" placeholder="아이디 입력" required />
          <StyledLink href="/find-id">아이디 찾기</StyledLink>
        </div>
      </StyledInputDiv>

      <StyledInputDiv>
        <label htmlFor="password">비밀번호 입력</label>
        <div>
          <StyledInput type="password" id="password" name="password" placeholder="비밀번호 입력" required />
          <StyledLink href="/find-password">비밀번호 찾기</StyledLink>
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
