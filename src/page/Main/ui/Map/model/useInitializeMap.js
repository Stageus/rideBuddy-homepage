import { useEffect, useState } from 'react';

const useInitializeMap = (mapRef, userLocation) => {
  const [map, setMap] = useState(null);
  const [bicycleLayer, setBicycleLayer] = useState(null);

  useEffect(() => {
    const { naver } = window;
    if (mapRef.current && naver && userLocation.lat && userLocation.lng) {
      // 지도 생성
      const location = new naver.maps.LatLng(userLocation.lat, userLocation.lng);
      const mapInstance = new naver.maps.Map(mapRef.current, {
        center: location,
        zoom: 15,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: naver.maps.MapTypeControlStyle.DROPDOWN,
        },
      });
      setMap(mapInstance);

      // 마커 표시
      new naver.maps.Marker({
        position: location,
        map: mapInstance,
        icon: {
          content: `<div style="background: #A6C8FF; color: white; padding: 5px 10px; border-radius: 50%; font-weight: bold; font-size:32px">🚴‍♂️</div>`,
        },
      });

      // 자전거 레이어 생성
      const newBicycleLayer = new naver.maps.BicycleLayer();
      setBicycleLayer(newBicycleLayer);

      // 지도가 초기화되면 자전거 레이어를 지도에 추가
      naver.maps.Event.once(mapInstance, 'init', () => {
        newBicycleLayer.setMap(mapInstance);
      });
    }
  }, [mapRef, userLocation]);

  // 자전거 레이어 토글 함수
  const toggleBicycleLayer = () => {
    if (!map || !bicycleLayer) return;
    if (bicycleLayer.getMap()) {
      bicycleLayer.setMap(null);
    } else {
      bicycleLayer.setMap(map);
    }
  };

  return { map, toggleBicycleLayer };
};

export default useInitializeMap;
