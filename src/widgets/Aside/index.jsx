import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { selectedDataState, markerSourceState } from '../../shared/recoil/atoms/atomState';
import { StyledAside, StyledIcon, StyledIconContainer, StyledLogoutButton, StyledTriggerArea } from './style/style';
import { dummyCenters } from '../../assets/dummyCenters';
import { dummyRoads } from '../../assets/dummyRoads';
const Aside = () => {
  
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const [isCentersVisible, setIsCentersVisible] = useState(false); // 인증센터 마커 토글 상태
  const [isRoadsVisible, setIsRoadsVisible] = useState(false); // 자전거길 마커 토글 상태
  const setSelectedData = useSetRecoilState(selectedDataState);
  const setMarkerSource = useSetRecoilState(markerSourceState);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Map Icon 클릭 시 인증센터 마커 토글
  const handleMapIconClick = () => {
    const newCentersVisible = !isCentersVisible;
    setIsCentersVisible(newCentersVisible);
    setIsRoadsVisible(false); // 자전거길 마커 비활성화
    setMarkerSource(newCentersVisible ? 'aside' : ''); // 현재 마커 소스 설정
    setSelectedData(newCentersVisible ? dummyCenters : []); // 인증센터 마커 표시 또는 숨김
  };

  // Navigation Icon 클릭 시 자전거길 마커 토글
  const handleNavigationIconClick = () => {
    const newRoadsVisible = !isRoadsVisible;
    setIsRoadsVisible(newRoadsVisible);
    setIsCentersVisible(false); // 인증센터 마커 비활성화
    setMarkerSource(newRoadsVisible ? 'aside' : ''); // 현재 마커 소스 설정
    setSelectedData(newRoadsVisible ? dummyRoads : []); // 자전거길 마커 표시 또는 숨김
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
