import styled from "styled-components";

export const StyledIdConfirmDiv = styled.div`
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