// UserIdInput.js
import React from 'react';
import { StyledButton, StyledInputPrimary10 } from '../../../../style/styles';
import { StyledIdConfirmDiv } from '../../style/style';

const UserIdInput = ({
  userId,
  setUserId,
  errorMessage,
  setErrorMessage,
  status,
  isAllFieldsRequiredError,
  checkIdDuplication,
}) => (
  <div>
    <label htmlFor="userId">
      아이디 <span>(최대 20글자 대소문자만 허용)</span>
    </label>
    <StyledIdConfirmDiv>
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
            (errorMessage === '아이디 중복 확인을 완료해주세요.' ||
              errorMessage === '아이디 형식을 확인해주세요.' ||
              errorMessage === '이미 사용 중인 아이디입니다.') &&
            status)
        }
      />

      <StyledButton type="button" onClick={() => checkIdDuplication(userId)}>
        중복 체크
      </StyledButton>
    </StyledIdConfirmDiv>
  </div>
);

export default UserIdInput;
