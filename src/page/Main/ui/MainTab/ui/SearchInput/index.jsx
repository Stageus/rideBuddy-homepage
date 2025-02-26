import React, { useState, useEffect, useRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { markerSourceState, searchResultsState } from '../../../../../../shared/recoil/atoms/atomState'; // 이미 있는 Atom이라 가정
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

  // **검색 결과 전역 상태, markerSource 상태**
  const [searchResults, setSearchResults] = useRecoilState(searchResultsState);
  const setMarkerSource = useSetRecoilState(markerSourceState);

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

  // 최종 검색 결과 받아오면 -> Recoil에 저장 & markerSource를 'search'로 전환
  useEffect(() => {
    if (searchResultsData) {
      console.log('최종 검색 API 응답:', searchResultsData);
      setSearchResults(searchResultsData);       // ★ 검색결과 전역 상태 세팅
      setMarkerSource('search');                // ★ markerSource -> 'search'
    }
  }, [searchResultsData, setSearchResults, setMarkerSource]);

  // 외부 클릭 감지 처리
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowList(false);
        setQuery('');
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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

  // 엔터 입력 시 최종 검색 API 호출
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setShowList(false);
      search({
        search: query,
        page: 0,
        longitude: userLocation.lng,
        latitude: userLocation.lat,
      });
    }
  };

  // 키워드 클릭 시 최종 검색 API 바로 호출
  const handleKeywordClick = (keyword) => {
    setQuery(keyword);
    setShowList(false);
    setIsKeywordSelected(true);

    search({
      search: String(keyword),
      page: 0,
      longitude: userLocation.lng,
      latitude: userLocation.lat,
    });
  };

  // 인풋 클릭 시 이벤트 전파 중지
  const handleInputClick = (e) => {
    e.stopPropagation();
  };

  const keywords = data ? Object.values(data) : [];

  return (
    <StyledInputContainerDiv ref={containerRef}>
      <StyledInputPrimary30
        type="text"
        placeholder="검색어를 입력해주세요"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onClick={handleInputClick}
        onFocus={() => query.trim() && data && setShowList(true)}
      />
      {showList && keywords.length > 0 && (
        <KeywordList keywords={keywords} onClickKeyword={handleKeywordClick} />
      )}
    </StyledInputContainerDiv>
  );
};

export default SearchInput;
