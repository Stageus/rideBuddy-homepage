import React from "react";
import styled from "styled-components";

const StyledPopupContainerDiv = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  z-index: 1000;
`;

const StyledDeleteAccountTitleH2 = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #d32f2f;
  margin-bottom: 20px;
`;

const StyledCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  background-color: #d32f2f;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

const StyledIconContainerDiv = styled.div`
  width: 100px;
  height: 100px;
  background-color: #fddede;
  border-radius: 50%;
  margin: 0 auto 20px auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledWarningIconDiv = styled.div`
  font-size: 50px;
  color: #d32f2f;
`;

const StyledWarningMessageP = styled.p`
  font-size: 16px;
  color: #d32f2f;
  margin-bottom: 20px;
`;

const StyledConfirmButton = styled.button`
  width: 80px;
  padding: 10px 0;
  background-color: #d32f2f;
  color: white;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #b71c1c;
  }
`;

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
