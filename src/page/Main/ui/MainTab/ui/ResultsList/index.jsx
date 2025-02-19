// components/ui/ResultsList.js
import React from 'react';

import { StyledResultsDiv } from './style/style';
import ResultItem from './ui/ResultItem';

const ResultsList = ({ searchResults, handleItemClick, hasMore, scrollRef }) => {
  console.log('ResultsList - searchResults:', searchResults);

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
