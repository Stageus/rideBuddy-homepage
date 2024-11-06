import React from 'react';
import { StyledLocIconDiv, StyledResultItemDiv } from './style/style';

const ResultItem = ({ result, onClick }) => {
  return (
    <StyledResultItemDiv onClick={() => onClick(result)}>
      <span>{result.name}</span>
      <StyledLocIconDiv>📍</StyledLocIconDiv>
    </StyledResultItemDiv>
  );
};

export default ResultItem;
