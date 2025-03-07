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
import useProfileUpload from './api/useProfileUpload';
import useDeleteProfileImage from './api/useProfileDel';
import useUserInfo from '../../shared/api/useUserInfo';
import useProfileList from './api/useProfileList ';

const HistoryForm = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const { uploadProfile, isLoading, error } = useProfileUpload();
  const { profileList, isLoading: listLoading, error: listError, fetchProfileList } = useProfileList();
  const { deleteProfileImage, loading: deleteLoading, error: deleteError } = useDeleteProfileImage();
  const { user, fetchUserInfo } = useUserInfo();

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  useEffect(() => {
    fetchProfileList();
  }, []);

  const handleUploadButtonClick = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const handleFileSelect = file => {
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('파일이 선택되지 않았습니다.');
      return;
    }

    try {
      await uploadProfile(selectedFile);
      setPopupVisible(false);
      setSelectedFile(null);
      fetchProfileList();
    } catch (err) {
      console.error('업로드 실패:', err.message);
    }
  };

  const handleDelete = async (img_idx) => {
    try {
      await deleteProfileImage(img_idx);
      fetchProfileList();
    } catch (err) {
      console.error('삭제 실패:', err.message);
    }
  };

  return (
    <>
      <Aside />
      <Header />
  
      <PageWrapper>
        <StyledContainerDiv>
          {listLoading ? (
            <p>로딩 중...</p>
          ) : profileList.length === 0 ? (
            <p>등록된 사진이 없습니다.</p>
          ) : (
            profileList.map(item => (
              <StyledStoryCard key={item.img_idx}>
                <StyledProfileContainer>
                  <StyledProfileImage src={user?.img_url || 'img/icon_user.svg'} />
                  <StyledTitle>{user?.account_name || '사용자'}님의 히스토리</StyledTitle>
                </StyledProfileContainer>
                {/* 삭제 중일 때 개별 로딩 표시 */}
                <StyledCloseButton onClick={() => handleDelete(item.img_idx)} disabled={deleteLoading}>
                  {deleteLoading ? '삭제 중...' : '×'}
                </StyledCloseButton>
                <StyledImage src={item.img_url} alt="Story Image" />
              </StyledStoryCard>
            ))
          )}
        </StyledContainerDiv>
        <StyledUploadButton onClick={handleUploadButtonClick} disabled={isLoading}>
            {isLoading ? '업로드 중...' : '사진 업로드'}    
        </StyledUploadButton>
      </PageWrapper>
      {isPopupVisible && (
          <EditProfilePopup
            onClose={handleClosePopup}
            onFileSelect={handleFileSelect}
            onUpload={handleUpload}
            isLoading={isLoading}
            error={error}
          />
        )}
    </>
  );
};

export default HistoryForm;