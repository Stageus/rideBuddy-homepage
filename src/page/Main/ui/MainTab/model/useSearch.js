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
      
      // 지도에 마커를 표시하지 않도록 selectedData와 markerSource 설정을 생략
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

    // 키워드 클릭 시에만 지도에 마커 표시
    setSelectedData(allData.filter(item => item.name.includes(keyword)));
    setMarkerSource('search');
  };

  return {
    searchTerm,
    setSearchTerm,
    filteredKeywords,
    status,
    isKeywordListOpen,
    handleSearch,
    handleKeywordClick,
    allData,setIsKeywordListOpen
  };
};

export default useSearch;
