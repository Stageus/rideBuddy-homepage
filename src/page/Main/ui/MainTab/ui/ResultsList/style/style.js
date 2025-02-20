import styled from "styled-components";

export const StyledResultsDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  height: 100vh;      /* 고정 높이 설정 */
  overflow-y: auto;   /* 세로 스크롤 활성화 */
  scroll-behavior: smooth;
`;

