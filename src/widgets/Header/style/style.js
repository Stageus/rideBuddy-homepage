// Header.styles.js
import styled from "styled-components";

export const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #ffffff;
  z-index: 1000;
`;

export const StyledLeftIcon = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledLogo = styled.img`
  width: 40px;
  height: 40px;
`;

export const StyledTitleContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

export const StyledTitle = styled.h1`
  font-size: 24px;
  color: #4a73f3;
  font-weight: normal;
`;
