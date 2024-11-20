import React from 'react';
import { StyledInputPrimary10 } from '../../../style/styles';

const IdInput = ({ userId, setUserId, errorMessage, setErrorMessage, status, isAllFieldsRequiredError }) => (
  <div>
    <label htmlFor="userId">
      아이디 <span>(최대 20글자 대소문자만 허용)</span>
    </label>
      <StyledInputPrimary10
        type="text"
        id="userId"
        maxLength="20"
        placeholder="아이디 입력"
        value={userId}
        onChange={e => {
          setUserId(e.target.value);
          setErrorMessage('');
        }}
        required
        status={
          isAllFieldsRequiredError ||
          (status === 400 &&
            (errorMessage === '아이디 형식을 확인해주세요.') && status)
        }
      />
  </div>
);

export default IdInput;
