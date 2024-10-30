import styled from 'styled-components';

export const StyledSidebarDiv = styled.div`
  width: 300px;
  background-color: ${({ theme }) => theme.colors.coolGray10};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const StyledSearchInputInput = styled.input`
  width: 90%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid ${({ theme }) => theme.colors.coolGray30};
  border-radius: 20px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.bodyM};
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.primary10};

  ::placeholder {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const StyledDefaultInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledLocationInfoDiv = styled.div`
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
`;

export const StyledGraphPlaceholderDiv = styled.div`
  width: 90%;
  height: 150px;
  background-color: ${({ theme }) => theme.colors.coolGray20};
  margin: 20px 0;
  border-radius: 8px;
`;

export const StyledBikeImagePlaceholderDiv = styled.div`
  width: 120px;
  height: 120px;
  background-image: url('/path/to/bike-image.png');
  background-size: cover;
  background-position: center;
  margin-top: 20px;
`;

export const StyledResultsContainerDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StyledResultItemDiv = styled.div`
  background-color: ${({ theme }) => theme.colors.primary30};
  border-radius: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.fontSizes.bodyM};
  color: ${({ theme }) => theme.colors.white};
  width: 90%;
  margin: 0 auto;
`;

export const StyledLocationIconDiv = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.heading4};
`;

export const StyledErrorMessageDiv = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.primary60};
`;

export const StyledErrorIconDiv = styled.div`
  font-size: 3em;
  margin-bottom: 10px;
`;

export const StyledNoResultsMessageDiv = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.primary60};
`;

export const StyledNoResultsIconDiv = styled.div`
  font-size: 3em;
  margin-bottom: 10px;
`;
