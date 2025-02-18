// EditProfilePopup.jsx
import React, { useRef, useState } from 'react';
import {
  StyledCloseButton,
  StyledFileInputContainerDiv,
  StyledFilePathInput,
  StyledFileSelectButton,
  StyledIcon,
  StyledIconContainerDiv,
  StyledPopupContainerDiv,
  StyledTitleH2,
  StyledUploadButton,
} from './style/style';

const EditProfilePopup = ({ onClose, onFileSelect, onUpload, isLoading, error }) => {
  const fileInputRef = useRef(null);

  const [selectedFileName, setSelectedFileName] = useState('');

  const handleSelectButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
      onFileSelect(file); 
    }
  };

  return (
    <StyledPopupContainerDiv>
      <StyledCloseButton onClick={onClose} />
      <StyledTitleH2>프로필 수정</StyledTitleH2>

      <StyledIconContainerDiv>
        <StyledIcon>📋</StyledIcon>
      </StyledIconContainerDiv>

      <StyledFileInputContainerDiv>
        <StyledFilePathInput
          type="text"
          placeholder="선택된 파일 없음"
          readOnly
          value={selectedFileName}
        />

        <StyledFileSelectButton onClick={handleSelectButtonClick}>
          파일선택
        </StyledFileSelectButton>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleFileChange}
        />
      </StyledFileInputContainerDiv>

      <StyledUploadButton onClick={onUpload} disabled={isLoading}>
      </StyledUploadButton>

    </StyledPopupContainerDiv>
  );
};

export default EditProfilePopup;
