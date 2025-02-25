import React, { useState, useEffect, useRef } from 'react';
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

  // 자동완성 훅
  const { data, loading, error, searchKeyWord } = useSearchKeyWord();

  // 최종 검색 훅
  const {
    data: searchResultsData,
    loading: searchResultsLoading,
    error: searchResultsError,
    search,
  } = useSearchResults();

  // 위치 훅 (위경도)
  const userLocation = useUserLocation();

  useEffect(() => {
    // 자동완성 응답이 있고, 아직 키워드 선택 안 했으면 리스트 열기
    if (data && !isKeywordSelected) {
      console.log('자동완성 API 응답:', data);
      setShowList(true);
    }
  }, [data, isKeywordSelected]);

  useEffect(() => {
    if (error) {
      console.error('자동완성 API 에러:', error);
      setShowList(false);
    }
  }, [error]);

  // 최종 검색 결과 콘솔 출력
  useEffect(() => {
    if (searchResultsData) {
      console.log('최종 검색 API 응답:', searchResultsData);
    }
  }, [searchResultsData]);

  // 입력 변경 시 자동완성 호출
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
      search({
        search: query,
        page: 0,
        longitude: userLocation.lng,
        latitude: userLocation.lat,
      });
    }
  };

  // **키워드 클릭 시, 즉시 검색**
  const handleKeywordClick = (keyword) => {
    setQuery(keyword);
    setShowList(false);
    setIsKeywordSelected(true);
    console.log(userLocation)
    // 바로 검색 호출
    search({
      search: String(keyword),
      page: 1,
      longitude: userLocation.lng,
      latitude: userLocation.lat,
    });
  };

  const keywords = data ? Object.values(data) : [];

  return (
    <StyledInputContainerDiv>
      <StyledInputPrimary30
        type="text"
        placeholder="검색어를 입력해주세요"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown} // (필요 없다면 주석 처리 가능)
      />
      {showList && keywords.length > 0 && (
        <KeywordList
          keywords={keywords}
          onClickKeyword={handleKeywordClick}
        />
      )}
    </StyledInputContainerDiv>
  );
};

export default SearchInput;
