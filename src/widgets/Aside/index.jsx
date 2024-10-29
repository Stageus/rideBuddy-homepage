// Sidebar.js
import React from 'react';
import { StyledAside, StyledIcon, StyledIconContainer, StyledLogoutButton } from './style/style';

const Aside = () => {
  return (
    <StyledAside>
      <StyledIconContainer>
        <StyledIcon src="img/icon_user.png" alt="Icon 1" />
        <StyledIcon src="img/icon_map_pin.png" alt="Icon 2" />
        <StyledIcon src="img/icon_navigation.png" alt="Icon 3" />
      </StyledIconContainer>
      <StyledLogoutButton>
        <StyledIcon src="img/icon_logout.png" alt="Logout" />
      </StyledLogoutButton>
    </StyledAside>
  );
};

export default Aside;
