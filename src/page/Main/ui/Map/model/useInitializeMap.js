import { useEffect, useState } from 'react';

const useInitializeMap = (mapRef, userLocation) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const { naver } = window;
    if (mapRef.current && naver && userLocation.lat && userLocation.lng) {
      const location = new naver.maps.LatLng(userLocation.lat, userLocation.lng);
      const mapInstance = new naver.maps.Map(mapRef.current, {
        center: location,
        zoom: 15,
      });
      setMap(mapInstance);

      new naver.maps.Marker({
        position: location,
        map: mapInstance,
        icon: {
          content: `<div style="background: blue; color: white; padding: 5px 10px; border-radius: 50%; font-weight: bold;">내 위치</div>`,
        },
      });
    }
  }, [mapRef, userLocation]);

  return map;
};

export default useInitializeMap;
