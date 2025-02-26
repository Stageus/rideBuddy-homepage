// ResultItem.js
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
    setCurrentMarker(data);
    setSelectedResult(null);
  };

  if (!data) return null;

  return (
    <StyledResultItemDiv onClick={handleClick}>
      {/* 검색 결과일 경우 data.name / data.address / data.type 등을 자유롭게 표시 */}
      <span>{data.name}</span>
      <StyledLocIconDiv>
        <HiLocationMarker />
      </StyledLocIconDiv>
    </StyledResultItemDiv>
  );
};

export default ResultItem;
