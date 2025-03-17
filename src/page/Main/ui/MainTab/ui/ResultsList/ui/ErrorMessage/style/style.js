import styled from "styled-components";

export const StyledErrorMsgDiv = styled.div`
  width: 100%;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary60};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  P {
    margin-bottom: 5px;
  }
`;

export const StyledErrorIconDiv = styled.div`
  & > img {
    width: 65px;
    height: 65px;
  }
  
  font-size: 3em;
  margin-bottom: 10px;
`;
