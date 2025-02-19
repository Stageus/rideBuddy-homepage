// components/ResultsList.js
import React from 'react';
import ResultItem from './ui/ResultItem';
import { StyledResultsDiv } from './style/style';

const ResultsList = ({ searchResults, handleItemClick, hasMore, scrollRef }) => {
  return (
    <StyledResultsDiv>
      {searchResults.map(result => (
        <ResultItem key={result.id} result={result} onClick={handleItemClick} />
      ))}
      {hasMore && <div ref={scrollRef}>Loading more...</div>}
    </StyledResultsDiv>
  );
};

export default ResultsList;
