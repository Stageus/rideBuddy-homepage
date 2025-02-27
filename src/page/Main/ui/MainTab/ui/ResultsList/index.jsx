import React, { useEffect, useRef, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import {
  centersState,
  roadsState,
  markerSourceState,
  searchResultsState,
  searchQueryState,
} from '../../../../../../shared/recoil/atoms/atomState';
import { StyledResultsDiv } from './style/style';
import ResultItem from './ui/ResultItem';
import useUserLocation from '../../../../../../shared/api/useUserLocation';
import useCenters from '../../../../../../shared/api/useCenters';
import useRoads from '../../../../../../shared/api/useRoads';
import useSearchResults from '../../api/useSearchResults';
import InfoSection from './ui/InfoSection';

const ResultsList = () => {
  const markerSource = useRecoilValue(markerSourceState);
  const userLocation = useUserLocation();
  const searchResults = useRecoilValue(searchResultsState) || [];
  const searchQuery = useRecoilValue(searchQueryState);
  const listRef = useRef(null);
  const prevScrollHeight = useRef(0); // 이전 스크롤 높이 저장

  const { results: centers, loading: centersLoading, fetchCenters, hasMore: centersHasMore } = useCenters();
  const { results: roads, loading: roadsLoading, fetchRoads, hasMore: roadsHasMore } = useRoads();
  const { loading: searchLoading, search, hasMore: searchHasMore, page: searchPage } = useSearchResults();

  let dataToDisplay = [];
  let hasMore = false;
  let loading = false;

  if (markerSource === 'centers') {
    dataToDisplay = centers || [];
    hasMore = centersHasMore;
    loading = centersLoading;
  } else if (markerSource === 'roads') {
    dataToDisplay = roads || [];
    hasMore = roadsHasMore;
    loading = roadsLoading;
  } else if (markerSource === 'search') {
    dataToDisplay = searchResults;
    hasMore = searchHasMore;
    loading = searchLoading;
  }

  // 스크롤 핸들러 (디바운싱 적용)
  const handleScroll = useCallback(() => {
    if (!listRef.current || loading || !hasMore) return;
    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 50) { // 트리거 범위 조정
      prevScrollHeight.current = scrollHeight; // 현재 높이 저장
      if (markerSource === 'centers') {
        fetchCenters({ longitude: userLocation.lng, latitude: userLocation.lat });
      } else if (markerSource === 'roads') {
        fetchRoads({ longitude: userLocation.lng, latitude: userLocation.lat });
      } else if (markerSource === 'search' && searchResults.length > 0) {
        console.log('Fetching next page:', { searchQuery, page: searchPage + 1 });
        search({
          search: searchQuery,
          page: searchPage + 1,
          longitude: userLocation.lng,
          latitude: userLocation.lat,
          append: true,
        });
      }
    }
  }, [markerSource, loading, hasMore, userLocation, searchQuery, searchPage, searchResults.length, fetchCenters, fetchRoads, search]);

  // 초기 데이터 로드
  useEffect(() => {
    if (markerSource === 'centers' && (!centers || centers.length === 0)) {
      fetchCenters({ longitude: userLocation.lng, latitude: userLocation.lat });
    } else if (markerSource === 'roads' && (!roads || roads.length === 0)) {
      fetchRoads({ longitude: userLocation.lng, latitude: userLocation.lat });
    }
  }, [markerSource, userLocation, centers, roads, fetchCenters, fetchRoads]);

  // 데이터 추가 후 스크롤 위치 유지
  useEffect(() => {
    if (listRef.current && prevScrollHeight.current && !loading) {
      const { scrollHeight } = listRef.current;
      // 새로운 데이터가 추가된 경우, 이전 위치에서 추가된 높이만큼 유지
      listRef.current.scrollTop = scrollHeight - prevScrollHeight.current;
    }
  }, [dataToDisplay.length, loading]);

  // markerSource 변경 시 스크롤 초기화 (최초 검색 시에만)
  useEffect(() => {
    if (listRef.current && dataToDisplay.length === 0) {
      listRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [markerSource]);

  return (
    <StyledResultsDiv ref={listRef} onScroll={handleScroll}>
      {dataToDisplay.length > 0 ? (
        dataToDisplay.map(item => (
          <ResultItem key={item.id ?? item.idx} data={item} />
        ))
      ) : markerSource === 'search' ? (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          검색 결과가 없습니다.
        </div>
      ) : (
        <InfoSection />
      )}
      {loading && (
        <div style={{ padding: '20px', textAlign: 'center', opacity: 0.7 }}>
          로딩 중...
        </div>
      )}
    </StyledResultsDiv>
  );
};

export default ResultsList;