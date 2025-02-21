import { useEffect, useRef } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { currentMarkerState, selectedResultState } from '../../../../../shared/recoil/atoms/atomState';

const useResultMarker = (mapWrapper) => {
  const markerRef = useRef(null);
  const currentMarker = useRecoilValue(currentMarkerState);
  const setSelectedResult = useSetRecoilState(selectedResultState);

  useEffect(() => {
    const { naver } = window;
    // 기존 마커 제거
    if (markerRef.current) {
      markerRef.current.setMap(null);
      markerRef.current = null;
    }
    if (mapWrapper && currentMarker) {
      const lat = parseFloat(currentMarker.latitude);
      const lng = parseFloat(currentMarker.longitude);
      if (isNaN(lat) || isNaN(lng)) {
        console.error('유효하지 않은 좌표 데이터:', currentMarker);
        return;
      }
      const position = new naver.maps.LatLng(lat, lng);
      const actualMap = mapWrapper.map ? mapWrapper.map : mapWrapper;
      const marker = new naver.maps.Marker({
        position,
        map: actualMap,
        title: currentMarker.road_name || currentMarker.name,
        icon: {
          content: `
            <div style="width: 45px; height: 45px; background-color: none; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
              <img src="/img/Marker_Y.png" style="width: 100%; height: 100%;" alt="Detail Marker" />
            </div>
          `,
        },
      });
      markerRef.current = marker;
      // 지도 중심 이동 (부드럽게)
      if (actualMap && typeof actualMap.panTo === 'function') {
        actualMap.panTo(position);
        console.log('지도 중심 이동 (panTo):', position);
      } else if (actualMap && typeof actualMap.setCenter === 'function') {
        actualMap.setCenter(position);
        console.log('지도 중심 이동 (setCenter):', position);
      } else {
        console.warn('지도 중심 이동 함수가 없습니다:', actualMap);
      }
      // 마커 클릭 시에만 selectedResultState를 업데이트하여 팝업을 띄움
      naver.maps.Event.addListener(marker, 'click', () => {
        setSelectedResult(currentMarker);
      });
    }
  }, [mapWrapper, currentMarker, setSelectedResult]);

  return markerRef.current;
};

export default useResultMarker;
