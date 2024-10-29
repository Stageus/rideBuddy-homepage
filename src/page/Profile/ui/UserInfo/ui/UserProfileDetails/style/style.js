// Details.styles.js
import styled from "styled-components";

export const StyledDetailsContainerDiv = styled.div`
  margin-bottom: 20px;
`;

export const StyledDetailItemDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary10};
`;

export const StyledDetailLabelSpan = styled.span`
  font-weight: bold;
`;

export const StyledDetailValueSpan = styled.span`
  color: ${({ theme }) => theme.colors.primary60};
`;

export const StyledDeleteAccountButton = styled.button`
  background-color: transparent;
  margin-top: 10px;
  font-size: ${({ theme }) => theme.fontSizes.bodyS};
  color: ${({ theme }) => theme.colors.error};
  display: block;
  margin-left: auto;
`;

export const StyledEditButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.primary60};
  cursor: pointer;
`;
