// components/MainTab.js
import React from 'react';
import { StyledMainTabDiv } from './style/style';
import SearchInput from './ui/SearchInput';
import ResultsList from './ui/ResultsList';

const MainTab = () => {
  return (
    <StyledMainTabDiv>
      <SearchInput />
      {/* <InfoSection /> */}
      <ResultsList />
    </StyledMainTabDiv>
  );
};

export default MainTab;
