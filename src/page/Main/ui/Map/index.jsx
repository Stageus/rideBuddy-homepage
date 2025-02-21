import React, { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import useInitializeMap from './model/useInitializeMap';
import useUserLocation from '../../../../shared/api/useUserLocation';
import useResultMarker from './model/useMarkers';
import MarkerDetailContainer from './ui/MakerDetail';
import { StyledMapWrap } from './style/style';


const Map = () => {
  const mapRef = useRef(null);
  const userLocation = useUserLocation();
  const mapWrapper = useInitializeMap(mapRef, userLocation);
  // useResultMarker는 currentMarkerState를 기반으로 마커를 생성하며,
  // 마커 클릭 시 selectedResultState를 업데이트합니다.
  useResultMarker(mapWrapper);

  return (
    <StyledMapWrap>
      <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />
      <MarkerDetailContainer />
    </StyledMapWrap>
  );
};

export default Map;
