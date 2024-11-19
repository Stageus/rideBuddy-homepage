import styled from 'styled-components';
import { StyledContainer } from '../../../style/styles';

export const PageWrapper = styled(StyledContainer)`
  max-width: 380px;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 5px;
  width: 100%;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.primary60};
  background-color: ${({ theme }) => theme.colors.primary30};
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-height: 900px) {
    height: 100vh;
  }
`;

export const StyledSignUpSection = styled.section`
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

export const StyledSignUpForm = styled.div`
  div {margin-bottom:15px}
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



