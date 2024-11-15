// PasswordInput.js
import React from 'react';
import { StyledInputPrimary10 } from '../../../../style/styles';

const PasswordInput = ({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  errorMessage,
  setErrorMessage,
  status,
  isAllFieldsRequiredError,
}) => (
  <>
    <div>
      <label htmlFor="password">
        비밀번호 <span>(최대 20글자 영대소문자, 숫자, 특수문자 포함)</span>
      </label>
      <StyledInputPrimary10
        type="password"
        id="password"
        maxLength="20"
        placeholder="비밀번호 입력"
        value={password}
        onChange={e => {
          setPassword(e.target.value);
          setErrorMessage('');
        }}
        required
        status={
          isAllFieldsRequiredError ||
          (status === 400 &&
            (errorMessage === '비밀번호 형식을 확인해주세요.' || errorMessage === '비밀번호가 일치하지 않습니다.') &&
            status)
        }
      />
    </div>

    <div>
      <label htmlFor="confirmPassword">비밀번호 확인</label>
      <StyledInputPrimary10
        type="password"
        id="confirmPassword"
        placeholder="비밀번호 확인 입력"
        value={confirmPassword}
        onChange={e => {
          setConfirmPassword(e.target.value);
          setErrorMessage('');
        }}
        required
        status={
          isAllFieldsRequiredError || (status === 400 && errorMessage === '비밀번호가 일치하지 않습니다.' && status)
        }
      />
    </div>
  </>
);

export default PasswordInput;
