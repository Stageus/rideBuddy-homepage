import styled from 'styled-components';
import { StyledContainer } from '../../../style/styles';

export const PageWrapper = styled(StyledContainer)`
  max-width: 380px;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 5px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.coolGray20};
  color: ${({ theme }) => theme.colors.primary60};
  background-color: ${({ theme }) => theme.colors.white};
  overflow-y: auto;

  height: calc(100vh);
  margin-top: 63px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StyledContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 63px);
  padding: 20px;
`;

export const StyledStoryCard = styled.div`
  width: 300px;
  height: 400px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  margin-bottom: 20px;
`;

export const StyledProfileContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
`;

export const StyledProfileImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #c4c4c4;
  margin-right: 8px;
`;

export const StyledTitle = styled.span`
  color: white;
  font-size: 12px;
  font-weight: bold;
`;

export const StyledCloseButton = styled.button`
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

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const StyledUploadButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary60};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
`;


