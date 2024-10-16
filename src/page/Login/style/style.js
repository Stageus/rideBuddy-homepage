import styled from 'styled-components';
import { StyledContainer } from '../../../style/styles';

export const PageWrapper = styled(StyledContainer)`
  max-width: 1500px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.primary60};

  @media (max-width: 1400px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
  }
`;
