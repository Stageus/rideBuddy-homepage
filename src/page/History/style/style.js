import styled from 'styled-components';
import { StyledContainer } from '../../../style/styles';

export const PageWrapper = styled(StyledContainer)`
  max-width: 380px;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 5px;
  width: 100%;
  margin: 0 auto;
  border: 1px solid ${({ theme }) => theme.colors.coolGray20};
  color: ${({ theme }) => theme.colors.primary60};
  background-color: ${({ theme }) => theme.colors.white};
  overflow-y: auto;

  height: calc(100vh);
  margin-top: 63px;

  &::-webkit-scrollbar {
    display: none;
  }
`;
