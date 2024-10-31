// Header.js
import React from 'react';
import { StyledHeader, StyledLeftIcon, StyledLogo, StyledTitle, StyledTitleContainer } from './style/style';
import { Link } from 'react-router-dom';
import { StyledLink } from '../../style/styles';

const Header = () => {
  return (
    <StyledHeader>
      <StyledLeftIcon>
        <Link to="/main">
          <StyledLogo src="img/Logo_header.png" alt="Bike Icon" />
        </Link>
      </StyledLeftIcon>

      <StyledTitleContainer>
        <StyledLink to="/main">
          <StyledTitle>ride buddy</StyledTitle>
        </StyledLink>
      </StyledTitleContainer>
    </StyledHeader>
  );
};

export default Header;
