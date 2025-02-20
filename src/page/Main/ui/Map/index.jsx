// components/Map.js
import React, { useRef } from 'react';
import useInitializeMap from './model/useInitializeMap';
import useUserLocation from '../../../../shared/api/useUserLocation';

const Map = () => {
  const mapRef = useRef(null);
  const userLocation = useUserLocation();
  useInitializeMap(mapRef, userLocation);

  return (
    <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />
  );
};

export default Map;
