import React, { useState, useEffect, useRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { markerSourceState, searchResultsState, searchQueryState, selectedResultState } from '../../../../../../shared/recoil/atoms/atomState';
import { StyledInputContainerDiv } from './style/style';
import { StyledInputPrimary30 } from '../../../../../../style/styles';
import KeywordList from './ui/KeywordList';
import useSearchKeyWord from '../../api/useSearchKeyWord';
import useUserLocation from '../../../../../../shared/api/useUserLocation';
import useSearchResults from '../../api/useSearchResults';

const SearchInput = () => {
  const [query, setQuery] = useState('');
  const [showList, setShowList] = useState(false);
  const [isKeywordSelected, setIsKeywordSelected] = useState(false);
  const containerRef = useRef(null);

  const { data: keywordData, loading, error, searchKeyWord } = useSearchKeyWord();
  const { loading: searchResultsLoading, error: searchResultsError, search } = useSearchResults();
  const userLocation = useUserLocation();
  const setMarkerSource = useSetRecoilState(markerSourceState);
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
  const setSelectedResultState = useSetRecoilState(selectedResultState);


  useEffect(() => {
    if (keywordData && !isKeywordSelected) {
      console.log('자동완성 API 응답:', keywordData);
      setShowList(true);
    }
  }, [keywordData, isKeywordSelected]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowList(false);
        setQuery('');
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setIsKeywordSelected(false);
    if (!value.trim()) {
      setShowList(false);
      return;
    }
    searchKeyWord(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setShowList(false);
      setSearchQuery(query);
      console.log('검색 시작 (Enter):', query);
      search({
        search: query,
        page: 0,
        longitude: userLocation.lng,
        latitude: userLocation.lat,
        append: false,
      });
      setMarkerSource('search');
      setSelectedResultState(null)
    }
  };

  const handleKeywordClick = (keyword) => {
    setQuery(keyword);
    setShowList(false);
    setIsKeywordSelected(true);
    setSelectedResultState(null)
    setSearchQuery(keyword);
    console.log('검색 시작 (Keyword):', keyword);
    search({
      search: String(keyword),
      page: 0,
      longitude: userLocation.lng,
      latitude: userLocation.lat,
      append: false,
    });
    setMarkerSource('search');
  };

  const handleInputClick = (e) => e.stopPropagation();

  const keywords = keywordData ? Object.values(keywordData) : [];

  return (
    <StyledInputContainerDiv ref={containerRef}>
      <StyledInputPrimary30
        type="text"
        placeholder="검색어를 입력해주세요"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onClick={handleInputClick}
        onFocus={() => query.trim() && keywordData && setShowList(true)}
        isKeywordListOpen={showList}
      />
      {showList && keywords.length > 0 && (
        <KeywordList keywords={keywords} onClickKeyword={handleKeywordClick} />
      )}
    </StyledInputContainerDiv>
  );
};

export default SearchInput;