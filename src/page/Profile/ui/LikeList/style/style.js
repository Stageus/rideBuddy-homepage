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
  padding: 0;
  margin: 25px 0;
  text-align: left;
  padding-left: 20px; 
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
