// NoResultsMessage.js
import React from 'react';
import { StyledNoResultsIconDiv, StyledNoResultsMsgDiv } from './style/style';

const NoResultsMessage = () => {
  return (
    <StyledNoResultsMsgDiv>
      <StyledNoResultsIconDiv>❌</StyledNoResultsIconDiv>
      <p>검색 결과가 없습니다.</p>
      <p>다른 검색어를 시도해 보세요.</p>
    </StyledNoResultsMsgDiv>
  );
};

export default NoResultsMessage;
