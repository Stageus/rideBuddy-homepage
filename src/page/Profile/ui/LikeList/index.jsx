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
  const [selectedName, setSelectedName] = useState(''); 
  const [showPanorama, setShowPanorama] = useState(false);

  const page = 0;
  const { data: centersData, loading: centersLoading, error: centersError } = useLikedCenters(page);
  const { data: roadsData, loading: roadsLoading, error: roadsError } = useLikedRoads(page);

  const handleClickItem = (lat, lng, name) => {
    const newLat = parseFloat(lat);
    const newLng = parseFloat(lng);

    if (
      selectedCoordinates &&
      selectedCoordinates.lat === newLat &&
      selectedCoordinates.lng === newLng
    ) {
      setShowPanorama(prev => !prev);
    } else {
      setSelectedCoordinates({ lat: newLat, lng: newLng });
      setSelectedName(name);
      setShowPanorama(true);
    }
  };

  const renderCenters = () => {
    if (centersLoading) return <div>Loading...</div>;
    if (centersError) return <div>Error: {centersError}</div>;

    return (
      <StyledListUl>
        {centersData.map((center, index) => (
          <StyledListItemLi
            key={index}
            onClick={() =>
              handleClickItem(center.latitude, center.longitude, center.center_name)
            }
          >
            <span className="icon">💙</span>
            <span>{center.center_name}</span>
          </StyledListItemLi>
        ))}
      </StyledListUl>
    );
  };

  // Render roads list
  const renderRoads = () => {
    if (roadsLoading) return <div>Loading...</div>;
    if (roadsError) return <div>Error: {roadsError}</div>;

    return (
      <StyledListUl>
        {roadsData.map((road, index) => (
          <StyledListItemLi
            key={index}
            onClick={() =>
              handleClickItem(road.latitude, road.longitude, road.road_name)
            }
          >
            <span className="icon">💙</span>
            <span>{road.road_name}</span>
          </StyledListItemLi>
        ))}
      </StyledListUl>
    );
  };

  return (
    <StyledLikeListContainerDiv>
      {showPanorama ? (
        selectedCoordinates && (
          <div>
            <StyledLikeListTitleH2>{selectedName}</StyledLikeListTitleH2>
            <StyledLikeListDescriptionP>Panorama</StyledLikeListDescriptionP>
            <Panorama latitude={selectedCoordinates.lat} longitude={selectedCoordinates.lng}/>
          </div>
        )
      ) : (
        <div>
          <StyledLikeListTitleH2>좋아요 리스트</StyledLikeListTitleH2>
          <StyledLikeListDescriptionP>Like Ridebuddy</StyledLikeListDescriptionP>
          <StyledLikeListImg src="img/Logo_list.png" alt="자전거 이미지" />
        </div>
      )}

      <StyledActionButtonContainerDiv>
        <StyledListButton
          width={'110px'}
          onClick={() => {
            setActiveTab('certification');
            setShowPanorama(false); 
          }}
          active={activeTab === 'certification'}
        >
          인증센터
        </StyledListButton>
        <StyledListButton
          width={'110px'}
          onClick={() => {
            setActiveTab('tour');
            setShowPanorama(false); 
          }}
          active={activeTab === 'tour'}
        >
          자전거길
        </StyledListButton>
      </StyledActionButtonContainerDiv>

      {activeTab === 'certification' ? renderCenters() : renderRoads()}
    </StyledLikeListContainerDiv>
  );
};

export default LikeList;
