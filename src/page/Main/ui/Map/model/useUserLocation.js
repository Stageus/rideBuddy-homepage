import { useState, useEffect } from 'react';

const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });

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

  return userLocation;
};

export default useUserLocation;
