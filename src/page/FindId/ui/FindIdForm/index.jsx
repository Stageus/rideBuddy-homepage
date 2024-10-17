import React, { useState, useEffect } from 'react';
import { StyledButton, StyledInputPrimary10, StyledLink } from '../../../../style/styles';
import { StyledEmailDiv, StyledFindIdForm, StyledFindIdFormSection, StyledHiddenEmailDiv } from './style/style';

const FindIdForm = () => {
  const [isEmailVisible, setIsEmailVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3:00 minutes countdown (180 seconds)
  const [isVerificationSent, setIsVerificationSent] = useState(false); // New state to track verification status

  useEffect(() => {
    if (isEmailVisible && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isEmailVisible, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleVerifyClick = () => {
    setIsEmailVisible(true);
    setTimeLeft(180); // Reset the countdown to 3:00 whenever verification is clicked
    setIsVerificationSent(true); // Set verification sent to true
  };

  return (
    <StyledFindIdFormSection>
      <h1>아이디 찾기</h1>
      <p>회원가입시 인증한 이메일로 진행해주세요.</p>
      <StyledFindIdForm>
        <div>
          <label htmlFor="name">
            이름 <span>(최대 5글자 한글 입력)</span>
          </label>
          <StyledInputPrimary10 type="text" id="name" name="name" maxLength="5" placeholder="이름 입력" required />
        </div>
        <div>
          <label htmlFor="email">이메일</label>
          <StyledEmailDiv>
            <StyledInputPrimary10 type="email" id="email" name="email" placeholder="이메일 입력" required />
            <StyledButton type="button" onClick={handleVerifyClick}>
              {isVerificationSent ? '재전송' : '인증'} {/* Button text changes after clicking */}
            </StyledButton>
          </StyledEmailDiv>
        </div>
        
        <StyledHiddenEmailDiv isVisible={isEmailVisible}>
          <label htmlFor="hiddenEmail">이메일 인증</label>
          <StyledInputPrimary10 type="email" id="hiddenEmail" name="hiddenEmail" placeholder="이메일 입력" required />
          <span>{formatTime(timeLeft)}</span>
        </StyledHiddenEmailDiv>

        <StyledLink>로그인페이지 이동</StyledLink>
        <StyledButton width="100%" type="submit">
          아이디 찾기
        </StyledButton>
      </StyledFindIdForm>
    </StyledFindIdFormSection>
  );
};

export default FindIdForm;
