// ErrorMessage.js
import React from 'react';
import { StyledErrorIconDiv, StyledErrorMsgDiv } from './style/style';


const ErrorMessage = () => {
  return (
    <StyledErrorMsgDiv>
      <StyledErrorIconDiv>🔄</StyledErrorIconDiv>
      <p>데이터를 불러올 수 없습니다.</p>
      <p>잠시 후 다시 시도해 주세요.</p>
    </StyledErrorMsgDiv>
  );
};

export default ErrorMessage;
