import { useEffect, useRef } from 'react';
import { markerSourceState, selectedResultState } from '../../../../../shared/recoil/atoms/atomState';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useRoadPointApi from '../ui/MakerDetail/api/useRoadPointApi';
import useCenterDetails from '../ui/MakerDetail/api/useCenterDetails';


function usePinMarkers(mapWrapper, data) {
  const currentMarkerSource = useRecoilValue(markerSourceState);
  const setSelectedResult = useSetRecoilState(selectedResultState);
  const { RoadDetail, error: roadError, loading: roadLoading, fetchRoadPoint } = useRoadPointApi();
  const { CenterDetail, error: centerError, loading: centerLoading, fetchCenterDetails } = useCenterDetails();
  const markersRef = useRef([]);

  useEffect(() => {
    if (!mapWrapper?.map || !data) return;

    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    if (currentMarkerSource) {
      return;
    }

    const newMarkers = data.map(item => {
      const { latitude, longitude, name } = item;
      const position = new naver.maps.LatLng(+latitude, +longitude);

      const marker = new naver.maps.Marker({
        position,
        map: mapWrapper.map,
        title: name,
        icon: {
          content: [
            '<div style="width: 45px; height: 45px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">',
            '  <img src="/img/Marker_Y.png" style="width: 70%; height: 100%;" alt="Marker" />',
            '</div>',
          ].join(''),
          anchor: new naver.maps.Point(22.5, 45),
        },
      });

      naver.maps.Event.addListener(marker, 'click', async () => {
        if (item.result === 'road') {
          await fetchRoadPoint(item.idx);
        } else if (item.result === 'center') {
          await fetchCenterDetails(item.idx);
        } else {
          console.warn('Unknown result type:', item.result);
        }
      });

      return marker;
    });

    markersRef.current = newMarkers;

    return () => {
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = []; 
    };
  }, [mapWrapper, data, currentMarkerSource]);

  return { markersRef, RoadDetail, CenterDetail, roadLoading, centerLoading, roadError, centerError };
}

export default usePinMarkers;