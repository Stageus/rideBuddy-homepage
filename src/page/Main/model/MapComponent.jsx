import React, { useRef, useEffect } from 'react';

const MapComponent = () => {
  const mapRef = useRef(null);
  const lat = 37.556835; // 위도
  const lng = 126.6038861; // 경도

  useEffect(() => {
    const { naver } = window; // window에서 naver 객체를 가져옴
    if (mapRef.current && naver) {
      const location = new naver.maps.LatLng(lat, lng); // 지정된 위도, 경도로 위치 생성
      const map = new naver.maps.Map(mapRef.current, {
        center: location,
        zoom: 17, // 지도의 확대 정도
      });
      new naver.maps.Marker({
        position: location, // 마커의 위치
        map, // 지도 객체
      });
    }
  }, []);

  return (
    <div ref={mapRef} style={{ width: '500px', height: '500px' }}></div> // 지도 컨테이너
  );
};

export default MapComponent;
