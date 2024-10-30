import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { StyledAside, StyledIcon, StyledIconContainer, StyledLogoutButton, StyledTriggerArea } from './style/style';

const Aside = () => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation(); // 현재 경로를 가져옴

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <>
      <StyledTriggerArea onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />

      {/* 어사이드 바 */}
      <StyledAside isHovered={isHovered} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <StyledIconContainer>
          {/* /profile 경로일 때는 User 아이콘과 Logout 아이콘만 표시 */}
          <StyledIcon src="img/icon_user.png" alt="User Icon" />
          {location.pathname !== '/profile' && (
            <>
              <StyledIcon src="img/icon_map_pin.png" alt="Map Icon" />
              <StyledIcon src="img/icon_navigation.png" alt="Navigation Icon" />
            </>
          )}
        </StyledIconContainer>
        <StyledLogoutButton>
          <StyledIcon src="img/icon_logout.png" alt="Logout Icon" />
        </StyledLogoutButton>
      </StyledAside>
    </>
  );
};

export default Aside;
