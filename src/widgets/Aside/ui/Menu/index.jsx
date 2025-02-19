import React, { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { markerSourceState, selectedDataState, selectedSearchState } from '../../../../shared/recoil/atoms/atomState';
import { StyledIcon } from '../../style/style';
import { dummyCenters } from '../../../../assets/dummyCenters';
import useUserLocation from '../../../../page/Main/ui/Map/model/useUserLocation';
import useRoads from '../../api/useRoads';

const Menu = () => {
  const [visibleMarker, setVisibleMarker] = useState(null);
  const setSelectedData = useSetRecoilState(selectedDataState);
  const setSelectedSearchState = useSetRecoilState(selectedSearchState);
  const setMarkerSource = useSetRecoilState(markerSourceState);

  // 사용자 위치 훅
  const { lat, lng } = useUserLocation();
  // API 호출 훅 (roads)
  const { results, fetchRoads } = useRoads();

  // roads API 결과가 변경되면 Recoil selectedDataState 업데이트
  useEffect(() => {
    if (visibleMarker === 'roads') {
      setSelectedData(results);
    }
  }, [results, visibleMarker, setSelectedData]);

  const clearSelectedData = () => {
    setSelectedData([]);
    setMarkerSource('');
    setSelectedSearchState([]);
  };

  const toggleMarkers = (type) => {
    console.log('[toggleMarkers] type:', type);
    console.log('[toggleMarkers] current visibleMarker:', visibleMarker);
    console.log('[toggleMarkers] user location:', { lat, lng });
    
    clearSelectedData();
    if (visibleMarker === type) {
      setVisibleMarker(null);
    } else {
      setVisibleMarker(type);
      setMarkerSource('aside');
      if (type === 'centers') {
        // 센터는 더미 데이터를 사용
        setSelectedData(dummyCenters);
      } else if (type === 'roads') {
        // 사용자의 위치가 있을 때 API 호출 (roads)
        if (lat !== null && lng !== null) {
          console.log('[toggleMarkers] Calling fetchRoads with:', { longitude: lng, latitude: lat });
          fetchRoads({ longitude: lng, latitude: lat });
        } else {
          console.error('User location not available for roads API');
        }
      }
    }
  };
  

  return (
    <>
      <StyledIcon
        src="img/icon_map_pin.png"
        alt="Map Icon"
        onClick={() => toggleMarkers('centers')}
      />
      <StyledIcon
        src="img/icon_navigation.png"
        alt="Navigation Icon"
        onClick={() => toggleMarkers('roads')}
      />
    </>
  );
};

export default Menu;
