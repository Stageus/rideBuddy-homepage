import React, { useEffect, useRef } from 'react';
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
    console.log('centers:', centers);
  } else if (markerSource === 'roads') {
    dataToDisplay = roads || [];
    hasMore = roadsHasMore;
    loading = roadsLoading;
    console.log('roads:', roads);
  } else if (markerSource === 'search') {
    dataToDisplay = searchResults; // Recoil 상태 사용
    hasMore = searchHasMore;
    loading = searchLoading;
    console.log('searchResults:', searchResults);
  }

  const handleScroll = () => {
    if (!listRef.current || loading || !hasMore) return;
    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      if (markerSource === 'centers') {
        fetchCenters({ longitude: userLocation.lng, latitude: userLocation.lat });
      } else if (markerSource === 'roads') {
        fetchRoads({ longitude: userLocation.lng, latitude: userLocation.lat });
      } else if (markerSource === 'search' && searchResults.length > 0) {
        console.log('Fetching next page for search:', { searchQuery, page: searchPage + 1 });
        search({
          search: searchQuery,
          page: searchPage + 1,
          longitude: userLocation.lng,
          latitude: userLocation.lat,
          append: true,
        });
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (listRef.current) listRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
    return () => clearTimeout(timer);
  }, [markerSource]);

  useEffect(() => {
    if (markerSource === 'centers' && (!centers || centers.length === 0)) {
      fetchCenters({ longitude: userLocation.lng, latitude: userLocation.lat });
    } else if (markerSource === 'roads' && (!roads || roads.length === 0)) {
      fetchRoads({ longitude: userLocation.lng, latitude: userLocation.lat });
    }
  }, [markerSource, userLocation, centers, roads, fetchCenters, fetchRoads]);

  return (
    <StyledResultsDiv ref={listRef} onScroll={handleScroll}>
      {loading ? (
        <div style={{ padding: '20px', textAlign: 'center' }}>로딩 중...</div>
      ) : dataToDisplay.length > 0 ? (
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
    </StyledResultsDiv>
  );
};

export default ResultsList;