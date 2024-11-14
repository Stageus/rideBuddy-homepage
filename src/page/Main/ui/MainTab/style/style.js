import styled from 'styled-components';

export const StyledMainDiv = styled.div`
  position: relative;
  width: 330px;
  background-color: ${({ theme }) => {
    const primary10 = theme.colors.primary10;
    const [r, g, b] = primary10.match(/\w\w/g).map(x => parseInt(x, 16));
    return `rgba(${r}, ${g}, ${b}, 0.3)`;
  }};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
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