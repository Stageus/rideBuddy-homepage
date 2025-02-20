// components/ui/ResultItem.js
import React from 'react';
import { StyledLocIconDiv, StyledResultItemDiv } from './style/style';
import { HiLocationMarker } from 'react-icons/hi';

const ResultItem = ({ data }) => {
  if (!data) return null;

  return (
    <StyledResultItemDiv>
      <span>{data.name}</span>
      <StyledLocIconDiv>
        <HiLocationMarker />
      </StyledLocIconDiv>
    </StyledResultItemDiv>
  );
};

export default ResultItem;
