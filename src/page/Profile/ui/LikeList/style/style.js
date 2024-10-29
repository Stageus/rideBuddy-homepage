// LikeList.styles.js
import styled from "styled-components";

export const StyledLikeListContainerDiv = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

export const StyledLikeListTitleH2 = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #3b5998;
  margin-bottom: 5px;
`;

export const StyledLikeListDescriptionP = styled.p`
  font-size: 14px;
  color: #888;
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

export const StyledActionButtonButton = styled.button`
  padding: 10px 20px;
  background-color: #3b5998;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #334a7d;
  }
`;
