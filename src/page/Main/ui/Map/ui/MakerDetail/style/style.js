import styled from 'styled-components';

export const StyledMarkerDetailDiv = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 350px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  padding: 16px;
  font-family: ${({ theme }) => theme.fonts.body};
  z-index: 1000;
`;

export const StyledCloseButtonDiv = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 12px;
  height: 12px;
  background-color: #da1e28;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

export const StyledMarkerImageContainerDiv = styled.div`
  position: relative;
  margin-top: 30px;
`;

export const StyledMarkerImage = styled.img`
  width: 100%;
  height: 150px;
  border-radius: 8px 8px 0 0;
  object-fit: cover;
`;

export const StyledLikeIconDiv = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  color: white;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 4px 6px;
  border-radius: 50%;
`;

export const StyledMarkerTitleH4 = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.heading4};
  color: ${({ theme }) => theme.colors.primary90};
  margin: 16px 0 8px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const StyledMarkerAddressP = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.bodyM};
  color: ${({ theme }) => theme.colors.coolGray40};
  margin-bottom: 16px;
`;

export const StyledMarkerLikeButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary60};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.buttonM};
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary90};
  }
`;
