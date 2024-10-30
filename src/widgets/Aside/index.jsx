import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { StyledAside, StyledIcon, StyledIconContainer, StyledLogoutButton, StyledTriggerArea } from './style/style';

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
          <Link to="/profile">
            <StyledIcon src="img/icon_user.png" alt="User Icon" />
          </Link>
          {location.pathname !== '/profile' && (
            <>
              <StyledIcon src="img/icon_map_pin.png" alt="Map Icon" />
              <StyledIcon src="img/icon_navigation.png" alt="Navigation Icon" />
            </>
          )}
        </StyledIconContainer>
        <Link to="/login">
          <StyledLogoutButton>
            <StyledIcon src="img/icon_logout.png" alt="Logout Icon" />
          </StyledLogoutButton>
        </Link>
      </StyledAside>
    </>
  );
};

export default Aside;
