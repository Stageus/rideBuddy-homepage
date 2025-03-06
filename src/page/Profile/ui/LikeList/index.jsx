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

const LikeList = () => {
  const [activeTab, setActiveTab] = useState('certification');
  const page = 0; 
  const {
    data: centersData,
    loading: centersLoading,
    error: centersError,
    refetch: refetchCenters,
  } = useLikedCenters(page);

  const {
    data: roadsData,
    loading: roadsLoading,
    error: roadsError,
    refetch: refetchRoads,
  } = useLikedRoads(page);

  const renderCenters = () => {
    if (centersLoading) return <div>Loading...</div>;
    if (centersError) return <div>Error: {centersError}</div>;
    return (
      <StyledListUl>
        {centersData.map((center, index) => (
          <StyledListItemLi key={index}>
            <span className="icon">💙</span>
            <span>{center.center_name}</span>
          </StyledListItemLi>
        ))}
      </StyledListUl>
    );
  };

  const renderRoads = () => {
    if (roadsLoading) return <div>Loading...</div>;
    if (roadsError) return <div>Error: {roadsError}</div>;
    return (
      <StyledListUl>
        {roadsData.map((road, index) => (
          <StyledListItemLi key={index}>
            <span className="icon">💙</span>
            <span>{road.road_name}</span>
          </StyledListItemLi>
        ))}
      </StyledListUl>
    );
  };

  return (
    <StyledLikeListContainerDiv>
      <StyledLikeListTitleH2>좋아요 리스트</StyledLikeListTitleH2>
      <StyledLikeListDescriptionP>Like Ridebuddy</StyledLikeListDescriptionP>

      <StyledLikeListImg src="img/Logo_list.png" alt="자전거 이미지" />

      {/* 탭 버튼 */}
      <StyledActionButtonContainerDiv>
        <StyledListButton
          width={'110px'}
          onClick={() => setActiveTab('certification')}
          active={activeTab === 'certification'}
        >
          인증 센터
        </StyledListButton>
        <StyledListButton
          width={'110px'}
          onClick={() => setActiveTab('tour')}
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
