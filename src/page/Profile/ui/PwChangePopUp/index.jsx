import React from "react";
import { StyledCloseButton, StyledInputContainerDiv, StyledPasswordInput, StyledPopupContainerDiv, StyledTitleH2, StyledUpdateButton } from "./style/style";

const PasswordChangePopup = ({ onClose, onUpdate }) => {
  return (
    <StyledPopupContainerDiv>
      <StyledCloseButton onClick={onClose} />
      <StyledTitleH2>비밀번호 수정</StyledTitleH2>
      <StyledInputContainerDiv>
        <StyledPasswordInput type="password" placeholder="새 비밀번호 입력" />
        <StyledUpdateButton onClick={onUpdate}>수정</StyledUpdateButton>
      </StyledInputContainerDiv>
    </StyledPopupContainerDiv>
  );
};

export default PasswordChangePopup;
