import styled from 'styled-components';

// 1. 공통 버튼 스타일
export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary60};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: 10px 20px;
  font-size: ${({ theme }) => theme.fontSizes.buttonM};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  border-radius: 4px;
  width: ${({ width }) => width || 'auto'}; /* width를 props로 받아서 설정, 기본값은 auto */
`;

// 2. 공통 컨테이너 스타일
export const Container = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  box-shadow: 0px 4px 8px ${({ theme }) => theme.colors.overlay};
  margin: 20px 0;
  width: ${({ width }) => width || 'auto'};
`;

// 4. 공통 인풋 스타일
export const Input = styled.input`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.coolGray20};
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes.bodyM};
  color: ${({ theme }) => theme.colors.text};
  width: ${({ width }) => width || '100%'};
  margin-bottom: 16px;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary60};
    box-shadow: 0 0 4px ${({ theme }) => theme.colors.primary30};
  }
`;

export const Text = styled.p`
  font-size: ${({ size, theme }) => theme.fontSizes[size] || theme.fontSizes.bodyM};
  font-weight: ${({ weight, theme }) => theme.fontWeights[weight] || theme.fontWeights.regular};
  color: ${({ color, theme }) => theme.colors[color] || theme.colors.text};
  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || '0'};
  line-height: 1.5;
`;

export const StyledLink = styled.a`
  color: ${({ theme }) => theme.colors.primary60};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary90};
    text-decoration: underline;
  }
`;
