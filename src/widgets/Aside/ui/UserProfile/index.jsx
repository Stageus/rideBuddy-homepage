import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { StyledIcon } from '../../style/style';
import { StyledIconDiv } from './style/style';

const UserProfile = () => {
  
  return (
    <Link to="/profile">
      <StyledIconDiv>
      <StyledIcon src="img/icon_user.svg" alt="User Icon" />
      프로필
      </StyledIconDiv>
    </Link>
  );
};

export default UserProfile;
