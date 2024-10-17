import styled from 'styled-components';

export const StyledFindPwFormSection = styled.section`
  padding: 16px;
  background: #fff;
  border-radius: 5px;
  h1 {
    margin-top: 30px;
    font-size: ${({ theme }) => theme.fontSizes.heading2};
    color: ${({ theme }) => theme.colors.primary90};
    text-align: center;
    margin-bottom: 30px;
  }
  p {
    text-align: center;
    font-size: ${({ theme }) => theme.fontSizes.subtitleS};
    margin-bottom: 60px;
  }
`;

export const StyledFindPwForm = styled.div`
  input {
    margin-bottom: 15px;
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    margin-top: 150px;
  }
  label {
    color: ${({ theme }) => theme.colors.primary60};
    display: block;
    margin-bottom: 10px;
    span {
      margin-left: 1px;
      color: ${({ theme }) => theme.colors.coolGray40};
      font-size: ${({ theme }) => theme.fontSizes.bodyXXS};
    }
  }
`;

export const StyledEmailDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 15px;
  input {
    margin-bottom: 0px;
  }

  button {
    margin-left: 10px;
    width: 90px;
    height: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${({ theme }) => theme.fontSizes.bodyS};
  }
`;

export const StyledHiddenEmailDiv = styled.div`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  position: relative;
  span {
    position: absolute;
    top: 48.5%;
    right: 15px;
  }
`;
