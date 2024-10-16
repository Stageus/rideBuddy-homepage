import styled from 'styled-components';

export const StyledLoginForm = styled.div`
  width: 33%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    color: ${({ theme }) => theme.colors.primary90};
  }

  p:nth-child(2) {
    margin-top: 5px;
    margin-bottom: 25px;
  }

  span {
    margin-top: 50px;
    margin-bottom: 30px;
    text-align: center;
    font-size: ${({ theme }) => theme.fontSizes.bodyM};
  }

  @media (max-width: 1400px) {
    width: 100%;
    margin-top: 50px;
  }
`;

export const StyledInputDiv = styled.div`
  a {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
    margin-bottom: 15px;
  }
`;

export const StyledSNSLoginDiv = styled.div`
  display: flex;
  width: 110px;
  justify-content: space-between;
  margin-left:auto;
  margin-right: auto;
`;

export const StyledSignUpDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

export const StyledSNSLoginBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 30px;
  background: ${({ logo }) => 
    logo === 'naver' ? '#2DB400' : 'none'};
  border: 1px solid ${({ theme }) => theme.colors.coolGray20};
  border-radius: 5px;

  svg {
    width: ${({ logo }) => (logo === 'naver' ? '14px' : '18px')};
    height: ${({ logo }) => (logo === 'naver' ? '14px' : '18px')};
    color: #fff;
  }
`;

export const SpaceBetweenDiv = styled.div`
  padding-left: ${({ padding }) => padding || '0'};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;



