import { useEffect, useState } from 'react';

const useInitializeMap = (mapRef, userLocation) => {
  const [map, setMap] = useState(null);
  const [bicycleLayer, setBicycleLayer] = useState(null);

  useEffect(() => {
    const { naver } = window;
    if (!mapRef.current || !naver || !userLocation.lat || !userLocation.lng) return;

    // 사용자의 위치를 중심으로 지도 생성
    const location = new naver.maps.LatLng(userLocation.lat, userLocation.lng);
    const mapInstance = new naver.maps.Map(mapRef.current, {
      center: location,
      zoom: 15,
    });
    setMap(mapInstance);

    // 사용자의 위치에 마커 표시
    new naver.maps.Marker({
      position: location,
      map: mapInstance,
      icon: {
        content: `<div style="background:#A6C8FF; color:white; padding:5px 10px; border-radius:50%; font-weight:bold; font-size:32px">🚴‍♂️</div>`,
      },
    });

    // 자전거 레이어 생성 및 지도에 추가
    const bikeLayer = new naver.maps.BicycleLayer();
    setBicycleLayer(bikeLayer);
    bikeLayer.setMap(mapInstance);
  }, [mapRef, userLocation]);

  // 자전거 레이어 토글 기능
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
