import { useEffect, useRef, useState } from 'react';

const useMarkers = (map, selectedData, selectedDetail, markerSource) => {
  const markersRef = useRef([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    const { naver } = window;
    if (map) {
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      if (selectedData && markerSource) {
        selectedData.forEach(item => {
          const position = new naver.maps.LatLng(item.latitude, item.longitude);
          
          const marker = new naver.maps.Marker({
            position,
            map,
            title: item.name,
            icon: {
              content: `<div style="width: 35px; height: 35px; background-color: none; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                          <img src="/img/Marker_P.png" style="width: 100%; height: 100%;" alt="Custom Marker" />
                        </div>`,
            },
          });

          naver.maps.Event.addListener(marker, 'click', () => {
            setSelectedMarker(item);
          });

          markersRef.current.push(marker);
        });
      }
    }
  }, [map, selectedData, markerSource]);

  useEffect(() => {
    const { naver } = window;
    if (map && selectedDetail) {
      const selectedLocation = new naver.maps.LatLng(selectedDetail.latitude, selectedDetail.longitude);
      map.setCenter(selectedLocation);

      const detailMarker = new naver.maps.Marker({
        position: selectedLocation,
        map,
        title: selectedDetail.name,
        icon: {
          content: `<div style="width: 50px; height: 50px; background-color: #FF0000; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                      <img src="/img/Marker_P.png" style="width: 100%; height: 100%;" alt="Detail Marker" />
                    </div>`,
        },
      });

      naver.maps.Event.addListener(detailMarker, 'click', () => {
        setSelectedMarker(selectedDetail);
      });

      return () => {
        detailMarker.setMap(null);
      };
    }
  }, [map, selectedDetail]);

  return { selectedMarker, setSelectedMarker };
};

export default useMarkers;
