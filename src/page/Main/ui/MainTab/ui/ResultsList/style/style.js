import styled from 'styled-components';

export const StyledResultsDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;

  /* 웹킷 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 6px; /* 스크롤바 너비 */
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.primary10};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary30};
    border-radius: 10px;
  }
`;
