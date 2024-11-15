import React from 'react';
import styled from 'styled-components';
import { PageWrapper } from './style/style';
import Aside from '../../widgets/Aside';
import Header from '../../widgets/Header';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 63px);
  padding: 20px;
`;

const StoryCard = styled.div`
  width: 300px;
  height: 400px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  margin-bottom: 20px;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
`;

const ProfileImage = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #c4c4c4;
  margin-right: 8px;
`;

const Title = styled.span`
  color: white;
  font-size: 12px;
  font-weight: bold;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  color: white;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UploadButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary60};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
`;

const HistoryForm = () => {
  const images = ['https://via.placeholder.com/300x400', 'https://via.placeholder.com/300x400', 'https://via.placeholder.com/300x400'];

  return (
    <>
    <Aside></Aside>
    <Header></Header>
      <PageWrapper>
        <Container>
          {images.map((image, index) => (
            <StoryCard key={index}>
              <ProfileContainer>
                <ProfileImage />
                <Title>홍길동님의 히스토리</Title>
              </ProfileContainer>
              <CloseButton>×</CloseButton>
              <Image src={image} alt="Story Image" />
            </StoryCard>
          ))}
          <UploadButton>사진 업로드</UploadButton>
        </Container>
      </PageWrapper>
    </>
  );
};

export default HistoryForm;
