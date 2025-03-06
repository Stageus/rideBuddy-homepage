import React, { useState } from 'react';

import {
  StyledListButton,
  StyledActionButtonContainerDiv,
  StyledLikeListContainerDiv,
  StyledLikeListDescriptionP,
  StyledLikeListImg,
  StyledLikeListTitleH2,
  StyledListUl,
  StyledListItemLi,
} from './style/style';

import useLikedCenters from './api/useLikedCenters';
import useLikedRoads from './api/useLikedBikePaths';
import Panorama from './ui/Panorama';

const LikeList = () => {
  const [activeTab, setActiveTab] = useState('certification');
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [showPanorama, setShowPanorama] = useState(false);

  const page = 0;
  const { data: centersData, loading: centersLoading, error: centersError } = useLikedCenters(page);

  const { data: roadsData, loading: roadsLoading, error: roadsError } = useLikedRoads(page);

  // 리스트 클릭 시 실행할 핸들러
  const handleClickItem = (lat, lng) => {
    const newLat = parseFloat(lat);
    const newLng = parseFloat(lng);

    if (selectedCoordinates && selectedCoordinates.lat === newLat && selectedCoordinates.lng === newLng) {
      // 같은 아이템을 클릭하면 showPanorama 토글
      setShowPanorama(prev => !prev);
    } else {
      // 다른 아이템을 클릭하면 새 좌표로 파노라마 표시
      setSelectedCoordinates({ lat: newLat, lng: newLng });
      setShowPanorama(true);
    }
  };

  // 인증 센터 리스트 렌더링
  const renderCenters = () => {
    if (centersLoading) return <div>Loading...</div>;
    if (centersError) return <div>Error: {centersError}</div>;

    return (
      <StyledListUl>
        {centersData.map((center, index) => (
          <StyledListItemLi key={index} onClick={() => handleClickItem(center.latitude, center.longitude)}>
            <span className="icon">💙</span>
            <span>{center.center_name}</span>
          </StyledListItemLi>
        ))}
      </StyledListUl>
    );
  };

  // 국토 종주(도로) 리스트 렌더링
  const renderRoads = () => {
    if (roadsLoading) return <div>Loading...</div>;
    if (roadsError) return <div>Error: {roadsError}</div>;

    return (
      <StyledListUl>
        {roadsData.map((road, index) => (
          <StyledListItemLi key={index} onClick={() => handleClickItem(road.latitude, road.longitude)}>
            <span className="icon">💙</span>
            <span>{road.road_name}</span>
          </StyledListItemLi>
        ))}
      </StyledListUl>
    );
  };

  return (
    <StyledLikeListContainerDiv>
      {/* showPanorama가 true면 파노라마, false면 상단 영역 */}
      {showPanorama ? (
        selectedCoordinates && (
          <div>
            <Panorama latitude={selectedCoordinates.lat} longitude={selectedCoordinates.lng} />
          </div>
        )
      ) : (
        <div>
          <StyledLikeListTitleH2>좋아요 리스트</StyledLikeListTitleH2>
          <StyledLikeListDescriptionP>Like Ridebuddy</StyledLikeListDescriptionP>
          <StyledLikeListImg src="img/Logo_list.png" alt="자전거 이미지" />
        </div>
      )}

      {/* 탭 버튼 */}
      <StyledActionButtonContainerDiv>
        <StyledListButton
          width={'110px'}
          onClick={() => {
            setActiveTab('certification');
            setShowPanorama(false); // 탭 전환 시 파노라마 -> 상단 영역으로 전환
          }}
          active={activeTab === 'certification'}
        >
          인증 센터
        </StyledListButton>
        <StyledListButton
          width={'110px'}
          onClick={() => {
            setActiveTab('tour');
            setShowPanorama(false); // 탭 전환 시 파노라마 -> 상단 영역으로 전환
          }}
          active={activeTab === 'tour'}
        >
          국토 종주
        </StyledListButton>
      </StyledActionButtonContainerDiv>

      {/* 탭에 따른 리스트 출력 */}
      {activeTab === 'certification' ? renderCenters() : renderRoads()}
    </StyledLikeListContainerDiv>
  );
};

export default LikeList;
