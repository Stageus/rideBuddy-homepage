import React, { useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { detailSourceState, selectedResultState } from '../../../../../../shared/recoil/atoms/atomState';
import MarkerDetail from './ui';
import useLikeCenters from './api/useLikeCenters';
import useLikeRoad from './api/useLikeRoad';

const MarkerDetailContainer = () => {
  const selectedResult = useRecoilValue(selectedResultState);
  const setSelectedResult = useSetRecoilState(selectedResultState);
  const detailSource = useRecoilValue(detailSourceState);
  

  return (
    <MarkerDetail
      idx={selectedResult.idx}
      name={selectedResult.name}
      latitude={selectedResult.latitude}
      longitude={selectedResult.longitude}
      like={selectedResult.like}
      addr={selectedResult.addr}
      setSelectedResult={setSelectedResult}
      result={selectedResult.result}
      detailSource={detailSource}
    />
  );
};

export default MarkerDetailContainer;