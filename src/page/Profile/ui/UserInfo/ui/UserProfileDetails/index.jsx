import React, { useState } from 'react';
import {
  StyledDeleteAccountButton,
  StyledDetailItemDiv,
  StyledDetailLabelSpan,
  StyledDetailValueSpan,
  StyledDetailsContainerDiv,
  StyledEditButton,
} from './style/style';
import PasswordChangePopup from '../../../PwChangePopUp';
import PhoneNumberChangePopup from '../../../PhoneNumChangePopUp';
import DeleteAccountPopup from '../../../DelPopUp';

const UserProfileDetails = () => {
  const [popupType, setPopupType] = useState(null);

  const handleClosePopup = () => setPopupType(null);

  return (
    <StyledDetailsContainerDiv>
      <StyledDetailItemDiv>
        <StyledDetailLabelSpan>이름</StyledDetailLabelSpan>
        <StyledDetailValueSpan>홍길동</StyledDetailValueSpan>
      </StyledDetailItemDiv>
      <StyledDetailItemDiv>
        <StyledDetailLabelSpan>이메일 계정</StyledDetailLabelSpan>
        <StyledDetailValueSpan>TEST_ID@gmail.com</StyledDetailValueSpan>
      </StyledDetailItemDiv>
      <StyledDetailItemDiv>
        <StyledDetailLabelSpan>아이디</StyledDetailLabelSpan>
        <StyledDetailValueSpan>TEST_ID</StyledDetailValueSpan>
      </StyledDetailItemDiv>
      <StyledDetailItemDiv>
        <StyledDetailLabelSpan>비밀번호</StyledDetailLabelSpan>
        <StyledEditButton onClick={() => setPopupType('password')}>수정</StyledEditButton>
      </StyledDetailItemDiv>
      <StyledDetailItemDiv>
        <StyledDetailLabelSpan>전화번호</StyledDetailLabelSpan>
        <StyledEditButton onClick={() => setPopupType('phone')}>수정</StyledEditButton>
      </StyledDetailItemDiv>
      <StyledDeleteAccountButton onClick={() => setPopupType('del')}>회원탈퇴</StyledDeleteAccountButton>

      {popupType === 'password' && <PasswordChangePopup onClose={handleClosePopup} />}
      {popupType === 'phone' && <PhoneNumberChangePopup onClose={handleClosePopup} />}
      {popupType === 'del' && <DeleteAccountPopup onClose={handleClosePopup} />}
    </StyledDetailsContainerDiv>
  );
};

export default UserProfileDetails;
