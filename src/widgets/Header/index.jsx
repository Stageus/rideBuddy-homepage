// Header.js
import React from 'react';
import { StyledHeader, StyledLeftIcon, StyledLogo, StyledTitle, StyledTitleContainer } from './style/style';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <StyledHeader>
      <StyledLeftIcon>
        <Link to="/main">
          <StyledLogo src="img/Logo_header.png" alt="Bike Icon" />
        </Link>
      </StyledLeftIcon>
      <Link to="/main">
        <StyledTitleContainer>
          <StyledTitle>ride buddy</StyledTitle>
        </StyledTitleContainer>
      </Link>
    </StyledHeader>
  );
};

export default Header;
