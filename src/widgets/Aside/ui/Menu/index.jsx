import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { markerSourceState, selectedDataState, selectedSearchState } from '../../../../shared/recoil/atoms/atomState';
import { StyledIcon } from '../../style/style';
import { dummyCenters } from '../../../../assets/dummyCenters';
import { dummyRoads } from '../../../../assets/dummyRoads';


const Menu = () => {
  const [visibleMarker, setVisibleMarker] = useState(null); // 'centers' 또는 'roads' 상태로 관리
  const setSelectedData = useSetRecoilState(selectedDataState);
  const setSelectedSearchState = useSetRecoilState(selectedSearchState);
  const setMarkerSource = useSetRecoilState(markerSourceState);

  const clearSelectedData = () => {
    setSelectedData([]);
    setMarkerSource('');
    setSelectedSearchState([]);
  };

  const toggleMarkers = (type) => {
    clearSelectedData();
    if (visibleMarker === type) {
      setVisibleMarker(null); // 마커 숨기기
    } else {
      setVisibleMarker(type);
      setMarkerSource('aside');
      setSelectedData(type === 'centers' ? dummyCenters : dummyRoads);
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
