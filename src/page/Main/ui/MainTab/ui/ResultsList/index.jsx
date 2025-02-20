// components/ui/ResultsList.js
import React from 'react';
import { StyledResultsDiv } from './style/style';
import ResultItem from './ui/ResultItem';

const ResultsList = () => {
  return (
    <StyledResultsDiv>
      <ResultItem />
      <ResultItem />
      <ResultItem />
    </StyledResultsDiv>
  );
};

export default ResultsList;
