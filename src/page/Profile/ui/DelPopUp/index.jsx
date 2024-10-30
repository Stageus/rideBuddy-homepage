import React from "react";
import { StyledCloseButton, StyledConfirmButton, StyledDeleteAccountTitleH2, StyledIconContainerDiv, StyledPopupContainerDiv, StyledWarningIconDiv, StyledWarningMessageP } from "./style/style";

const DeleteAccountPopup = ({ onClose, onConfirm }) => {
  return (
    <StyledPopupContainerDiv>
      <StyledCloseButton onClick={onClose} />
      <StyledDeleteAccountTitleH2>회원탈퇴</StyledDeleteAccountTitleH2>
      <StyledIconContainerDiv>
        <StyledWarningIconDiv>😟</StyledWarningIconDiv>
      </StyledIconContainerDiv>
      <StyledWarningMessageP>정말로 탈퇴 하시겠습니까?</StyledWarningMessageP>
      <StyledConfirmButton onClick={onConfirm}>탈퇴</StyledConfirmButton>
    </StyledPopupContainerDiv>
  );
};

export default DeleteAccountPopup;
