import { useEffect, useState } from 'react';

const useInitializeMap = (mapRef, userLocation) => {
  const [map, setMap] = useState(null);
  const [bicycleLayer, setBicycleLayer] = useState(null);

  useEffect(() => {
    const { naver } = window;
    if (!mapRef.current || !naver || !userLocation.lat || !userLocation.lng) return;

    const location = new naver.maps.LatLng(userLocation.lat, userLocation.lng);
    // 대한민국 경계 (대략적인 값)
    const southWest = new naver.maps.LatLng(33.0, 124.0);
    const northEast = new naver.maps.LatLng(39.0, 132.0);
    const bounds = new naver.maps.LatLngBounds(southWest, northEast);

    const mapInstance = new naver.maps.Map(mapRef.current, {
      center: location,
      zoom: 15,
      minZoom: 10,
      maxZoom: 21,
      mapTypeId: naver.maps.MapTypeId.NORMAL,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
      scaleControl: true,
      scrollWheel: true,
      keyboardShortcuts: true,
      disableDoubleClickZoom: false,
      draggable: true,
      tileTransition: true,
      mapTypeControl: true,
      mapTypeControlOptions: {
        position: naver.maps.Position.TOP_LEFT,
        style: naver.maps.MapTypeControlStyle.DEFAULT,
      },
      disableKineticPan: true,
      // 대한민국 범위로 이동 제한
      maxBounds: bounds,
    });
    setMap(mapInstance);

    new naver.maps.Marker({
      position: location,
      map: mapInstance,
      icon: {
        content: `<div style="display: flex; justify-content: center; align-items: center;">
                    <img src="/img/user_pin.png" style="width: 65px; height: 65px; transform: translate(-50%, -50%);">
                  </div>`,
      },
    });
    

    const bikeLayer = new naver.maps.BicycleLayer();
    setBicycleLayer(bikeLayer);
    bikeLayer.setMap(mapInstance);
  }, [mapRef, userLocation]);

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