// components/MainTab.js
import React from 'react';
import { StyledMainDiv } from './style/style';
import SearchInput from './ui/SearchInput';
import InfoSection from './ui/InfoSection';
import ResultsList from './ui/ResultsList';

const MainTab = () => {
  return (
    <StyledMainDiv>
      <SearchInput />
      <InfoSection />
      {/* <ResultsList /> */}
    </StyledMainDiv>
  );
};

export default MainTab;
