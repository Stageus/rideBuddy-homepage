import React, { useRef, useEffect, useState } from 'react';

const MapComponent = ({ selectedData }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);
  const [userLocation, setUserLocation] = useState({ lat: 37.556835, lng: 126.6038861 }); // 기본 위치
  const [markers, setMarkers] = useState([]); // 마커 상태 추가

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        error => {
          console.error('위치를 가져오는 데 실패했습니다:', error);
        },
      );
    }
  }, []);

  useEffect(() => {
    const { naver } = window;
    if (mapRef.current && naver) {
      const location = new naver.maps.LatLng(userLocation.lat, userLocation.lng);
      const mapInstance = new naver.maps.Map(mapRef.current, {
        center: location,
        zoom: 15,
      });
      setMap(mapInstance);

      const infoWindowInstance = new naver.maps.InfoWindow({
        anchorSkew: true,
      });
      setInfoWindow(infoWindowInstance);

      new naver.maps.Marker({
        position: location,
        map: mapInstance,
        icon: {
          content: `<div style="background: blue; color: white; padding: 5px 10px; border-radius: 50%; font-weight: bold;">내 위치</div>`,
        },
      });
    }
  }, [userLocation]);

  // selectedData 변경 시 마커 갱신
  useEffect(() => {
    if (map && infoWindow && selectedData) {
      // 기존 마커 제거
      markers.forEach(marker => marker.setMap(null));
      setMarkers([]); // 마커 상태 초기화

      // 새로운 마커 추가
      const newMarkers = selectedData.map(item => {
        const position = new naver.maps.LatLng(item.latitude, item.longitude);
        const marker = new naver.maps.Marker({
          position,
          map,
          title: item.name,
        });

        naver.maps.Event.addListener(marker, 'click', () => {
          infoWindow.setContent(`
            <div style="padding:10px;">
              <h4>${item.name}</h4>
              <p>${item.latitude}, ${item.longitude}</p>
            </div>
          `);
          infoWindow.open(map, marker);
        });

        return marker;
      });

      // 새 마커 배열로 상태 업데이트
      setMarkers(newMarkers);
    }
  }, [map, infoWindow, selectedData]);

  return <div ref={mapRef} style={{ width: '100%', height: '100vh' }}></div>;
};

export default MapComponent;
