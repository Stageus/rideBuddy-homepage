import styled from "styled-components";

export const StyledInputContainerDiv = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledKeywordList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 99.5%;
  background: ${({ theme }) => theme.colors.primary10};
  border: 1px solid ${({ theme }) => theme.colors.primary30};
  border-radius: 0 0 10px 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  margin: 0;
  padding: 10px 0;
  list-style: none;
  z-index: 10;

  li {
    padding: 8px 14px;
    cursor: pointer;
    font-size: ${({ theme }) => theme.fontSizes.bodyS};
    color: ${({ theme }) => theme.colors.text};

    &:hover {
      background: ${({ theme }) => theme.colors.coolGray20};
    }
  }
`;
