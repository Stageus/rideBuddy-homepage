import React, { useState } from 'react';
import {
  StyledBikeImageDiv,
  StyledInfoDiv,
  StyledErrorIconDiv,
  StyledErrorMsgDiv,
  StyledLocIconDiv,
  StyledLocInfoDiv,
  StyledNoResultsIconDiv,
  StyledNoResultsMsgDiv,
  StyledResultItemDiv,
  StyledResultsDiv,
  StyledRideStatusP,
  StyledMainDiv,
  StyledSmileyDiv
} from './style/style';
import { StyledInputPrimary30 } from '../../../../style/styles';
import GraphChart from './ui/GraphChart';

const MainTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [status, setStatus] = useState(null);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      if (value === '에러') {
        setStatus(500); 
        setSearchResults([]);
      } else if (value === '결과없음') {
        setStatus(404);
        setSearchResults([]);
      } else {
        setStatus(200);
        setSearchResults([
          { id: 1, name: '아라 자전거 길' },
          { id: 2, name: '북한강 자전거 길' },
          { id: 3, name: '한강종주 자전거 길' },
        ]);
      }
    } else {
      setSearchResults([]);
      setStatus(null);
    }
  };

  return (
    <StyledMainDiv>
      <StyledInputPrimary30 
        type="text" 
        placeholder="검색어를 입력해주세요" 
        value={searchTerm}
        onChange={handleSearch} 
      />
      {status === 500 ? (
        <StyledErrorMsgDiv>
          <StyledErrorIconDiv>🔄</StyledErrorIconDiv>
          <p>데이터를 불러올 수 없습니다.</p>
          <p>잠시 후 다시 시도해 주세요.</p>
        </StyledErrorMsgDiv>
      ) : status === 404 ? (
        <StyledNoResultsMsgDiv>
          <StyledNoResultsIconDiv>❌</StyledNoResultsIconDiv>
          <p>검색 결과가 없습니다.</p>
          <p>다른 검색어를 시도해 보세요.</p>
        </StyledNoResultsMsgDiv>
      ) : searchTerm === '' ? (
        <StyledInfoDiv>
          <StyledLocInfoDiv>
            <h2>서울특별시 중구</h2>
            <p>현재 날씨: 맑음, 기온은 25°</p>
            <p>미세먼지 최고 좋음 10 µg/m³</p>
            <p>초미세먼지 좋음 6 µg/m³</p>
          </StyledLocInfoDiv>
          <StyledSmileyDiv>😊</StyledSmileyDiv>
          <StyledRideStatusP>오늘은 라이딩하기 "좋음" 입니다</StyledRideStatusP>
          <GraphChart />
          <StyledBikeImageDiv />
        </StyledInfoDiv>
      ) : (
        <StyledResultsDiv>
          {searchResults.map((result) => (
            <StyledResultItemDiv key={result.id}>
              <span>{result.name}</span>
              <StyledLocIconDiv>📍</StyledLocIconDiv>
            </StyledResultItemDiv>
          ))}
        </StyledResultsDiv>
      )}
    </StyledMainDiv>
  );
};

export default MainTab;
