// Messages.js
import React from 'react';
import { StyledErrorMessage } from '../../../../style/styles';

const Messages = ({ errorMessage, successMessage }) => {
  if (errorMessage) {
    return <StyledErrorMessage>{errorMessage}</StyledErrorMessage>;
  }
  if (successMessage) {
    return <p>{successMessage}</p>;
  }
  return <p>빠르고 쉽게 가입하세요.</p>;
};

export default Messages;
