import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { selectedDataState, markerSourceState } from '../../../../../shared/recoil/atoms/atomState';
import { dummyCenters } from '../../../../../assets/dummyCenters';
import { dummyRoads } from '../../../../../assets/dummyRoads'; 

const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredKeywords, setFilteredKeywords] = useState([]);
  const [status, setStatus] = useState(null);
  const [isKeywordListOpen, setIsKeywordListOpen] = useState(false);

  const setSelectedData = useSetRecoilState(selectedDataState);
  const setMarkerSource = useSetRecoilState(markerSourceState);

  const allData = [...dummyCenters, ...dummyRoads];

  const handleSearch = event => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      const keywords = allData.map(item => item.name).filter(name => name.includes(value));
      setFilteredKeywords(keywords);
      setIsKeywordListOpen(keywords.length > 0);
      setStatus(keywords.length > 0 ? 200 : 404);

      // 검색 결과에 따라 지도에 표시할 데이터 업데이트
      const filteredResults = allData.filter(item => item.name.includes(value));
      setSelectedData(filteredResults); // 검색 결과만 마커로 표시
      setMarkerSource('search'); // 검색 소스로 마커 설정
    } else {
      setStatus(null);
      setFilteredKeywords([]);
      setIsKeywordListOpen(false);
      setSelectedData([]); // 검색어가 없으면 모든 마커 숨김
      setMarkerSource(''); // 마커 소스 초기화
    }
  };

  const handleKeywordClick = keyword => {
    setSearchTerm(keyword);
    setFilteredKeywords([]);
    setIsKeywordListOpen(false);
    setStatus(200);
    setSelectedData(allData.filter(item => item.name.includes(keyword))); // 검색 결과 마커 업데이트
    setMarkerSource('search'); // 검색 소스로 마커 설정
  };

  return {
    searchTerm,
    setSearchTerm,
    filteredKeywords,
    status,
    isKeywordListOpen,
    handleSearch,
    handleKeywordClick,
    allData,
  };
};

export default useSearch;
