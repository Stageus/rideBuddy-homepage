import React from "react";
import { StyledCloseButton, StyledInputContainerDiv, StyledPhoneInput, StyledPopupContainerDiv, StyledTitleH2, StyledUpdateButton } from "./style/style";

const PhoneNumberChangePopup = ({ onClose, onUpdate }) => {
  return (
    <StyledPopupContainerDiv>
      <StyledCloseButton onClick={onClose} />
      <StyledTitleH2>전화번호 수정</StyledTitleH2>
      <StyledInputContainerDiv>
        <StyledPhoneInput type="text" placeholder="새 전화번호 입력" />
        <StyledUpdateButton onClick={onUpdate}>수정</StyledUpdateButton>
      </StyledInputContainerDiv>
    </StyledPopupContainerDiv>
  );
};

export default PhoneNumberChangePopup;
