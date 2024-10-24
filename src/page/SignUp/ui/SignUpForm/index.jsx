import React, { useState } from 'react';
import { StyledButton, StyledInputPrimary10, StyledLink } from '../../../../style/styles';
import { StyledEmailDiv, StyledSignUpForm, StyledHiddenEmailDiv, StyledSignUpSection } from './style/style';
import useTimer from './model/useTimer';
import formatTime from './util/formatTime';

const SignUpForm = () => {
  const [isEmailVisible, setIsEmailVisible] = useState(false);
  const [isVerificationSent, setIsVerificationSent] = useState(false);

  const { timeLeft, resetTimer } = useTimer(180, isEmailVisible);

  const handleVerifyClick = () => {
    setIsEmailVisible(true);
    resetTimer();
    setIsVerificationSent(true);
  };

  return (
    <StyledSignUpSection>
      <h1>회원가입</h1>
      <p>빠르고 쉽게 가입하세요.</p>
      <StyledSignUpForm>
        <div>
          <label htmlFor="name">
            이름 <span>(최대 5글자 한글 입력)</span>
          </label>
          <StyledInputPrimary10 type="text" id="name" name="name" maxLength="5" placeholder="이름 입력" required />
        </div>
        <div>
          <label htmlFor="name">
            아이디 <span>(최대 20글자 영대소문자 입력)</span>
          </label>
          <StyledInputPrimary10 type="text" id="name" name="name" maxLength="5" placeholder="아이디 입력" required />
        </div>
        <div>
          <label htmlFor="name">
            비밀번호 <span>(최대 5글자 한글 입력)</span>
          </label>
          <StyledInputPrimary10 type="text" id="name" name="name" maxLength="5" placeholder="비밀번호 입력" required />
        </div>
        <div>
          <label htmlFor="email">비밀번호 확인</label>
          <StyledEmailDiv>
            <StyledInputPrimary10 type="email" id="email" name="email" placeholder="비밀번호 확인 입력" required />
            <StyledButton type="button">확인</StyledButton>
          </StyledEmailDiv>
        </div>
        <div>
          <label htmlFor="email">이메일</label>
          <StyledEmailDiv>
            <StyledInputPrimary10 type="email" id="email" name="email" placeholder="이메일 입력" required />
            <StyledButton type="button" onClick={handleVerifyClick}>
              {isVerificationSent ? '재전송' : '인증'}
            </StyledButton>
          </StyledEmailDiv>
        </div>

        <StyledHiddenEmailDiv isvisible={isEmailVisible}>
          <label htmlFor="hiddenEmail">이메일 인증</label>
          <StyledInputPrimary10 type="email" id="hiddenEmail" name="hiddenEmail" placeholder="이메일 입력" required />
          <span>{formatTime(timeLeft)}</span>
        </StyledHiddenEmailDiv>

        <StyledLink to="/Login">로그인페이지 이동</StyledLink>
        <StyledButton width="100%" type="submit">
          비밀번호 찾기
        </StyledButton>
      </StyledSignUpForm>
    </StyledSignUpSection>
  );
};

export default SignUpForm;
