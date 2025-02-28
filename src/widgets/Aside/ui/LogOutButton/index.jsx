import React from 'react';
import { StyledIcon } from '../../style/style';
import { StyledLogoutButton } from './style/style';

const LogoutButton = () => {

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <StyledLogoutButton onClick={handleLogout}>
      <StyledIcon src="img/icon_logout.png" alt="Logout Icon" />
    </StyledLogoutButton>
  );
};

export default LogoutButton;