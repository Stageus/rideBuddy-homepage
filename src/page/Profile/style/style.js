import styled from 'styled-components';
import { StyledContainer } from '../../../style/styles';

export const PageWrapper = styled(StyledContainer)`
  max-width: 320px;
  padding: 16px;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.colors.primary30};
  border-radius: 5px;
  width: 100%;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.bodyS};
  color:${({ theme }) => theme.colors.primary60};
`;
