import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
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
  const [searchResults, setSearchResults] = useState([]); // 전체 검색 결과 데이터
  const [filteredKeywords, setFilteredKeywords] = useState([]); // 필터링된 연관 검색어
  const [status, setStatus] = useState(null); // 상태 코드
  const [isKeywordListOpen, setIsKeywordListOpen] = useState(false); // 연관 검색어 리스트 상태
  const [page, setPage] = useState(1); // 페이지 번호
  const [hasMore, setHasMore] = useState(true); // 추가 데이터 여부
  const [selectedDetail, setSelectedDetail] = useState(null); // 선택한 상세 정보

  const { ref, inView } = useInView(); // Intersection Observer 사용

  // 가상 데이터로 백엔드 응답 형식
  const mockResponse = {
    body: {
      result: Array.from({ length: 100 }, (_, i) => ({
        'centers idx': i + 1,
        'centers name': `인증센터 ${i + 1}`,
        'centers address': `서울특별시 중구 인증센터 ${i + 1}번지`,
        distance: (Math.random() * 10).toFixed(2),
      })),
    },
  };

  // 검색 핸들러
  const handleSearch = event => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      const keywords = mockResponse.body.result
        .map(item => item['centers name'] || item['roads name'])
        .filter(name => name.includes(value));

      setFilteredKeywords(keywords);
      setIsKeywordListOpen(keywords.length > 0);
      setStatus(keywords.length > 0 ? 200 : 404);
      setSearchResults([]); // 기존 검색 결과 초기화
      setPage(1); // 페이지 초기화
      setHasMore(true); // 무한 스크롤 재시작 가능
    } else {
      setSearchResults([]);
      setStatus(null);
      setFilteredKeywords([]);
      setIsKeywordListOpen(false);
    }
  };

  // 무한 스크롤 데이터 로드
  useEffect(() => {
    if (inView && hasMore) {
      loadMoreData();
    }
  }, [inView]);

  const loadMoreData = () => {
    const itemsPerPage = 20;
    const newItems = mockResponse.body.result
      .filter(item => item['centers name'].includes(searchTerm)) // 검색어에 맞는 데이터 필터링
      .slice((page - 1) * itemsPerPage, page * itemsPerPage); // 페이지에 맞는 데이터 추출

    setSearchResults(prevResults => [...prevResults, ...newItems.map((item, index) => ({ id: prevResults.length + index + 1, ...item }))]);

    setPage(prevPage => prevPage + 1);

    if (newItems.length < itemsPerPage) {
      setHasMore(false); // 더 이상 불러올 데이터가 없으면 로딩 중지
    }
  };

  // 검색어 클릭 시 검색창에 반영
  const handleKeywordClick = keyword => {
    setSearchTerm(keyword);
    setFilteredKeywords([]);
    setIsKeywordListOpen(false);
    setStatus(200);
    setSearchResults([]);
    setPage(1); // 페이지 초기화
    setHasMore(true);
  };

  // 항목 클릭 시 상세 정보 모달 표시
  const handleItemClick = item => {
    setSelectedDetail(item);
  };

  return (
    <StyledMainDiv>
      <StyledInputContainerDiv>
        <StyledInputPrimary30
          type="text"
          placeholder="검색어를 입력해주세요"
          value={searchTerm}
          onChange={handleSearch}
          isKeywordListOpen={isKeywordListOpen}
        />
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
          {searchResults.map((result, index) => (
            <StyledResultItemDiv key={result.id} onClick={() => handleItemClick(result)}>
              <span>{result['centers name'] || result['roads name']}</span>
              <StyledLocIconDiv>📍</StyledLocIconDiv>
            </StyledResultItemDiv>
          ))}
          {hasMore && <div ref={ref}>Loading more...</div>}
        </StyledResultsDiv>
      )}

      {/* 상세 정보 모달 */}
      {selectedDetail && (
        <div className="modal">
          <h3>상세 정보</h3>
          <p>이름: {selectedDetail['centers name'] || selectedDetail['roads name']}</p>
          <p>주소: {selectedDetail['centers address'] || selectedDetail['roads address']}</p>
          <p>거리: {selectedDetail.distance} km</p>
          <button onClick={() => setSelectedDetail(null)}>닫기</button>
        </div>
      )}
    </StyledMainDiv>
  );
};

export default MainTab;
