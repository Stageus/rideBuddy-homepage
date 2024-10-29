// Header.js
import React from 'react';
import { StyledHeader, StyledLeftIcon, StyledLogo, StyledTitle, StyledTitleContainer } from './style/style';

const Header = () => {
  return (
    <StyledHeader>
      <StyledLeftIcon>
        <StyledLogo src="img/Logo_header.png" alt="Bike Icon" />
      </StyledLeftIcon>
      <StyledTitleContainer>
        <StyledTitle>ride buddy</StyledTitle>
      </StyledTitleContainer>
    </StyledHeader>
  );
};

export default Header;
