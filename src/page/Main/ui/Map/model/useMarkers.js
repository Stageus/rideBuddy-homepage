import { useEffect, useRef } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { currentMarkerState, markerSourceState, selectedResultState } from '../../../../../shared/recoil/atoms/atomState';

const useResultMarker = mapWrapper => {
  const markerRef = useRef(null);
  const currentMarker = useRecoilValue(currentMarkerState);
  const setSelectedResult = useSetRecoilState(selectedResultState);
  // Add a setter to clear the current marker state
  const setCurrentMarker = useSetRecoilState(currentMarkerState);
  const setMarkerSourceState = useSetRecoilState(markerSourceState);

  // Effect to create and update the marker when currentMarker changes
  useEffect(() => {
    const { naver } = window;
    // Remove existing marker if it exists
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
          content: [
            '<div style="width: 45px; height: 45px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">',
            '  <img src="/img/Marker_Y.png" style="width: 70%; height: 100%;" alt="Marker" />',
            '</div>',
          ].join(''),
          anchor: new naver.maps.Point(22.5, 45),
        },
      });
      markerRef.current = marker;
      // 지도 중심 이동 (부드럽게)
      if (actualMap && typeof actualMap.panTo === 'function') {
        actualMap.setCenter(position);
        // console.log('지도 중심 이동 (panTo):', position);
      } else if (actualMap && typeof actualMap.setCenter === 'function') {
        // actualMap.setCenter(position);
        // console.log('지도 중심 이동 (setCenter):', position);
      } else {
        console.warn('지도 중심 이동 함수가 없습니다:', actualMap);
      }
      // 마커 클릭 시에만 selectedResultState를 업데이트하여 팝업을 띄움
      naver.maps.Event.addListener(marker, 'click', () => {
        setSelectedResult(currentMarker);
      });
    }
  }, [mapWrapper, currentMarker, setSelectedResult]);

  // New effect: clear currentMarker when the map is dragged or zoomed
  useEffect(() => {
    if (!mapWrapper) return;
    const { naver } = window;
    const actualMap = mapWrapper.map ? mapWrapper.map : mapWrapper;
    if (!actualMap) return;

    // Handler to clear the marker state
    const clearMarkerState = () => {
      setCurrentMarker(null);
      setSelectedResult(null);
      setMarkerSourceState(null);
    };

    // Add event listeners for drag and zoom events
    const dragListener = naver.maps.Event.addListener(actualMap, 'dragstart', clearMarkerState);
    const zoomListener = naver.maps.Event.addListener(actualMap, 'zoom_changed', clearMarkerState);

    // Cleanup the event listeners when the component unmounts or dependencies change
    return () => {
      naver.maps.Event.removeListener(dragListener);
      naver.maps.Event.removeListener(zoomListener);
    };
  }, [mapWrapper, setCurrentMarker, setSelectedResult]);

  return markerRef.current;
};

export default useResultMarker;
