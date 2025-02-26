import React, { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import {
  centersState,
  roadsState,
  markerSourceState,
  searchResultsState,
} from '../../../../../../shared/recoil/atoms/atomState';
import { StyledResultsDiv } from './style/style';
import ResultItem from './ui/ResultItem';
import useUserLocation from '../../../../../../shared/api/useUserLocation';
import useCenters from '../../../../../../shared/api/useCenters';
import useRoads from '../../../../../../shared/api/useRoads';
import InfoSection from './ui/InfoSection';

const ResultsList = () => {
  const markerSource = useRecoilValue(markerSourceState);
  const userLocation = useUserLocation();

  // 1) centers, roads 훅
  const {
    results: centers,
    loading: centersLoading,
    error: centersError,
    fetchCenters,
    hasMore: centersHasMore,
  } = useCenters();

  const {
    results: roads,
    loading: roadsLoading,
    error: roadsError,
    fetchRoads,
    hasMore: roadsHasMore,
  } = useRoads();

  // 2) 검색 결과 (Recoil에서 단순 배열로 관리한다고 가정)
  const searchResults = useRecoilValue(searchResultsState);

  let dataToDisplay = [];
  let hasMore = false;
  let loading = false;

  if (markerSource === 'centers') {
    dataToDisplay = centers;
    hasMore = centersHasMore;
    loading = centersLoading;
    console.log(searchResults);
  } else if (markerSource === 'roads') {
    dataToDisplay = roads;
    hasMore = roadsHasMore;
    loading = roadsLoading;
    console.log(searchResults);
  } else if (markerSource === 'search') {
    // 'search' 모드일 때는 Recoil에 저장된 배열을 그대로 사용합니다.
    dataToDisplay = searchResults || [];
    hasMore = false;
    loading = false;
    console.log(searchResults);
  }

  // 스크롤 감지를 위한 ref 생성
  const listRef = useRef(null);

  const handleScroll = () => {
    if (!listRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      if (loading || !hasMore) return;
      if (markerSource === 'centers') {
        fetchCenters({ longitude: userLocation.lng, latitude: userLocation.lat });
      } else if (markerSource === 'roads') {
        fetchRoads({ longitude: userLocation.lng, latitude: userLocation.lat });
      }
      // markerSource === 'search'에서는 추가 로딩 로직 생략
    }
  };

  // markerSource가 바뀔 때마다 스크롤을 맨 위로 이동
  useEffect(() => {
    const timer = setTimeout(() => {
      if (listRef.current) {
        listRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [markerSource]);

  // 컴포넌트 마운트 시 최초 데이터 로딩 (검색은 SearchInput에서 진행)
  useEffect(() => {
    if (markerSource === 'centers' && centers.length === 0) {
      fetchCenters({ longitude: userLocation.lng, latitude: userLocation.lat });
    } else if (markerSource === 'roads' && roads.length === 0) {
      fetchRoads({ longitude: userLocation.lng, latitude: userLocation.lat });
    }
  }, [markerSource, userLocation]);

  return (
    <StyledResultsDiv ref={listRef} onScroll={handleScroll}>
      {dataToDisplay.length > 0 ? (
        dataToDisplay.map(item => (
          <ResultItem key={item.id ?? item.idx} data={item} />
        ))
      ) : markerSource === 'search' ? (
        // 검색 모드인데 결과가 없을 경우 보여줄 UI
        <div style={{ padding: '20px', textAlign: 'center' }}>
          검색 결과가 없습니다.
        </div>
      ) : (
        // 센터나 로드 모드에서 결과가 없을 경우 기본 InfoSection을 표시
        <InfoSection />
      )}
    </StyledResultsDiv>
  );
};

export default ResultsList;
