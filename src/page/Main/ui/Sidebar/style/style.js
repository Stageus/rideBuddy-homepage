import styled from 'styled-components';

export const StyledMainDiv = styled.div`
  width: 300px;
  background-color: ${({ theme }) => theme.colors.coolGray10};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

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

export const StyledGraphDiv = styled.div`
  width: 90%;
  height: 150px;
  background-color: ${({ theme }) => theme.colors.coolGray20};
  margin: 20px 0;
  border-radius: 8px;
`;

export const StyledBikeImageDiv = styled.div`
  width: 120px;
  height: 120px;
  background-image: url('/path/to/bike-image.png');
  background-size: cover;
  background-position: center;
  margin-top: 20px;
`;

export const StyledResultsDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

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

export const StyledErrorMsgDiv = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.primary60};
`;

export const StyledErrorIconDiv = styled.div`
  font-size: 3em;
  margin-bottom: 10px;
`;

export const StyledNoResultsMsgDiv = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.primary60};
`;

export const StyledNoResultsIconDiv = styled.div`
  font-size: 3em;
  margin-bottom: 10px;
`;
