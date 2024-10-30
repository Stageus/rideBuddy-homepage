import React, { useState } from 'react';
import styled from 'styled-components';

const SidebarComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [statusCode, setStatusCode] = useState(null); // 상태 코드 저장

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      // 예시 상태 코드 및 검색 결과 설정
      if (value === '에러') {
        setStatusCode(500); // 데이터 불러오기 실패 상태
        setSearchResults([]);
      } else if (value === '결과없음') {
        setStatusCode(404); // 검색 결과 없음 상태
        setSearchResults([]);
      } else {
        // 정상적으로 결과가 있을 때
        setStatusCode(200);
        setSearchResults([
          { id: 1, name: '아라 자전거 길' },
          { id: 2, name: '북한강 자전거 길' },
          { id: 3, name: '한강종주 자전거 길' },
        ]);
      }
    } else {
      // 검색어가 비어 있을 때 기본 상태로 초기화
      setSearchResults([]);
      setStatusCode(null);
    }
  };

  return (
    <Sidebar>
      <SearchInput 
        type="text" 
        placeholder="검색어를 입력해주세요" 
        value={searchTerm}
        onChange={handleSearch} 
      />

      {/* 상태 코드에 따라 조건부 렌더링 */}
      {statusCode === 500 ? (
        <ErrorMessage>
          <ErrorIcon>🔄</ErrorIcon>
          <p>데이터를 불러올 수 없습니다.</p>
          <p>잠시 후 다시 시도해 주세요.</p>
        </ErrorMessage>
      ) : statusCode === 404 ? (
        <NoResultsMessage>
          <NoResultsIcon>❌</NoResultsIcon>
          <p>검색 결과가 없습니다.</p>
          <p>다른 검색어를 시도해 보세요.</p>
        </NoResultsMessage>
      ) : searchTerm === '' ? (
        <DefaultInfo>
          <LocationInfo>
            <h2>서울특별시 중구</h2>
            <p>현재 날씨: 맑음, 기온은 25°</p>
            <p>미세먼지 최고 좋음 10 µg/m³</p>
            <p>초미세먼지 좋음 6 µg/m³</p>
          </LocationInfo>
          <Smiley>😊</Smiley>
          <RideStatus>오늘은 라이딩하기 "좋음" 입니다</RideStatus>
          <GraphPlaceholder />
          <BikeImagePlaceholder />
        </DefaultInfo>
      ) : (
        <ResultsContainer>
          {searchResults.map((result) => (
            <ResultItem key={result.id}>
              <span>{result.name}</span>
              <LocationIcon>📍</LocationIcon>
            </ResultItem>
          ))}
        </ResultsContainer>
      )}
    </Sidebar>
  );
};

export default SidebarComponent;

// Styled components
const Sidebar = styled.div`
  width: 300px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const SearchInput = styled.input`
  width: 90%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 20px;
  text-align: center;
  font-size: 1rem;
  color: #555;
  background-color: #e9f0fb;

  ::placeholder {
    color: #555;
  }
`;

const DefaultInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LocationInfo = styled.div`
  text-align: center;
  margin-bottom: 20px;
  color: #1a73e8;

  h2 {
    margin: 10px 0;
    font-size: 1.5rem;
    font-weight: bold;
  }

  p {
    margin: 5px 0;
    font-size: 1rem;
  }
`;

const Smiley = styled.div`
  font-size: 4em;
  margin: 20px 0;
`;

const RideStatus = styled.p`
  font-weight: bold;
  font-size: 1.2rem;
  color: #1a73e8;
`;

const GraphPlaceholder = styled.div`
  width: 90%;
  height: 150px;
  background-color: #e0e0e0;
  margin: 20px 0;
  border-radius: 8px;
`;

const BikeImagePlaceholder = styled.div`
  width: 120px;
  height: 120px;
  background-image: url('/path/to/bike-image.png'); /* 실제 이미지 경로를 설정해주세요 */
  background-size: cover;
  background-position: center;
  margin-top: 20px;
`;

const ResultsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ResultItem = styled.div`
  background-color: #a6c8ff;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  color: white;
  width: 90%;
  margin: 0 auto;
`;

const LocationIcon = styled.div`
  font-size: 1.5rem;
`;

// Error and No Results Components
const ErrorMessage = styled.div`
  text-align: center;
  color: #1a73e8;
`;

const ErrorIcon = styled.div`
  font-size: 3em;
  margin-bottom: 10px;
`;

const NoResultsMessage = styled.div`
  text-align: center;
  color: #1a73e8;
`;

const NoResultsIcon = styled.div`
  font-size: 3em;
  margin-bottom: 10px;
`;
