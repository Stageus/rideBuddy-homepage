import React, { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import MarkerDetail from './ui/MakerDetail';
import { markerSourceState, selectedDataState, selectedSearchState } from '../../../../shared/recoil/atoms/atomState';
import useUserLocation from './model/useUserLocation';
import useInitializeMap from './model/useInitializeMap'; 
import useMarkers from './model/useMarkers'; 

const Map = () => {
  const mapRef = useRef(null);
  const userLocation = useUserLocation();
  const map = useInitializeMap(mapRef, userLocation);

  const selectedData = useRecoilValue(selectedDataState);
  const selectedSearch = useRecoilValue(selectedSearchState);
  const markerSource = useRecoilValue(markerSourceState);

  const { selectedMarker, setSelectedMarker } = useMarkers(map, selectedData, selectedSearch, markerSource);

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
