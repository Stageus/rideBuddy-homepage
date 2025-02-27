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
import useLikeRoad from '../api/useLikeRoad';

const MarkerDetail = ({ name, address, distance, idx, onClose, latitude, longitude }) => {
  const { likeRoad, loading, error, likeCount } = useLikeRoad();

  const handleLike = () => {
    if (!loading) {
      likeRoad(idx);
    }
  };

  return (
    <StyledMarkerDetailDiv>
      <StyledCloseButtonDiv onClick={onClose}></StyledCloseButtonDiv>
      <StyledMarkerImageContainerDiv>
        <Panorama latitude={latitude} longitude={longitude} />
        <StyledLikeIconDiv onClick={handleLike}>
          {loading ? '⏳' : '💖'}
        </StyledLikeIconDiv>
      </StyledMarkerImageContainerDiv>
      <StyledMarkerTitleH4>{name}</StyledMarkerTitleH4>
      <StyledMarkerAddressP>{address}</StyledMarkerAddressP>
      <StyledMarkerLikeButton onClick={handleLike}>
        {loading ? '좋아요 중...' : `좋아요 (${likeCount !== null ? likeCount : '0'})`}
      </StyledMarkerLikeButton>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </StyledMarkerDetailDiv>
  );
};

MarkerDetail.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  distance: PropTypes.string,
  roadIdx: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

export default MarkerDetail;
