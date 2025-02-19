// components/Menu.js (발췌)
import React, { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import useUserLocation from '../../../../page/Main/ui/Map/model/useUserLocation';
import { markerSourceState, selectedDataState, selectedSearchState } from '../../../../shared/recoil/atoms/atomState';
import { StyledIcon } from '../../style/style';
import useRoads from './../../api/useRoads';
import useCenters from './../../api/useCenters';

const Menu = () => {
  const [visibleMarker, setVisibleMarker] = useState(null);
  const setSelectedData = useSetRecoilState(selectedDataState);
  const setSelectedSearchState = useSetRecoilState(selectedSearchState);
  const setMarkerSource = useSetRecoilState(markerSourceState);

  const { lat, lng } = useUserLocation();

  const { results: roadsResults, fetchRoads, resetResults: resetRoads } = useRoads();
  const { results: centersResults, fetchCenters, resetResults: resetCenters } = useCenters();

  useEffect(() => {
    if (visibleMarker === 'roads') {
      setSelectedData(roadsResults);
    }
  }, [roadsResults, visibleMarker, setSelectedData]);

  useEffect(() => {
    if (visibleMarker === 'centers') {
      setSelectedData(centersResults);
    }
  }, [centersResults, visibleMarker, setSelectedData]);

  const clearSelectedData = () => {
    setSelectedData([]);
    setMarkerSource('');
    setSelectedSearchState([]);
  };

  const toggleMarkers = type => {
    console.log('[toggleMarkers] type:', type);
    console.log('[toggleMarkers] user location:', { lat, lng });

    // 토글 시 Recoil 상태 외에 API 훅 상태도 초기화
    if (type === 'roads') {
      resetRoads();
    } else if (type === 'centers') {
      resetCenters();
    }

    clearSelectedData();
    if (visibleMarker === type) {
      setVisibleMarker(null);
    } else {
      setVisibleMarker(type);
      setMarkerSource('aside');
      if (type === 'roads') {
        if (lat !== null && lng !== null) {
          fetchRoads({ longitude: lng, latitude: lat });
        } else {
          console.error('User location not available for roads API');
        }
      } else if (type === 'centers') {
        if (lat !== null && lng !== null) {
          fetchCenters({ longitude: lng, latitude: lat });
        } else {
          console.error('User location not available for centers API');
        }
      }
    }
  };

  return (
    <>
      <StyledIcon src="img/icon_navigation.png" alt="Navigation Icon" onClick={() => toggleMarkers('roads')} />
      <StyledIcon src="img/icon_map_pin.png" alt="Map Icon" onClick={() => toggleMarkers('centers')} />
    </>
  );
};

export default Menu;
