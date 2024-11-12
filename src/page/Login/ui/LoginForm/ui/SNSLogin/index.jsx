import React from 'react';
import { StyledSNSLoginBtn } from './style/style';

const SNSLoginButton = ({ icon, label, onClick , logo}) => (
  <StyledSNSLoginBtn aria-label={label} onClick={onClick} logo={logo} >
    {icon}
  </StyledSNSLoginBtn>
);

export default SNSLoginButton;
