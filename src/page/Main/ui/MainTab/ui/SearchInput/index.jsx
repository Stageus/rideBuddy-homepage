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

  // 외부 클릭 감지 및 처리 - click 이벤트로 변경
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowList(false);
      }
    };

    // mousedown 대신 click 이벤트 사용
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

  // 키워드 클릭 시, 즉시 검색
  const handleKeywordClick = (keyword) => {
    setQuery(keyword);
    setShowList(false);
    setIsKeywordSelected(true);
    console.log(userLocation);
    // 바로 검색 호출
    search({
      search: String(keyword),
      page: 0,
      longitude: userLocation.lng,
      latitude: userLocation.lat,
    });
  };

  // 입력 필드 클릭 시 이벤트 전파 중지
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
        <KeywordList
          keywords={keywords}
          onClickKeyword={handleKeywordClick}
        />
      )}
    </StyledInputContainerDiv>
  );
};

export default SearchInput;