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
} from './style/style';
import Panorama from '../Panorama';

const MarkerDetail = ({ name, address, distance, imageUrl, onLike, onClose, latitude, longitude }) => {
  return (
    <StyledMarkerDetailDiv>
      <StyledCloseButtonDiv onClick={onClose}></StyledCloseButtonDiv> {/* 닫기 버튼 */}
      <StyledMarkerImageContainerDiv>
        <Panorama latitude={latitude} longitude={longitude} /> {/* 파노라마 뷰 추가 */}
        <StyledLikeIconDiv onClick={onLike}>💖</StyledLikeIconDiv>
      </StyledMarkerImageContainerDiv>
      <StyledMarkerTitleH4>{name}</StyledMarkerTitleH4>
      {/* <StyledMarkerAddressP>{address}</StyledMarkerAddressP> */}
      <StyledMarkerLikeButton>좋아요</StyledMarkerLikeButton>
    </StyledMarkerDetailDiv>
  );
};

MarkerDetail.propTypes = {
  name: PropTypes.string.isRequired,
  //   address: PropTypes.string.isRequired,
  distance: PropTypes.string,
  //   imageUrl: PropTypes.string,
  onLike: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

export default MarkerDetail;
