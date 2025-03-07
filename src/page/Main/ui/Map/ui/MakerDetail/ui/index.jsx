import React from 'react';
import PropTypes from 'prop-types';
import {
  StyledMarkerDetailDiv,
  StyledMarkerImageContainerDiv,
  StyledLikeIconDiv,
  StyledMarkerTitleH4,
  StyledMarkerAddressP,
  StyledMarkerLikeButton,
  StyledCloseButtonDiv,
} from '../style/style';
import Panorama from './Panorama';

const MarkerDetail = ({
  name,
  address,
  distance,
  idx,
  onClose,
  latitude,
  longitude,
  like,
  onLike,
  likeCount,
  error,
}) => {
  return (
    <StyledMarkerDetailDiv>
      <StyledCloseButtonDiv onClick={onClose} />
      <StyledMarkerImageContainerDiv>
        <Panorama latitude={latitude} longitude={longitude} />
      </StyledMarkerImageContainerDiv>
      
      <StyledLikeIconDiv onClick={onLike}>
        {likeCount !== null ? likeCount : like}
      </StyledLikeIconDiv>
      
      <StyledMarkerTitleH4>{name}</StyledMarkerTitleH4>
      <StyledMarkerAddressP>{address}</StyledMarkerAddressP>
      
      <StyledMarkerLikeButton onClick={onLike}>
        좋아요
      </StyledMarkerLikeButton>
       {error && <p style={{ color: 'red' }}>{error}</p>}
    </StyledMarkerDetailDiv>
  );
};

export default MarkerDetail;
