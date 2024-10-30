import styled from 'styled-components';
import { StyledContainer } from '../../../style/styles';

export const PageWrapper = styled(StyledContainer)`
  max-width: 330px;
  padding: 16px;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.colors.primary30};
  border-radius: 10px;
  width: 100%;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.bodyS};
  color:${({ theme }) => theme.colors.primary60};
  left: calc(50% + 25px);
  @media (max-width: 1400px) {
    top: calc(50% + 25px);
    left: calc(50%);
  }
`;
