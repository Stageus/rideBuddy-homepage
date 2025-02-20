// components/ui/ResultItem.js
import React from 'react';
import { StyledLocIconDiv, StyledResultItemDiv } from './style/style';
import { HiLocationMarker } from 'react-icons/hi';

const ResultItem = () => {
  return (
    <StyledResultItemDiv>
      <span></span>
      <StyledLocIconDiv>
        <HiLocationMarker />
      </StyledLocIconDiv>
    </StyledResultItemDiv>
  );
};

export default ResultItem;
