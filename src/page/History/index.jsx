import React, { useState } from 'react';
import Aside from '../../widgets/Aside';
import Header from '../../widgets/Header';
import {
  PageWrapper,
  StyledContainerDiv,
  StyledStoryCard,
  StyledProfileContainer,
  StyledProfileImage,
  StyledTitle,
  StyledCloseButton,
  StyledImage,
  StyledUploadButton,
} from './style/style';
import EditProfilePopup from './ui/EditProfilePopup';


const HistoryForm = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const images = ['https://via.placeholder.com/300x400', 'https://via.placeholder.com/300x400', 'https://via.placeholder.com/300x400'];

  const handleUploadButtonClick = () => {
    console.log('Upload button clicked'); // 디버깅용
    setPopupVisible(true); // 상태 업데이트
  };

  const handleClosePopup = () => {
    console.log('Popup close button clicked'); // 디버깅용
    setPopupVisible(false);
  };

  return (
    <>
      <Aside />
      <Header />
      <PageWrapper>
        <StyledContainerDiv>
          {images.map((image, index) => (
            <StyledStoryCard key={index}>
              <StyledProfileContainer>
                <StyledProfileImage />
                <StyledTitle>홍길동님의 히스토리</StyledTitle>
              </StyledProfileContainer>
              <StyledCloseButton>×</StyledCloseButton>
              <StyledImage src={image} alt="Story Image" />
            </StyledStoryCard>
          ))}
          <StyledUploadButton onClick={handleUploadButtonClick}>사진 업로드</StyledUploadButton>
        </StyledContainerDiv>

        {/* 팝업 렌더링 */}
        {isPopupVisible && (
          <EditProfilePopup
            onClose={handleClosePopup}
            onFileSelect={() => console.log('파일 선택')}
            onUpload={() => console.log('파일 업로드')}
          />
        )}
      </PageWrapper>
    </>
  );
};

export default HistoryForm;
