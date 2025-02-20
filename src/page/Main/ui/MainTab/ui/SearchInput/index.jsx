// SearchInput.js
import React from 'react';
import { StyledInputContainerDiv, StyledKeywordList } from './style/style';
import { StyledInputPrimary30 } from '../../../../../../style/styles';
import KeywordList from './ui/KeywordList';


const SearchInput = () => {
  return (
    <StyledInputContainerDiv>
      <StyledInputPrimary30
        type="text"
        placeholder="검색어를 입력해주세요"
      />
      {/* <KeywordList></KeywordList> */}
    </StyledInputContainerDiv>
  );
};

export default SearchInput;
