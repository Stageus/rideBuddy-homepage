// MainTab.js
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

  // Infinite scroll로 검색 결과를 구함 (검색어 기반)
  const { searchResults, ref, hasMore } = useInfiniteScroll(searchTerm, allData);

  // Recoil 상태 구독 (aside에서 설정한 값)
  const selectedData = useRecoilValue(selectedDataState);
  const markerSource = useRecoilValue(markerSourceState);
  const selectedSearch = useSetRecoilState(selectedSearchState);

  const handleItemClick = item => {
    // 검색 결과 아이템 클릭 시, 검색어 초기화 및 Recoil 상태 업데이트
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
    // 메뉴(aside)에서 설정한 데이터가 있을 경우: dummyCenters나 API로 받아온 roads 데이터 등
    content = (
      <ResultsList
        searchResults={selectedData}
        handleItemClick={handleItemClick}
        hasMore={false} // aside 데이터는 무한스크롤이 필요하지 않을 수 있음
        scrollRef={ref}
      />
    );
  } else if (searchTerm === '') {
    // 검색어가 없고 aside 상태가 아닐 때
    content = <InfoSection />;
  } else {
    // 검색어 입력 시
    content = (
      <ResultsList
        searchResults={searchResults}
        handleItemClick={handleItemClick}
        hasMore={hasMore}
        scrollRef={ref}
      />
    );
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
