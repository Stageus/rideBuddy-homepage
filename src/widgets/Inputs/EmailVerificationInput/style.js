import styled from "styled-components";

export const StyledHiddenEmailDiv = styled.div`
  display: block;
  position: relative;
  span {
    position: absolute;
    top: 44px;
    right: 115px;
  }
`;

export const StyledEmailConfirmDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  button {
    margin-left: 10px;
    width: 120px;
    height: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${({ theme }) => theme.fontSizes.bodyS};
  }
`;
