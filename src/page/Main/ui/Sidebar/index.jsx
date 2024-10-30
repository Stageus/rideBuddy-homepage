import React, { useState } from 'react';
import { StyledBikeImagePlaceholderDiv, StyledDefaultInfoDiv, StyledErrorIconDiv, StyledErrorMessageDiv, StyledGraphPlaceholderDiv, StyledLocationIconDiv, StyledLocationInfoDiv, StyledNoResultsIconDiv, StyledNoResultsMessageDiv, StyledResultItemDiv, StyledResultsContainerDiv, StyledRideStatusP, StyledSearchInputInput, StyledSidebarDiv, StyledSmileyDiv } from './style/style';

const SidebarComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [statusCode, setStatusCode] = useState(null); 

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      if (value === '에러') {
        setStatusCode(500); 
        setSearchResults([]);
      } else if (value === '결과없음') {
        setStatusCode(404);
        setSearchResults([]);
      } else {
        setStatusCode(200);
        setSearchResults([
          { id: 1, name: '아라 자전거 길' },
          { id: 2, name: '북한강 자전거 길' },
          { id: 3, name: '한강종주 자전거 길' },
        ]);
      }
    } else {
      setSearchResults([]);
      setStatusCode(null);
    }
  };

  return (
    <StyledSidebarDiv>
      <StyledSearchInputInput 
        type="text" 
        placeholder="검색어를 입력해주세요" 
        value={searchTerm}
        onChange={handleSearch} 
      />
      {statusCode === 500 ? (
        <StyledErrorMessageDiv>
          <StyledErrorIconDiv>🔄</StyledErrorIconDiv>
          <p>데이터를 불러올 수 없습니다.</p>
          <p>잠시 후 다시 시도해 주세요.</p>
        </StyledErrorMessageDiv>
      ) : statusCode === 404 ? (
        <StyledNoResultsMessageDiv>
          <StyledNoResultsIconDiv>❌</StyledNoResultsIconDiv>
          <p>검색 결과가 없습니다.</p>
          <p>다른 검색어를 시도해 보세요.</p>
        </StyledNoResultsMessageDiv>
      ) : searchTerm === '' ? (
        <StyledDefaultInfoDiv>
          <StyledLocationInfoDiv>
            <h2>서울특별시 중구</h2>
            <p>현재 날씨: 맑음, 기온은 25°</p>
            <p>미세먼지 최고 좋음 10 µg/m³</p>
            <p>초미세먼지 좋음 6 µg/m³</p>
          </StyledLocationInfoDiv>
          <StyledSmileyDiv>😊</StyledSmileyDiv>
          <StyledRideStatusP>오늘은 라이딩하기 "좋음" 입니다</StyledRideStatusP>
          <StyledGraphPlaceholderDiv />
          <StyledBikeImagePlaceholderDiv />
        </StyledDefaultInfoDiv>
      ) : (
        <StyledResultsContainerDiv>
          {searchResults.map((result) => (
            <StyledResultItemDiv key={result.id}>
              <span>{result.name}</span>
              <StyledLocationIconDiv>📍</StyledLocationIconDiv>
            </StyledResultItemDiv>
          ))}
        </StyledResultsContainerDiv>
      )}
    </StyledSidebarDiv>
  );
};

export default SidebarComponent;