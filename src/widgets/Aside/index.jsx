import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { StyledAside, StyledIcon, StyledIconContainer, StyledLogoutButton, StyledTriggerArea } from './style/style';
import { dummyCenters } from './asset/dummyCenters';
import { dummyRoads } from './asset/dummyRoads';

const Aside = ({ setSelectedData }) => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const [isCentersVisible, setIsCentersVisible] = useState(false);
  const [isRoadsVisible, setIsRoadsVisible] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleMapIconClick = () => {
    setIsCentersVisible(prev => !prev);
    setIsRoadsVisible(false);
    setSelectedData(prev => (isCentersVisible ? [] : dummyCenters));
  };

  const handleNavigationIconClick = () => {
    setIsRoadsVisible(prev => !prev);
    setIsCentersVisible(false);
    setSelectedData(prev => (isRoadsVisible ? [] : dummyRoads));
  };

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
              <StyledIcon src="img/icon_map_pin.png" alt="Map Icon" onClick={handleMapIconClick} />
              <StyledIcon src="img/icon_navigation.png" alt="Navigation Icon" onClick={handleNavigationIconClick} />
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
