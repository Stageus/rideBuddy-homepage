// SearchInput.js
import React from 'react';
import { StyledInputContainerDiv, StyledKeywordList } from './style/style';
import { StyledInputPrimary30 } from '../../../../../../style/styles';

const SearchInput = ({
  searchTerm,
  handleSearch,
  isKeywordListOpen,
  filteredKeywords,
  handleKeywordClick,
}) => {
  return (
    <StyledInputContainerDiv>
      <StyledInputPrimary30
        type="text"
        placeholder="검색어를 입력해주세요"
        value={searchTerm}
        onChange={handleSearch}
        isKeywordListOpen={isKeywordListOpen}
      />
      {isKeywordListOpen && (
        <StyledKeywordList>
          {filteredKeywords.map((keyword, index) => (
            <li key={index} onClick={() => handleKeywordClick(keyword)}>
              {keyword}
            </li>
          ))}
        </StyledKeywordList>
      )}
    </StyledInputContainerDiv>
  );
};

export default SearchInput;
