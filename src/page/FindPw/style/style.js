import styled from 'styled-components';
import { StyledContainer } from '../../../style/styles';

export const PageWrapper = styled(StyledContainer)`
  max-width: 380px;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 5px;
  width: 100%;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.primary60};
  background-color: ${({ theme }) => theme.colors.primary30};
`;
