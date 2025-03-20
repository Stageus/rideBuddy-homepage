import styled from "styled-components";
import { StyledButton } from "../../../../../style/styles";

export const StyledLikeListContainerDiv = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

export const StyledLikeListTitleH2 = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary60};
  margin-bottom: 5px;
`;

export const StyledLikeListDescriptionP = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary60};
  margin-bottom: 10px;
`;

export const StyledLikeListImg = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
`;

export const StyledActionButtonContainerDiv = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

export const StyledListUl = styled.ul`
  list-style: none;
  margin-top: 16px;
  text-align: left;
  padding-left: 20px;
  height: 145px;
  overflow: hidden;
  overflow-y: scroll;
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

export const StyledListItemLi = styled.li`
  display: flex;
  align-items: center;
  margin: 10px 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary60};

  .icon {
    margin-right: 5px;
    font-size: 18px;
  }
`;

export const StyledListButton = styled(StyledButton)`
  background-color: ${({ active, theme }) => (active ? theme.colors.primary60 : theme.colors.primary10)};
  color: ${({ active, theme }) => (active ? theme.colors.white : theme.colors.primary60)};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary60};
    color: ${({ theme }) => theme.colors.white};
  }
`;
