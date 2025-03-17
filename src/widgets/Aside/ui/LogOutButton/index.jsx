import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledIcon } from '../../style/style';
import { StyledLogoutButton } from './style/style';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("OAuth");
    navigate("/login"); 
  };

  return (
    <StyledLogoutButton onClick={handleLogout}>
      <StyledIcon src="img/icon_logout.png" alt="Logout Icon" />
    </StyledLogoutButton>
  );
};

export default LogoutButton;
