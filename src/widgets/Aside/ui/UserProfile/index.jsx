import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { StyledIcon } from '../../style/style';

const UserProfile = () => {
  
  return (
    <Link to="/profile">
      <StyledIcon src="img/icon_user.png" alt="User Icon" />
    </Link>
  );
};

export default UserProfile;
