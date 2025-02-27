import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedResultState, markerSourceState } from '../../../../../../shared/recoil/atoms/atomState';
import MarkerDetail from './ui';

const MarkerDetailContainer = () => {
  const selectedResult = useRecoilValue(selectedResultState);
  const markerSource = useRecoilValue(markerSourceState);
  const setSelectedResult = useSetRecoilState(selectedResultState);

  if (!selectedResult) return null;

  const handleClose = () => {
    setSelectedResult(null);
  };

  const handleLike = () => {
    console.log('좋아요 클릭됨');
  };

  let idx;
  if (markerSource === 'centers') {
    idx = selectedResult.id; 
  } else if (markerSource === 'roads') {
    idx = selectedResult.id; 
  } else {
    idx = selectedResult.idx; 
  }

  return (
    <MarkerDetail
      name={selectedResult.road_name || selectedResult.name}
      address={selectedResult.road_address || selectedResult.address}
      distance={selectedResult.cal || selectedResult.distance}
      latitude={parseFloat(selectedResult.latitude)}
      longitude={parseFloat(selectedResult.longitude)}
      idx={idx} 
      onClose={handleClose}
      onLike={handleLike}
    />
  );
};

export default MarkerDetailContainer; 