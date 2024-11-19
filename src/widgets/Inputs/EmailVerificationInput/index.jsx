import React from 'react';
import { StyledEmailConfirmDiv, StyledHiddenEmailDiv } from './style';
import formatTime from '../../../shared/util/formatTime';
import { StyledButton, StyledInputPrimary10 } from '../../../style/styles';

const EmailVerificationInput = ({
  inputVerificationCode,
  setInputVerificationCode,
  errorMessage,
  setErrorMessage,
  status,
  isAllFieldsRequiredError,
  confirmVerificationCode,
  isEmailVerified,
  timeLeft,
}) => (
  <StyledHiddenEmailDiv>
    <label htmlFor="hiddenEmail">이메일 인증 코드</label>
    <StyledEmailConfirmDiv>
      <StyledInputPrimary10
        type="text"
        id="hiddenEmail"
        placeholder="인증코드 입력"
        value={inputVerificationCode}
        onChange={e => {
          setInputVerificationCode(e.target.value);
          setErrorMessage('');
        }}
        required
        disabled={isEmailVerified}
        status={
          isAllFieldsRequiredError ||
          (status === 400 &&
            (errorMessage === '인증 코드를 입력해주세요.' ||
              errorMessage === '인증 코드는 6자리 숫자여야 합니다.' ||
              errorMessage === '인증 코드가 일치하지 않습니다.') &&
            status)
        }
      />
      <StyledButton type="button" onClick={() => confirmVerificationCode(inputVerificationCode)} disabled={isEmailVerified}>
        인증 확인
      </StyledButton>
      {!isEmailVerified && <span>{formatTime(timeLeft)}</span>}
    </StyledEmailConfirmDiv>
  </StyledHiddenEmailDiv>
);

export default EmailVerificationInput;
