import React from "react";
import styled from "styled-components";

const StyledPopupContainerDiv = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 340px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
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

const StyledIconContainerDiv = styled.div`
  width: 100px;
  height: 100px;
  background-color: #e0e7ff;
  border-radius: 50%;
  margin: 0 auto 20px auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledIcon = styled.div`
  font-size: 50px;
  color: #3b5998;
`;

const StyledFileInputContainerDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledFilePathInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 14px;
  color: #888;
`;

const StyledFileSelectButton = styled.button`
  margin-left: 10px;
  padding: 10px;
  background-color: #3b5998;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #334a7d;
  }
`;

const StyledUploadButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #3b5998;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #334a7d;
  }
`;

const EditProfilePopup = ({ onClose, onFileSelect, onUpload }) => {
  return (
    <StyledPopupContainerDiv>
      <StyledCloseButton onClick={onClose} />
      <StyledTitleH2>프로필 수정</StyledTitleH2>
      <StyledIconContainerDiv>
        <StyledIcon>📋</StyledIcon>
      </StyledIconContainerDiv>
      <StyledFileInputContainerDiv>
        <StyledFilePathInput type="text" placeholder="선택된 파일 없음" readOnly />
        <StyledFileSelectButton onClick={onFileSelect}>파일선택</StyledFileSelectButton>
      </StyledFileInputContainerDiv>
      <StyledUploadButton onClick={onUpload}>업로드</StyledUploadButton>
    </StyledPopupContainerDiv>
  );
};

export default EditProfilePopup;
