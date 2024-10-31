import React, { useState } from 'react';
import {
  StyledInputContainerDiv,
  StyledKeywordList,
  StyledMainDiv,
  StyledInfoDiv,
  StyledLocInfoDiv,
  StyledSmileyDiv,
  StyledRideStatusP,
  StyledResultsDiv,
  StyledResultItemDiv,
  StyledErrorMsgDiv,
  StyledErrorIconDiv,
  StyledNoResultsMsgDiv,
  StyledNoResultsIconDiv,
  StyledLocIconDiv,
} from './style/style';
import GraphChart from './ui/GraphChart';
import { StyledInputPrimary30 } from '../../../../style/styles';

const MainTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [filteredKeywords, setFilteredKeywords] = useState([]);
  const [status, setStatus] = useState(null);
  const [isKeywordListOpen, setIsKeywordListOpen] = useState(false); // 리스트 열림 상태 추가

  // 가상 연관 검색어 데이터
  const mockRelatedKeywords = [
    '아라 자전거 길',
    '북한강 자전거 길',
    '한강종주 자전거 길',
    '남한강 자전거 길',
    '새만금 자전거 길',
    '제주 자전거 길',
    '영산강 자전거 길',
    '금강 자전거 길',
    '부산 자전거 길',
    '대구 자전거 길',
    '광주 자전거 길',
    '서울 자전거 길',
    '김포 자전거 길',
    '춘천 자전거 길',
    '전주 자전거 길',
    '천안 자전거 길',
    '인천 자전거 길',
    '울산 자전거 길',
    '목포 자전거 길',
    '포항 자전거 길',
  ];

  const handleSearch = event => {
    const value = event.target.value;
    setSearchTerm(value);

    // 검색어를 포함하는 가상 데이터 필터링
    if (value) {
      const keywords = mockRelatedKeywords.filter(keyword => keyword.includes(value));
      setFilteredKeywords(keywords);
      setIsKeywordListOpen(keywords.length > 0); // 리스트 열림 상태 업데이트

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
      setFilteredKeywords([]);
      setIsKeywordListOpen(false); // 검색어가 비어있으면 리스트 닫기
    }
  };

  // 연관 검색어 클릭 시 인풋 필드에 채워지는 기능
  const handleKeywordClick = keyword => {
    setSearchTerm(keyword);
    setFilteredKeywords([]);
    setIsKeywordListOpen(false); // 리스트 닫기
    setStatus(200);
    setSearchResults([
      { id: 1, name: '아라 자전거 길' },
      { id: 2, name: '북한강 자전거 길' },
      { id: 3, name: '한강종주 자전거 길' },
    ]);
  };

  return (
    <StyledMainDiv>
      <StyledInputContainerDiv>
        <StyledInputPrimary30
          type="text"
          placeholder="검색어를 입력해주세요"
          value={searchTerm}
          onChange={handleSearch}
          isKeywordListOpen={isKeywordListOpen} // 상태 전달
        />

        {/* 연관 검색어 출력 */}
        {isKeywordListOpen && (
          <StyledKeywordList>
            {filteredKeywords.map((keyword, index) => (
              <li key={index} onClick={() => handleKeywordClick(keyword)}>
                {keyword}
              </li>
            ))}
          </StyledKeywordList>
        )}
      </StyledInputContainerDiv>

      {/* 상태별 출력 */}
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
        </StyledInfoDiv>
      ) : (
        <StyledResultsDiv>
          {searchResults.map(result => (
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
