import React from 'react';
import { StyledCloseButton, StyledFileInputContainerDiv, StyledFilePathInput, StyledFileSelectButton, StyledIcon, StyledIconContainerDiv, StyledPopupContainerDiv, StyledTitleH2, StyledUploadButton } from './style/style';

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
