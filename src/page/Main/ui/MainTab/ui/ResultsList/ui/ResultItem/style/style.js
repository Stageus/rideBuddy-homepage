import styled from 'styled-components';

export const StyledResultItemDiv = styled.div`
  background-color: ${({ theme }) => theme.colors.primary30};
  border-radius: 10px;
  padding: 15px 10px 15px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.fontSizes.bodyS};
  color: ${({ theme }) => theme.colors.white};
  width: 90%;
  margin: 0 auto;
  border: 1px solid  ${({ theme }) => theme.colors.primary60};;
`;

export const StyledLocIconDiv = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.heading4};
`;