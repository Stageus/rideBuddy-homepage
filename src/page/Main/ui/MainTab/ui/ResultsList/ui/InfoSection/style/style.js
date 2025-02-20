import styled from "styled-components";

export const StyledInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const StyledLocInfoDiv = styled.div`
  text-align: center;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.primary60};

  h2 {
    margin: 10px 0;
    font-size: ${({ theme }) => theme.fontSizes.heading2};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }

  p {
    margin: 5px 0;
    font-size: ${({ theme }) => theme.fontSizes.bodyM};
  }
`;

export const StyledSmileyDiv = styled.div`
  font-size: 4em;
  margin: 20px 0;
`;

export const StyledRideStatusP = styled.p`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.bodyL};
  color: ${({ theme }) => theme.colors.primary60};
  margin-bottom: 50px;
`;