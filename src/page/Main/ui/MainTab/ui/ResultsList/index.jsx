import React, { useEffect, useRef, useCallback } from 'react';
import {
  centersState,
  roadsState,
  markerSourceState,
  searchResultsState,
  searchQueryState,
  selectedItemState, // 새로 추가
} from '../../../../../../shared/recoil/atoms/atomState';
import { StyledResultsDiv } from './style/style';
import ResultItem from './ui/ResultItem';
import useUserLocation from '../../../../../../shared/api/useUserLocation';
import useCenters from '../../../../../../shared/api/useCenters';
import useRoads from '../../../../../../shared/api/useRoads';
import useSearchResults from '../../api/useSearchResults';
import InfoSection from './ui/InfoSection';
import { useRecoilState, useRecoilValue } from 'recoil';

const ResultsList = () => {
  const markerSource = useRecoilValue(markerSourceState);
  const userLocation = useUserLocation();
  const searchResults = useRecoilValue(searchResultsState) || [];
  const searchQuery = useRecoilValue(searchQueryState);
  const listRef = useRef(null);
  const prevScrollHeight = useRef(0);

  const { results: centers, loading: centersLoading, fetchCenters, hasMore: centersHasMore } = useCenters();
  const { results: roads, loading: roadsLoading, fetchRoads, hasMore: roadsHasMore } = useRoads();
  const { loading: searchLoading, search, hasMore: searchHasMore, page: searchPage } = useSearchResults();

  // Recoil 상태로 selectedItem 관리
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState); // useState 대신 useRecoilState 사용

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

  const handleScroll = useCallback(() => {
    if (!listRef.current || loading || !hasMore || selectedItem) return;
    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      prevScrollHeight.current = scrollHeight;
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
  }, [markerSource, loading, hasMore, userLocation, searchQuery, searchPage, searchResults.length, fetchCenters, fetchRoads, search, selectedItem]);

  useEffect(() => {
    if (markerSource === 'centers' && (!centers || centers.length === 0)) {
      fetchCenters({ longitude: userLocation.lng, latitude: userLocation.lat });
    } else if (markerSource === 'roads' && (!roads || roads.length === 0)) {
      fetchRoads({ longitude: userLocation.lng, latitude: userLocation.lat });
    }
  }, [markerSource, userLocation, centers, roads, fetchCenters, fetchRoads]);

  useEffect(() => {
    if (listRef.current && prevScrollHeight.current && !loading) {
      const { scrollHeight } = listRef.current;
      listRef.current.scrollTop = scrollHeight - prevScrollHeight.current;
    }
  }, [dataToDisplay.length, loading]);

  useEffect(() => {
    if (listRef.current && dataToDisplay.length === 0) {
      listRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [markerSource]);

  const handleItemClick = (item) => {
    setSelectedItem(item); // Recoil 상태 업데이트
  };

  return (
    <StyledResultsDiv ref={listRef} onScroll={handleScroll}>
      {selectedItem ? (
        <ResultItem key={selectedItem.id ?? selectedItem.idx} data={selectedItem} />
      ) : dataToDisplay.length > 0 ? (
        dataToDisplay.map(item => (
          <ResultItem
            key={item.id ?? item.idx}
            data={item}
            onClick={() => handleItemClick(item)}
          />
        ))
      ) : markerSource === 'search' ? (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          검색 결과가 없습니다.
        </div>
      ) : (
        <InfoSection />
      )}
      {loading && !selectedItem && (
        <div style={{ padding: '20px', textAlign: 'center', opacity: 0.7 }}>
          로딩 중...
        </div>
      )}
    </StyledResultsDiv>
  );
};

export default ResultsList;