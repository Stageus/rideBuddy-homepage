import React from 'react';
import { StyledHeader, StyledLeftIcon, StyledLogo, StyledTitle, StyledTitleContainer } from './style/style';
import { StyledLink } from '../../style/styles';

const Header = () => {
  const handleNavigation = e => {
    e.preventDefault();
    window.location.href = '/main';
  };

  return (
    <StyledHeader>
      <StyledLeftIcon>
        <a href="/main" onClick={handleNavigation}>
          <StyledLogo src="img/Logo_header.png" alt="Bike Icon" />
        </a>
      </StyledLeftIcon>

      <StyledTitleContainer>
        <a href="/main" onClick={handleNavigation}>
          <StyledTitle>ride buddy</StyledTitle>
        </a>
      </StyledTitleContainer>
    </StyledHeader>
  );
};

export default Header;
