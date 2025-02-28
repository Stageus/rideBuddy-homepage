// components/ui/ResultsList.js
import React, { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
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
import InfoSection from './ui/InfoSection';
import useSearchResults from '../../api/useSearchResults';

const ResultsList = () => {
  const markerSource = useRecoilValue(markerSourceState);
  const userLocation = useUserLocation();
  const searchResults = useRecoilValue(searchResultsState) || [];
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);

  const { results: centers, loading: centersLoading, error: centersError, fetchCenters, hasMore: centersHasMore } = useCenters();
  const { results: roads, loading: roadsLoading, error: roadsError, fetchRoads, hasMore: roadsHasMore } = useRoads();
  const { loading: searchLoading, search, hasMore: searchHasMore, page: searchPage } = useSearchResults();

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
  } else if (markerSource === 'search') {
    dataToDisplay = searchResults;
    hasMore = searchHasMore;
    loading = searchLoading;
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
      } else if (markerSource === 'search' && searchResults.length > 0) {
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
      if (listRef.current) {
        listRef.current.scrollTo({ top: 0 });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [markerSource]);

  useEffect(() => {
    if (markerSource === 'centers' && centers.length === 0) {
      fetchCenters({ longitude: userLocation.lng, latitude: userLocation.lat });
    } else if (markerSource === 'roads' && roads.length === 0) {
      fetchRoads({ longitude: userLocation.lng, latitude: userLocation.lat });
    }
  }, [markerSource, userLocation]);

  return (
    <StyledResultsDiv ref={listRef} onScroll={handleScroll}>
      {dataToDisplay.length > 0 ? dataToDisplay.map(item => <ResultItem key={item.id} data={item} />) : <InfoSection />}
    </StyledResultsDiv>
  );
};

export default ResultsList;
