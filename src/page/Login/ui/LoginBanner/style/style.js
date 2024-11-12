import styled from 'styled-components';

export const StyledLoginBanner = styled.div`
  width: 50%;
  img {
    width: 100%;
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
