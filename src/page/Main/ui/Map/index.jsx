import React, { useRef, useEffect } from 'react';
import useInitializeMap from './model/useInitializeMap';
import useUserLocation from '../../../../shared/api/useUserLocation';
import useResultMarker from './model/useMarkers';
import useMapBounds from './model/useMapBounds';
import useFetchInfoPin from './model/useFetchInfoPin';
import MarkerDetailContainer from './ui/MakerDetail';
import { StyledMapWrap } from './style/style';

const Map = () => {
  const mapRef = useRef(null);
  const userLocation = useUserLocation();
  const mapWrapper = useInitializeMap(mapRef, userLocation);

  // 마커 생성/업데이트 (Recoil 상태 기반)
  useResultMarker(mapWrapper);

  // 지도 좌표 경계(SW, NE)를 저장하는 커스텀 훅 적용
  const { sw, ne } = useMapBounds(mapWrapper);
  console.log('Current Map Bounds:', sw, ne);

  // API 호출 훅
  const { data, error, loading, fetchInfoPin } = useFetchInfoPin();

  // SW, NE 좌표가 준비되면 API 호출 (좌표 형식을 API 스펙에 맞게 변환)
  useEffect(() => {
    if (sw && ne) {
      fetchInfoPin(
        { longitude: sw.lng, latitude: sw.lat },
        { longitude: ne.lng, latitude: ne.lat }
      );
    }
  }, [sw, ne, fetchInfoPin]);

  // API 응답값이나 에러가 있으면 콘솔에 출력
  useEffect(() => {
    if (data) {
      console.log('API Response:', data);
    }
    if (error) {
      console.log('API Error:', error);
    }
  }, [data, error]);

  return (
    <StyledMapWrap>
      <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />
      <MarkerDetailContainer />
      {/* 디버깅용: 현재 지도 경계 좌표 표시 */}
      {sw && ne && (
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            background: '#fff',
            padding: '10px',
            zIndex: 1000,
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
        >
          <div>
            <strong>SW:</strong> {sw.lat}, {sw.lng}
          </div>
          <div>
            <strong>NE:</strong> {ne.lat}, {ne.lng}
          </div>
        </div>
      )}
    </StyledMapWrap>
  );
};

export default Map;
