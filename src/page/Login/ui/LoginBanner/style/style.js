import styled from 'styled-components';

export const StyledLoginBanner = styled.div`
  width: 64%;
  img {
    width: 90%;
    box-sizing: border-box;
  }

  @media (max-width: 1400px) {
    width: 100%;
  }

  @media (max-width: 1024px) {
    display: none;
    width: 0px;
  }
`;
