// components/MainTab.js
import React from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import useSearch from './model/useSearch';
import useInfiniteScroll from './model/useInfiniteScroll';
import { StyledMainDiv } from './style/style';
import { selectedSearchState, selectedDataState, markerSourceState } from '../../../../shared/recoil/atoms/atomState';
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

  // 검색어 기반 무한 스크롤 결과
  const { searchResults, ref, hasMore } = useInfiniteScroll(searchTerm, allData);

  // Menu에서 설정한 aside 데이터 구독
  const selectedData = useRecoilValue(selectedDataState);
  const markerSource = useRecoilValue(markerSourceState);
  const selectedSearch = useSetRecoilState(selectedSearchState);

  const handleItemClick = item => {
    setSearchTerm('');
    selectedSearch(item);
    setIsKeywordListOpen(false);
  };

  let content;
  if (status === 500) {
    content = <ErrorMessage />;
  } else if (status === 404) {
    content = <NoResultsMessage />;
  } else if (markerSource === 'aside') {
    // 메뉴(aside)에서 설정한 데이터가 있을 경우 우선 출력
    content = (
      <ResultsList
        searchResults={selectedData}
        handleItemClick={handleItemClick}
        hasMore={false} // aside 데이터는 무한스크롤 필요 없음
        scrollRef={ref}
      />
    );
  } else if (searchTerm === '') {
    content = <InfoSection />;
  } else {
    content = <ResultsList searchResults={searchResults} handleItemClick={handleItemClick} hasMore={hasMore} scrollRef={ref} />;
  }

  return (
    <StyledMainDiv>
      <SearchInput
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        isKeywordListOpen={isKeywordListOpen}
        filteredKeywords={filteredKeywords}
        handleKeywordClick={handleKeywordClick}
      />
      {content}
    </StyledMainDiv>
  );
};

export default MainTab;
