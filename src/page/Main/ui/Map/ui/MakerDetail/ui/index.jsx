import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  StyledMarkerDetailDiv,
  StyledMarkerImageContainerDiv,
  StyledLikeIconDiv,
  StyledMarkerTitleH4,
  StyledMarkerAddressP,
  StyledMarkerLikeButton,
  StyledCloseButtonDiv,
  Heart,
  HeartText,
} from '../style/style';
import Panorama from './Panorama';
import useLikeRoad from '../api/useLikeRoad';
import useLikeCenters from '../api/useLikeCenters';

const MarkerDetail = ({
  idx,
  name,
  latitude,
  longitude,
  like,
  setSelectedResult,
  addr,
  markerSource
}) => {
  const { likeRoad, loading: roadLoading, error: roadError, setLikeCount: setRoadLikeCount } = useLikeRoad();
  const { likeCenter, loading: centerLoading, error: centerError, setLikeCount: setCenterLikeCount } = useLikeCenters();
  
  const [localLikeCount, setLocalLikeCount] = useState(like);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (markerSource === 'road') {
      setRoadLikeCount(like);
    } else if (markerSource === 'center') {
      setCenterLikeCount(like);
    }
  }, [like, markerSource, setRoadLikeCount, setCenterLikeCount]);

  const handleLikeClick = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (markerSource === 'center') {
        const response = await likeCenter(idx);
        if (response && response["center likeCount"] !== undefined) {
          setLocalLikeCount(response["center likeCount"]);
        }
      } else if (markerSource === 'road') {
        const response = await likeRoad(idx);
        if (response && response["road likeCount"] !== undefined) {
          setLocalLikeCount(response["road likeCount"]);
        }
      }
    } catch (err) {
      setError(markerSource === 'center' ? centerError : roadError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledMarkerDetailDiv>
      <StyledCloseButtonDiv onClick={() => setSelectedResult(null)} />
      
      <StyledMarkerImageContainerDiv>
        <Panorama latitude={latitude} longitude={longitude} />
      </StyledMarkerImageContainerDiv>
      
      <StyledLikeIconDiv>
        <Heart />
        <HeartText>{localLikeCount}</HeartText>
      </StyledLikeIconDiv>
      
      <StyledMarkerTitleH4>{name}</StyledMarkerTitleH4>
      <StyledMarkerAddressP>{addr}</StyledMarkerAddressP>
      
      <StyledMarkerLikeButton 
        onClick={handleLikeClick}
        disabled={isLoading || roadLoading || centerLoading}
      >
        좋아요
      </StyledMarkerLikeButton>
    </StyledMarkerDetailDiv>
  );
};

export default MarkerDetail;