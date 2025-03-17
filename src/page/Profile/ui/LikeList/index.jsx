import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  const [centersPage, setCentersPage] = useState(0);
  const [roadsPage, setRoadsPage] = useState(0);

  const observerRef = useRef(null);

  const { data: centersData, loading: centersLoading, error: centersError, hasMore: centersHasMore } = useLikedCenters(centersPage);
  const { data: roadsData, loading: roadsLoading, error: roadsError, hasMore: roadsHasMore } = useLikedRoads(roadsPage);

  const handleClickItem = (lat, lng, name) => {
    const newLat = parseFloat(lat);
    const newLng = parseFloat(lng);

    if (
      selectedCoordinates &&
      selectedCoordinates.lat === newLat &&
      selectedCoordinates.lng === newLng
    ) {
      setShowPanorama((prev) => !prev);
    } else {
      setSelectedCoordinates({ lat: newLat, lng: newLng });
      setSelectedName(name);
      setShowPanorama(true);
    }
  };

  // Intersection Observer 설정
  const lastItemRef = useCallback(
    (node) => {
      if (centersLoading || roadsLoading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && (centersHasMore || roadsHasMore)) {
          if (activeTab === 'certification' && centersHasMore) {
            setCentersPage((prev) => prev + 1);
          } else if (activeTab === 'tour' && roadsHasMore) {
            setRoadsPage((prev) => prev + 1);
          }
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [centersLoading, roadsLoading, centersHasMore, roadsHasMore, activeTab]
  );

  const renderCenters = () => {
    if (centersError) return <div>Error: {centersError}</div>;

    return (
      <StyledListUl>
        {centersData.map((center, index) => {
          const isLastItem = centersData.length === index + 1;
          return (
            <StyledListItemLi
              key={index}
              ref={isLastItem ? lastItemRef : null} // 마지막 아이템에 ref 추가
              onClick={() =>
                handleClickItem(center.latitude, center.longitude, center.center_name)
              }
            >
              <span className="icon">💙</span>
              <span>{center.center_name}</span>
            </StyledListItemLi>
          );
        })}
        {centersLoading && <div>Loading more...</div>}
      </StyledListUl>
    );
  };

  const renderRoads = () => {
    if (roadsError) return <div>Error: {roadsError}</div>;

    return (
      <StyledListUl>
        {roadsData.map((road, index) => {
          const isLastItem = roadsData.length === index + 1;
          return (
            <StyledListItemLi
              key={index}
              ref={isLastItem ? lastItemRef : null} // 마지막 아이템에 ref 추가
              onClick={() =>
                handleClickItem(road.latitude, road.longitude, road.road_name)
              }
            >
              <span className="icon">💙</span>
              <span>{road.road_name}</span>
            </StyledListItemLi>
          );
        })}
        {roadsLoading && <div>Loading more...</div>}
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