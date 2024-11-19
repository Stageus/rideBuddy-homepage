import styled from "styled-components";

export const StyledEmailDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  button {
    margin-left: 10px;
    width: 90px;
    height: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${({ theme }) => theme.fontSizes.bodyS};
  }
`;