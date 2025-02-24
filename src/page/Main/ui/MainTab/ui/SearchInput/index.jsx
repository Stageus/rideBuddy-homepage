// components/ui/SearchInput.js
import React, { useState, useEffect } from 'react';
import { StyledInputContainerDiv } from './style/style';
import { StyledInputPrimary30 } from '../../../../../../style/styles';
import useSearch from '../../api/useSearch';


const SearchInput = () => {
  const [query, setQuery] = useState('');
  const { data, loading, error, search } = useSearch();

  useEffect(() => {
    if (data) {
      console.log('Search API response:', data);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error('Search API error:', error);
    }
  }, [error]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length === 0) return;
    
    search(value);
  };

  return (
    <StyledInputContainerDiv>
      <StyledInputPrimary30
        type="text"
        placeholder="검색어를 입력해주세요"
        value={query}
        onChange={handleInputChange}
      />
    </StyledInputContainerDiv>
  );
};

export default SearchInput;
