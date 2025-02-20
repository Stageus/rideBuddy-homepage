// components/ui/ResultsList.js
import React, { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { centersState, roadsState, markerSourceState } from '../../../../../../shared/recoil/atoms/atomState';
import { StyledResultsDiv } from './style/style';
import ResultItem from './ui/ResultItem';
import useUserLocation from '../../../../../../shared/api/useUserLocation';
import useCenters from '../../../../../../shared/api/useCenters';
import useRoads from '../../../../../../shared/api/useRoads';
import InfoSection from './ui/InfoSection';

const ResultsList = () => {
  const markerSource = useRecoilValue(markerSourceState);
  const userLocation = useUserLocation();

  // 훅에서 결과와 추가 API 호출 함수를 가져옵니다.
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

  let dataToDisplay = [];
  let hasMore = false;
  let loading = false;

  if (markerSource === 'centers') {
    dataToDisplay = centers;
    hasMore = centersHasMore;
    loading = centersLoading;
  } else if (markerSource === 'roads') {
    dataToDisplay = roads;
    hasMore = roadsHasMore;
    loading = roadsLoading;
  }

  // 스크롤 감지를 위한 ref 생성
  const listRef = useRef(null);

  const handleScroll = () => {
    if (!listRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    // scrollTop + clientHeight가 scrollHeight에 가까워지면 (예: 10px 이내)
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      // 이미 로딩 중이거나 추가 데이터가 없으면 호출하지 않음
      if (loading || !hasMore) return;

      if (markerSource === 'centers') {
        fetchCenters({ longitude: userLocation.lng, latitude: userLocation.lat });
      } else if (markerSource === 'roads') {
        fetchRoads({ longitude: userLocation.lng, latitude: userLocation.lat });
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (listRef.current) {
        listRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100); // 100ms 정도의 딜레이를 줍니다.
    return () => clearTimeout(timer);
  }, [markerSource]);
  

  // 컴포넌트가 마운트되면 최초 데이터 로딩을 할 수 있습니다.
  useEffect(() => {
    // 예: 컴포넌트 로딩 시 첫 페이지 호출 (조건에 따라 resetResults 등 추가 고려)
    if (markerSource === 'centers' && centers.length === 0) {
      fetchCenters({ longitude: userLocation.lng, latitude: userLocation.lat });
    } else if (markerSource === 'roads' && roads.length === 0) {
      fetchRoads({ longitude: userLocation.lng, latitude: userLocation.lat });
    }
  }, [markerSource, userLocation]);

  return (
    <StyledResultsDiv ref={listRef} onScroll={handleScroll}>
      {dataToDisplay.length > 0 ? (
        dataToDisplay.map(item => <ResultItem key={item.id} data={item} />)
      ) : (
        <InfoSection/>
      )}
    </StyledResultsDiv>
  );
};

export default ResultsList;
