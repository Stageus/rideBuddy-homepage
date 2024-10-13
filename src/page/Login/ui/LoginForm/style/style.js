import styled from 'styled-components';

export const StyledLoginForm = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    color: ${({ theme }) => theme.colors.primary90};
  }

  p:nth-child(2) {
    margin-top: 5px;
    margin-bottom: 15px;
  }

  span {
    margin-top: 50px;
    margin-bottom: 30px;
    text-align: center;
    font-size: ${({ theme }) => theme.fontSizes.bodyM};
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
  justify-content: center;
`;

export const StyledSignUpDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;
