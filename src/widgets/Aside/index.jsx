import React, { useState } from 'react';
import { StyledAside, StyledIconContainer, StyledTriggerArea } from './style/style';
import UserProfile from './ui/UserProfile';
import Menu from './ui/Menu';
import { useLocation } from 'react-router-dom';
import LogoutButton from './ui/LogOutButton';

const Aside = () => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <>
      <StyledTriggerArea onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
      <StyledAside $isHovered={isHovered} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <StyledIconContainer>
          <UserProfile />
          {location.pathname !== '/profile' && <Menu />}
        </StyledIconContainer>
        <LogoutButton />
      </StyledAside>
    </>
  );
};

export default Aside;
