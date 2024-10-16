import { Link } from 'react-router-dom';
import styled from 'styled-components';

// 1. 공통 버튼 스타일
export const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary60};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: 14px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.buttonM};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  border-radius: 10px;
  width: ${({ width }) => width || 'auto'}; /* width를 props로 받아서 설정, 기본값은 auto */
`;

// 2. 공통 컨테이너 스타일
export const StyledContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: ${({ width }) => width || 'auto'};
`;

// 4. 공통 인풋 스타일
export const StyledInput = styled.input`
  padding: 14px;
  border: 1px solid
    ${({ theme, status }) => (status && status !== 200 ? theme.colors.error : theme.colors.coolGray20)};
  border-radius: 10px;
  font-size: ${({ theme }) => theme.fontSizes.bodyM};
  color: ${({ theme }) => theme.colors.text};
  width: ${({ width }) => width || '100%'};
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ theme, status }) =>
      status !== 200 ? theme.colors.error : theme.colors.primary60};
    box-shadow: 0 0 4px
      ${({ theme, status }) =>
        status !== 200 ? theme.colors.error : theme.colors.primary30};
  }
`;

export const StyledText = styled.p`
  font-size: ${({ size, theme }) => theme.fontSizes[size] || theme.fontSizes.bodyM};
  font-weight: ${({ weight, theme }) => theme.fontWeights[weight] || theme.fontWeights.regular};
  color: ${({ color, theme }) => theme.colors[color] || theme.colors.text};
  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || '0'};
  line-height: 1.5;
`;

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary60};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.bodyS};
  text-decoration: none;
  cursor: pointer;
`;

export const StyledErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.bodyXS};
`;
