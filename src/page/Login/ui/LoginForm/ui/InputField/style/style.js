import styled from "styled-components";

export const SpaceBetweenDiv = styled.div`
  padding-left: ${({ padding }) => padding || '0'};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
