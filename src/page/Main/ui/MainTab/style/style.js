import styled from 'styled-components';

export const StyledMainDiv = styled.div`
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







export const StyledErrorMsgDiv = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.primary60};
`;

export const StyledErrorIconDiv = styled.div`
  font-size: 3em;
  margin-bottom: 10px;
`;





export const StyledInputContainerDiv = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledKeywordList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 99.5%;
  background: ${({ theme }) => theme.colors.primary10};
  border: 1px solid ${({ theme }) => theme.colors.primary30};
  border-radius: 0 0 10px 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  margin: 0;
  padding: 10px 0;
  list-style: none;
  z-index: 10;

  li {
    padding: 8px 14px;
    cursor: pointer;
    font-size: ${({ theme }) => theme.fontSizes.bodyS};
    color: ${({ theme }) => theme.colors.text};

    &:hover {
      background: ${({ theme }) => theme.colors.coolGray20};
    }
  }
`;
