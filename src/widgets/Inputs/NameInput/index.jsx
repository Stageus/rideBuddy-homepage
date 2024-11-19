// NameInput.js
import React from 'react';
import { StyledInputPrimary10 } from '../../../style/styles';

const NameInput = ({ name, setName, errorMessage, setErrorMessage, status, isAllFieldsRequiredError }) => (
  <div>
    <label htmlFor="name">
      이름 <span>(최대 5글자 한글 입력)</span>
    </label>
    <StyledInputPrimary10
      type="text"
      id="name"
      maxLength="5"
      placeholder="이름 입력"
      value={name}
      onChange={e => {
        setName(e.target.value);
        setErrorMessage('');
      }}
      required
      status={isAllFieldsRequiredError || (status === 400 && errorMessage === '이름 형식을 확인해주세요.' && status)}
    />
  </div>
);

export default NameInput;
