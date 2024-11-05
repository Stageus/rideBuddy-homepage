import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSetRecoilState } from 'recoil';
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
import { dummyCenters } from '../../../../shared/asset/dummyCenters';
import { dummyRoads } from '../../../../shared/asset/dummyRoads';
import { selectedDataState, selectedDetailState, markerSourceState } from '../../../../shared/recoil/atoms/atomState';

const MainTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [filteredKeywords, setFilteredKeywords] = useState([]);
  const [status, setStatus] = useState(null);
  const [isKeywordListOpen, setIsKeywordListOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const setSelectedDetail = useSetRecoilState(selectedDetailState);
  const setSelectedData = useSetRecoilState(selectedDataState);
  const setMarkerSource = useSetRecoilState(markerSourceState);
  const { ref, inView } = useInView();

  const allData = [...dummyCenters, ...dummyRoads];

  const handleSearch = event => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      const keywords = allData.map(item => item.name).filter(name => name.includes(value));
      setFilteredKeywords(keywords);
      setIsKeywordListOpen(keywords.length > 0);
      setStatus(keywords.length > 0 ? 200 : 404);
      setSearchResults([]);
      setPage(1);
      setHasMore(true);

      // 검색 결과에 따라 지도에 표시할 데이터 업데이트
      const filteredResults = allData.filter(item => item.name.includes(value));
      setSelectedData(filteredResults); // 검색 결과만 마커로 표시
      setMarkerSource('search'); // 검색 소스로 마커 설정
    } else {
      setSearchResults([]);
      setStatus(null);
      setFilteredKeywords([]);
      setIsKeywordListOpen(false);
      setSelectedData([]); // 검색어가 없으면 모든 마커 숨김
      setMarkerSource(''); // 마커 소스 초기화
    }
  };

  useEffect(() => {
    if (inView && hasMore) {
      loadMoreData();
    }
  }, [inView]);

  const loadMoreData = () => {
    const itemsPerPage = 20;
    const newItems = allData
      .filter(item => item.name.includes(searchTerm))
      .slice((page - 1) * itemsPerPage, page * itemsPerPage);

    setSearchResults(prevResults => [
      ...prevResults,
      ...newItems.map((item, index) => ({ id: prevResults.length + index + 1, ...item }))
    ]);

    setPage(prevPage => prevPage + 1);

    if (newItems.length < itemsPerPage) {
      setHasMore(false);
    }
  };

  const handleKeywordClick = keyword => {
    setSearchTerm(keyword);
    setFilteredKeywords([]);
    setIsKeywordListOpen(false);
    setStatus(200);
    setSearchResults([]);
    setPage(1);
    setHasMore(true);
    setSelectedData(allData.filter(item => item.name.includes(keyword))); // 검색 결과 마커 업데이트
  };

  const handleItemClick = item => {
    setSearchTerm(''); // 검색창 비우기
    setSelectedDetail(item); // 선택한 항목에 따라 지도 중심 이동
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
              <span>{result.name}</span>
              <StyledLocIconDiv>📍</StyledLocIconDiv>
            </StyledResultItemDiv>
          ))}
          {hasMore && <div ref={ref}>Loading more...</div>}
        </StyledResultsDiv>
      )}
    </StyledMainDiv>
  );
};

export default MainTab;


