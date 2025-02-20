import styled from "styled-components";

export const StyledNoResultsMsgDiv = styled.div`
  width: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  text-align: center;
  color: ${({ theme }) => theme.colors.primary60};
`;

export const StyledNoResultsIconDiv = styled.div`
  font-size: 3em;
  margin-bottom: 10px;
`;