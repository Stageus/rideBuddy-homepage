import React, { useState, useEffect } from 'react';
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
import useProfileUpload from '../../shared/api/useProfileUpload';
import useProfileList from '../../shared/api/useProfileList ';

const HistoryForm = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  
  const [selectedFile, setSelectedFile] = useState(null);

  const { uploadProfile, isLoading, error } = useProfileUpload();


  const {
    profileList,     
    isLoading: listLoading,
    error: listError,
    fetchProfileList,
  } = useProfileList();


  useEffect(() => {
    console.log('[HistoryForm] 마운트: fetchProfileList 호출');
    fetchProfileList();
  }, []);

  const handleUploadButtonClick = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

 
  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('파일이 선택되지 않았습니다.');
      return;
    }

    try {
      const response = await uploadProfile(selectedFile);
      console.log('업로드 성공:', response);

      alert('업로드가 성공적으로 완료되었습니다.');
      setPopupVisible(false);
      setSelectedFile(null);

      fetchProfileList();
    } catch (err) {
      console.error('업로드 실패:', err.message);
    }
  };

  if (listLoading) {
    return <p>리스트를 불러오는 중입니다...</p>;
  }
  if (listError) {
    return <p style={{ color: 'red' }}>에러 발생: {listError}</p>;
  }

  return (
    <>
      <Aside />
      <Header />
      <PageWrapper>
        <StyledContainerDiv>
          {profileList.length === 0 ? (
            <p>등록된 사진이 없습니다.</p>
          ) : (
            profileList.map((item) => (
              <StyledStoryCard key={item.img_idx}>
                <StyledProfileContainer>
                  <StyledProfileImage />
                  <StyledTitle>홍길동님의 히스토리</StyledTitle>
                </StyledProfileContainer>
                <StyledCloseButton>×</StyledCloseButton>
                <StyledImage src={item.img_url} alt="Story Image" />
              </StyledStoryCard>
            ))
          )}

          <StyledUploadButton onClick={handleUploadButtonClick}>
            사진 업로드
          </StyledUploadButton>
        </StyledContainerDiv>

        {isPopupVisible && (
          <EditProfilePopup
            onClose={handleClosePopup}
            onFileSelect={handleFileSelect}
            onUpload={handleUpload}
            isLoading={isLoading}
            error={error}
          />
        )}
      </PageWrapper>
    </>
  );
};

export default HistoryForm;
