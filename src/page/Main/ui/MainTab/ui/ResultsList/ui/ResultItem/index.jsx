// components/ui/ResultItem.js
import React from 'react';
import { StyledLocIconDiv, StyledResultItemDiv } from './style/style';
import { HiLocationMarker } from 'react-icons/hi';

const ResultItem = ({ result, onClick }) => {
  return (
    <StyledResultItemDiv onClick={() => onClick(result)}>
      <span>{result.name}</span> {/* road_name → name */}
      <StyledLocIconDiv>
        <HiLocationMarker />
      </StyledLocIconDiv>
    </StyledResultItemDiv>
  );
};

export default ResultItem;
