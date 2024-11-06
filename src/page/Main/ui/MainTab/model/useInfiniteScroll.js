import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const useInfiniteScroll = (searchTerm, allData) => {
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  const itemsPerPage = 20;

  const loadMoreData = () => {
    const newItems = allData
      .filter(item => item.name.includes(searchTerm))
      .slice((page - 1) * itemsPerPage, page * itemsPerPage);

    setSearchResults(prevResults => [
      ...prevResults,
      ...newItems.map((item, index) => ({ id: prevResults.length + index + 1, ...item })),
    ]);

    setPage(prevPage => prevPage + 1);

    if (newItems.length < itemsPerPage) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    if (inView && hasMore) {
      loadMoreData();
    }
  }, [inView]);

  useEffect(() => {
    // 검색어가 변경되면 초기화
    setSearchResults([]);
    setPage(1);
    setHasMore(true);
  }, [searchTerm]);

  return {
    searchResults,
    ref,
    hasMore,
  };
};

export default useInfiniteScroll;
