import React, { useRef, useEffect } from 'react';
import useInitializeMap from './model/useInitializeMap';
import useUserLocation from '../../../../shared/api/useUserLocation';
import useResultMarker from './model/useMarkers'; // 기존 훅
import useMapBounds from './model/useMapBounds';
import useFetchInfoPin from './model/useFetchInfoPin';
import MarkerDetailContainer from './ui/MakerDetail';
import { StyledMapWrap } from './style/style';
import usePinMarkers from './model/usePinMarkers';
import { centersState, markerSourceState, roadsState, searchResultsState, selectedItemState, selectedResultState } from '../../../../shared/recoil/atoms/atomState';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const Map = () => {
  const mapRef = useRef(null);
  const userLocation = useUserLocation();
  const mapWrapper = useInitializeMap(mapRef, userLocation);
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState);
  const markerSource = useRecoilValue(markerSourceState);
  const selectedResult = useRecoilValue(selectedResultState);


  // 기존 마커 관련 로직 (Recoil 상태 기반)
  useResultMarker(mapWrapper);

  // 지도 좌표 경계
  const { sw, ne } = useMapBounds(mapWrapper);

  // API 호출 훅
  const { data, error, loading, fetchInfoPin } = useFetchInfoPin();

  // 지도 범위 변경될 때마다 API 호출
  useEffect(() => {
    if (sw && ne) {
      const timeoutId = setTimeout(() => {
        if (markerSource !== 'search' && markerSource !== 'centers' && markerSource !== 'roads') {
          fetchInfoPin({ longitude: sw.lng, latitude: sw.lat }, { longitude: ne.lng, latitude: ne.lat });
          setSelectedItem(null)
        }
      }, 300);

      // 의존성이 변경되거나 컴포넌트 언마운트 시 타이머 제거
      return () => clearTimeout(timeoutId);
    }
  }, [sw, ne, fetchInfoPin]);

  usePinMarkers(mapWrapper, data);

  return (
    <StyledMapWrap>
      <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />
      {selectedResult && <MarkerDetailContainer />}
      {/* 지도 경계 디버그 */}
    {/*   {sw && ne && (
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            background: '#fff',
            padding: '10px',
            zIndex: 1000,
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          <div>
            <strong>SW:</strong> {sw.lat}, {sw.lng}
          </div>
          <div>
            <strong>NE:</strong> {ne.lat}, {ne.lng}
          </div>
        </div>
      )} */}
    </StyledMapWrap>
  );
};

export default Map;
