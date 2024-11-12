import React from 'react';
import { Link } from 'react-router-dom';
import { StyledIcon } from '../../style/style';
import { StyledLogoutButton } from './style/style';

const LogoutButton = () => (
  <Link to="/login">
    <StyledLogoutButton>
      <StyledIcon src="img/icon_logout.png" alt="Logout Icon" />
    </StyledLogoutButton>
  </Link>
);

export default LogoutButton;
