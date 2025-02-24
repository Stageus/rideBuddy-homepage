import { useEffect, useRef } from 'react';
import { markerSourceState } from '../../../../../shared/recoil/atoms/atomState';
import { useRecoilValue } from 'recoil';

function usePinMarkers(mapWrapper, data) {
  const currentMarkerSource = useRecoilValue(markerSourceState);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!mapWrapper?.map || !data) return;

    // 기존 마커 제거 (있다면)
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // markerSourceState에 값이 있으면 마커를 생성하지 않고 종료
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
          content: `
            <div style="width: 45px; height: 45px; background-color: none; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
              <img src="/img/Marker_Y.png" style="width: 100%; height: 100%;" alt="Detail Marker" />
            </div>
          `,
        },
      });

      naver.maps.Event.addListener(marker, 'click', () => {
        console.log('Marker Clicked:', item);
      });

      return marker;
    });

    markersRef.current = newMarkers;

    // 클린업: 의존성이 바뀌거나 컴포넌트가 언마운트될 때 마커 제거
    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];
    };
  }, [mapWrapper, data, currentMarkerSource]);

  // 필요한 경우 markersRef.current를 반환하거나 추가 기능 구현 가능
}

export default usePinMarkers;
