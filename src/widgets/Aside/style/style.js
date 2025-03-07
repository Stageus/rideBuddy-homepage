// style/style.js
import styled from 'styled-components';

export const StyledAside = styled.aside`
  position: fixed;
  top: 60px;
  left: 0;
  width: 80px;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 20px 0;
  z-index: 999;
  transition: transform 0.3s ease;

  @media (max-width: 1024px) {
    transform: ${({ $isHovered }) => ($isHovered ? 'translateX(0)' : 'translateX(-100%)')};
  }
`;

export const StyledTriggerArea = styled.div`
  position: fixed;
  top: 60px;
  left: 0;
  width: 80px;
  height: calc(100vh - 100px);
  z-index: 998;
`;


export const StyledIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;


export const StyledIcon = styled.img`
  width: 26px;
  height: 26px;
  cursor: pointer;
`;

