// usePinMarkers.js
import { useEffect, useRef } from 'react';
import { markerSourceState, selectedResultState } from '../../../../../shared/recoil/atoms/atomState';
import { useRecoilValue, useSetRecoilState } from 'recoil';

function usePinMarkers(mapWrapper, data) {
  const currentMarkerSource = useRecoilValue(markerSourceState);
  const setSelectedResult = useSetRecoilState(selectedResultState); // 추가
  const markersRef = useRef([]);

  useEffect(() => {
    if (!mapWrapper?.map || !data) return;

    // 기존 마커 제거
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // markerSourceState에 값이 있으면 마커 생성하지 않고 종료 (기존 로직)
    if (currentMarkerSource) {
      return;
    }

    // markerSourceState에 값이 없을 경우 새 마커 생성
    const newMarkers = data.map((item) => {
      const { latitude, longitude, name } = item;
      const position = new naver.maps.LatLng(+latitude, +longitude);

      const marker = new naver.maps.Marker({
        position,
        map: mapWrapper.map,
        title: name,
        icon: {
          content: [
            '<div style="width: 45px; height: 45px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">',
            '  <img src="/img/Marker_Y.png" style="width: 100%; height: 100%;" alt="Marker" />',
            '</div>'
          ].join(''),
          anchor: new naver.maps.Point(22.5, 45)
        }
      });

      // ★ 마커 클릭 시 -> Recoil State 업데이트
      naver.maps.Event.addListener(marker, 'click', () => {
        console.log('Marker Clicked:', item);
        setSelectedResult(item);
      });

      return marker;
    });

    markersRef.current = newMarkers;

    // 클린업
    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];
    };
  }, [mapWrapper, data, currentMarkerSource, setSelectedResult]);

  // 필요한 경우 markersRef.current 반환
}

export default usePinMarkers;
