import styled from 'styled-components';

export const StyledLoginBanner = styled.div`
  width: 60%;
  img {
    width: 100%;
  }

  @media (max-width: 768px) {
    // 모바일 환경 (768px 이하)
    img {
      display: none;
    }
  }
`;
