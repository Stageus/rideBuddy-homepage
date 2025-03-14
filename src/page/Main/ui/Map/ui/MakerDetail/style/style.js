import styled, { keyframes } from 'styled-components';

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
  margin-top: 60px;
`;

export const StyledMarkerImage = styled.img`
  width: 100%;
  height: 150px;
  border-radius: 8px 8px 0 0;
  object-fit: cover;
`;

export const StyledLikeIconDiv = styled.div`
  position: absolute;
  left: 20px;
  top: 20px;
  padding: 5px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 14px;
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


export const heartbeat = keyframes`
  0% {
    transform: rotate(45deg) scale(1);
  }
  25% {
    transform: rotate(45deg) scale(1);
  }
  30% {
    transform: rotate(45deg) scale(1.2);
  }
  50% {
    transform: rotate(45deg) scale(1.1);
  }
  70% {
    transform: rotate(45deg) scale(1.2);
  }
  100% {
    transform: rotate(45deg) scale(1);
  }
`;


export const Heart = styled.div`
  position: relative;
  width: 12px;
  height: 12px;
  background-color:${({ theme }) => theme.colors.primary60};
  transform: rotate(45deg);
  animation: ${heartbeat} 1.4s linear infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-align: center;

  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color:${({ theme }) => theme.colors.primary60};
    border-radius: 50%;
    z-index: -1;
  }

  &:before {
    transform: translateY(-50%);
  }

  &:after {
    transform: translateX(-50%);
  }
`;

export const HeartText = styled.span`
  /* transform: rotate(-45deg); */
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary60};
  position: absolute;
  bottom: -15px;
`;