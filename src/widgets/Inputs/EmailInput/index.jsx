// EmailInput.js
import React from 'react';
import { StyledButton, StyledInputPrimary10 } from '../../../style/styles';
import { StyledEmailDiv } from './style';

const EmailInput = ({
  email,
  setEmail,
  errorMessage,
  setErrorMessage,
  status,
  isAllFieldsRequiredError,
  handleEmailVerificationClick,
  isEmailVerified,
  isVerificationSent,
}) => (
  <div>
    <label htmlFor="email">이메일</label>
    <StyledEmailDiv>
      <StyledInputPrimary10
        type="email"
        id="email"
        placeholder="이메일 입력"
        value={email}
        onChange={e => {
          setEmail(e.target.value);
          setErrorMessage('');
        }}
        required
        status={isAllFieldsRequiredError || (status === 400 && errorMessage === '이메일 형식을 확인해주세요.' && status)}
        disabled={isEmailVerified}
      />
      <StyledButton type="button" onClick={() => handleEmailVerificationClick(email)} disabled={isEmailVerified}>
        {isVerificationSent ? '재전송' : '인증'}
      </StyledButton>
    </StyledEmailDiv>
  </div>
);

export default EmailInput;
