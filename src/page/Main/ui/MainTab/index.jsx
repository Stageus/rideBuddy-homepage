// MainTab.js
import React from 'react';
import useSearch from './model/useSearch';
import useInfiniteScroll from './model/useInfiniteScroll';
import { useSetRecoilState } from 'recoil';
import { StyledMainDiv } from './style/style';
import { selectedSearchState } from '../../../../shared/recoil/atoms/atomState';
import SearchInput from './ui/SearchInput';
import ErrorMessage from './ui/ErrorMessage';
import NoResultsMessage from './ui/NoResultsMessage';
import InfoSection from './ui/InfoSection';
import ResultsList from './ui/ResultsList';

const MainTab = () => {
  const {
    searchTerm,
    setSearchTerm,
    filteredKeywords,
    status,
    isKeywordListOpen,
    handleSearch,
    handleKeywordClick,
    allData,
    setIsKeywordListOpen,
  } = useSearch();

  const { searchResults, ref, hasMore } = useInfiniteScroll(searchTerm, allData);

  const selectedSearch = useSetRecoilState(selectedSearchState);

  const handleItemClick = item => {
    setSearchTerm(''); // 검색창 비우기
    selectedSearch(item); // 선택한 항목에 따라 지도 중심 이동
    setIsKeywordListOpen(false);
  };

  return (
    <StyledMainDiv>
      <SearchInput
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        isKeywordListOpen={isKeywordListOpen}
        filteredKeywords={filteredKeywords}
        handleKeywordClick={handleKeywordClick}
      />

      {status === 500 ? (
        <ErrorMessage />
      ) : status === 404 ? (
        <NoResultsMessage />
      ) : searchTerm === '' ? (
        <InfoSection />
      ) : (
        // MainTab.js
        <ResultsList
          searchResults={searchResults}
          handleItemClick={handleItemClick}
          hasMore={hasMore}
          scrollRef={ref} // 'ref'를 'scrollRef'로 변경
        />
      )}
    </StyledMainDiv>
  );
};

export default MainTab;
