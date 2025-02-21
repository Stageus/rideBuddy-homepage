import React from 'react';
import { useSetRecoilState } from 'recoil';
import { StyledLocIconDiv, StyledResultItemDiv } from './style/style';
import { HiLocationMarker } from 'react-icons/hi';
import { currentMarkerState, selectedResultState } from '../../../../../../../../shared/recoil/atoms/atomState';

const ResultItem = ({ data }) => {
  const setCurrentMarker = useSetRecoilState(currentMarkerState);
  const setSelectedResult = useSetRecoilState(selectedResultState);

  const handleClick = () => {
    if (!data) {
      console.error('data가 없습니다.', data);
      return;
    }
    // ResultItem 클릭 시, 현재 마커를 업데이트하고 팝업은 닫음
    setCurrentMarker(data);
    setSelectedResult(null);
  };

  if (!data) return null;

  return (
    <StyledResultItemDiv onClick={handleClick}>
      <span>{data.name}</span>
      <StyledLocIconDiv>
        <HiLocationMarker />
      </StyledLocIconDiv>
    </StyledResultItemDiv>
  );
};

export default ResultItem;
