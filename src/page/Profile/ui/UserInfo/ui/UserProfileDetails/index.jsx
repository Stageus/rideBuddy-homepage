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

const UserProfileDetails = ({ user }) => {
  const [popupType, setPopupType] = useState(null);

  const handleClosePopup = () => setPopupType(null);

  if (!user) return null; // user 정보가 없으면 렌더링하지 않음

  return (
    <StyledDetailsContainerDiv>
      <StyledDetailItemDiv>
        <StyledDetailLabelSpan>이름</StyledDetailLabelSpan>
        <StyledDetailValueSpan>{user.account_name || '이름 정보 없음'}</StyledDetailValueSpan>
      </StyledDetailItemDiv>
      <StyledDetailItemDiv>
        <StyledDetailLabelSpan>이메일 계정</StyledDetailLabelSpan>
        <StyledDetailValueSpan>{user.mail || '이메일 정보 없음'}</StyledDetailValueSpan>
      </StyledDetailItemDiv>
      <StyledDetailItemDiv>
        <StyledDetailLabelSpan>아이디</StyledDetailLabelSpan>
        <StyledDetailValueSpan>{user.id || '아이디 정보 없음'}</StyledDetailValueSpan>
      </StyledDetailItemDiv>
      <StyledDetailItemDiv>
        <StyledDetailLabelSpan>비밀번호</StyledDetailLabelSpan>
        <StyledEditButton onClick={() => setPopupType('password')}>수정</StyledEditButton>
      </StyledDetailItemDiv>
      <StyledDeleteAccountButton onClick={() => setPopupType('del')}>
        회원탈퇴
      </StyledDeleteAccountButton>

      {popupType === 'password' && <PasswordChangePopup onClose={handleClosePopup} />}
      {popupType === 'phone' && <PhoneNumberChangePopup onClose={handleClosePopup} />}
      {popupType === 'del' && <DeleteAccountPopup onClose={handleClosePopup} />}
    </StyledDetailsContainerDiv>
  );
};

export default UserProfileDetails;
