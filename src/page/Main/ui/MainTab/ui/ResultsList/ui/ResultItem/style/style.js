import styled from 'styled-components';

export const StyledResultItemDiv = styled.div`
  background-color: ${({ theme }) => theme.colors.primary30};
  border-radius: 10px;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.fontSizes.bodyS};
  color: ${({ theme }) => theme.colors.white};
  width: 90%;
  margin: 0 auto;
`;

export const StyledLocIconDiv = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.heading4};
`;