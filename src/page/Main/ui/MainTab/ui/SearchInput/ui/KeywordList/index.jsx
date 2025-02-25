import React from 'react';
import { StyledKeywordList } from './style/style';

const KeywordList = ({ keywords, onClickKeyword }) => {
  return (
    <StyledKeywordList>
      {keywords.map((keyword, index) => (
        <li
          key={index}
          onMouseDown={() => onClickKeyword(keyword)}
        >
          {keyword}
        </li>
      ))}
    </StyledKeywordList>
  );
};

export default KeywordList;
