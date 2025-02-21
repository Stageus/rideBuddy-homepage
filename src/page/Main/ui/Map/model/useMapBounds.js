import { useState, useEffect } from 'react';

const useMapBounds = (mapWrapper) => {
  const [bounds, setBounds] = useState({ sw: null, ne: null });

  useEffect(() => {
    // mapWrapper와 실제 지도 인스턴스가 준비되지 않았다면 아무것도 하지 않음
    if (!mapWrapper || !mapWrapper.map) return;
    const mapInstance = mapWrapper.map;

    const updateBounds = () => {
      const mapBounds = mapInstance.getBounds();
      if (!mapBounds) return;

      const sw = mapBounds.getSW();
      const ne = mapBounds.getNE();
      const newBounds = {
        sw: { lat: sw.lat(), lng: sw.lng() },
        ne: { lat: ne.lat(), lng: ne.lng() }
      };

      setBounds(prevBounds => {
        // 이전과 동일한 좌표라면 상태 업데이트를 하지 않음
        if (
          prevBounds.sw &&
          prevBounds.ne &&
          prevBounds.sw.lat === newBounds.sw.lat &&
          prevBounds.sw.lng === newBounds.sw.lng &&
          prevBounds.ne.lat === newBounds.ne.lat &&
          prevBounds.ne.lng === newBounds.ne.lng
        ) {
          return prevBounds;
        }
        return newBounds;
      });
    };

    // 초기 좌표 업데이트
    updateBounds();

    // 'idle' 이벤트를 통해 지도 이동/확대/축소 후 좌표 업데이트
    let idleListener = null;
    if (window.naver && naver.maps && naver.maps.Event) {
      idleListener = naver.maps.Event.addListener(mapInstance, 'idle', updateBounds);
    }

    return () => {
      if (idleListener && naver.maps.Event.removeListener) {
        naver.maps.Event.removeListener(idleListener);
      }
    };
  }, [mapWrapper?.map]); // mapWrapper.map이 변경될 때만 effect 실행

  return bounds;
};

export default useMapBounds;
