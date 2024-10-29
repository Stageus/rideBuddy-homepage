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
  z-index: 1000;
`;

const StyledTitleH2 = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #3b5998;
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

const StyledInputContainerDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledPhoneInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 14px;
  color: #888;
`;

const StyledUpdateButton = styled.button`
  margin-left: 10px;
  padding: 10px 15px;
  background-color: #3b5998;
  color: white;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #334a7d;
  }
`;

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
