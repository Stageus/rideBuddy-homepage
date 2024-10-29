// Aside.styles.js
import styled from "styled-components";

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
  background-color: #ffffff;
  padding: 20px 0;
  z-index: 999;
`;

export const StyledIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const StyledIcon = styled.img`
  width: 30px;
  height: 30px;
  opacity: 0.7;
`;

export const StyledLogoutButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;
