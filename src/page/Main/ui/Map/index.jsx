import React, { useRef, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import MarkerDetail from './ui/MakerDetail';
import { markerSourceState, selectedDataState, selectedDetailState } from '../../../../shared/recoil/atoms/atomState';

const Map = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });
  const selectedData = useRecoilValue(selectedDataState);
  const selectedDetail = useRecoilValue(selectedDetailState);
  const markerSource = useRecoilValue(markerSourceState); // 현재 마커의 소스 (검색 or Aside)
  const [selectedMarker, setSelectedMarker] = useState(null);
  const markersRef = useRef([]);

  // 사용자 위치 설정
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
        }
      );
    }
  }, []);

  // 지도 초기화 및 사용자 위치 마커 추가
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
  }, [userLocation]);

  // selectedData에 따른 마커 표시, 소스별 중복 방지
  useEffect(() => {
    const { naver } = window;
    if (map) {
      // 마커 초기화
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      // 마커 소스에 따른 데이터만 마커로 표시
      if (selectedData && markerSource) {
        selectedData.forEach(item => {
          const position = new naver.maps.LatLng(item.latitude, item.longitude);
          const marker = new naver.maps.Marker({
            position,
            map,
            title: item.name,
          });

          naver.maps.Event.addListener(marker, 'click', () => {
            setSelectedMarker(item);
          });

          markersRef.current.push(marker);
        });
      }
    }
  }, [map, selectedData, markerSource]);

  // selectedDetail에 따른 중심 이동 및 마커 표시
  useEffect(() => {
    const { naver } = window;
    if (map && selectedDetail) {
      const selectedLocation = new naver.maps.LatLng(selectedDetail.latitude, selectedDetail.longitude);
      map.setCenter(selectedLocation);

      const detailMarker = new naver.maps.Marker({
        position: selectedLocation,
        map,
        title: selectedDetail.name,
      });

      naver.maps.Event.addListener(detailMarker, 'click', () => {
        setSelectedMarker(selectedDetail);
      });

      return () => {
        detailMarker.setMap(null);
      };
    }
  }, [map, selectedDetail]);

  const handleClose = () => {
    setSelectedMarker(null);
  };

  return (
    <div ref={mapRef} style={{ width: '100%', height: '100vh', position: 'relative' }}>
      {selectedMarker && (
        <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1000 }}>
          <MarkerDetail
            name={selectedMarker.name}
            address={selectedMarker.address}
            distance={selectedMarker.distance}
            imageUrl={selectedMarker.imageUrl}
            latitude={selectedMarker.latitude}
            longitude={selectedMarker.longitude}
            onLike={() => console.log(`${selectedMarker.name} 좋아요!`)}
            onClose={handleClose}
          />
        </div>
      )}
    </div>
  );
};

export default Map;
