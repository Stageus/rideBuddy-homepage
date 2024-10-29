import React, { useState } from "react";
import {
  StyledDeleteAccountButton,
  StyledDetailItemDiv,
  StyledDetailLabelSpan,
  StyledDetailValueSpan,
  StyledDetailsContainerDiv,
  StyledEditButton
} from "./style/style";
import PasswordChangePopup from "../../../PwChangePopUp";
import PhoneNumberChangePopup from "../../../PhoneNumChangePopUp";
import DeleteAccountPopup from "../../../DelPopUp";

const UserProfileDetails = () => {
  const [popupType, setPopupType] = useState(null); // null, "password", "phone" 중 하나의 상태

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
        <StyledEditButton onClick={() => setPopupType("password")}>수정</StyledEditButton>
      </StyledDetailItemDiv>
      <StyledDetailItemDiv>
        <StyledDetailLabelSpan>전화번호</StyledDetailLabelSpan>
        <StyledEditButton onClick={() => setPopupType("phone")}>수정</StyledEditButton>
      </StyledDetailItemDiv>
      <StyledDeleteAccountButton onClick={() => setPopupType("del")} >회원탈퇴</StyledDeleteAccountButton>

      {/* 조건부로 팝업 렌더링 */}
      {popupType === "password" && (
        <PasswordChangePopup onClose={handleClosePopup} onUpdate={() => console.log("비밀번호 수정 완료")} />
      )}
      {popupType === "phone" && (
        <PhoneNumberChangePopup onClose={handleClosePopup} onUpdate={() => console.log("전화번호 수정 완료")} />
      )}
      {popupType === "del" && (
        <DeleteAccountPopup onClose={handleClosePopup} onUpdate={() => console.log("아이디 삭제 완료")} />
      )}
    </StyledDetailsContainerDiv>
  );
};

export default UserProfileDetails;
