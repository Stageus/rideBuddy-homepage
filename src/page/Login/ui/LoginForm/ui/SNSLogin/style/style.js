import styled from "styled-components";

export const StyledSNSLoginBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 30px;
  background: ${({ logo }) => (logo === 'naver' ? '#2DB400' : 'none')};
  border: 1px solid ${({ theme }) => theme.colors.coolGray20};
  border-radius: 5px;

  svg {
    width: ${({ logo }) => (logo === 'naver' ? '14px' : '18px')};
    height: ${({ logo }) => (logo === 'naver' ? '14px' : '18px')};
    color: #fff;
  }
`;