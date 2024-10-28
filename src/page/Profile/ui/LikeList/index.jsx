import styled from "styled-components";

const StyledLikeListContainerDiv = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const StyledLikeListTitleH2 = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #3b5998;
  margin-bottom: 5px;
`;

const StyledLikeListDescriptionP = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 10px;
`;

const StyledLikeListImg = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
`;

const StyledActionButtonContainerDiv = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const StyledActionButtonButton = styled.button`
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

const LikeList = () => {
  return (
    <StyledLikeListContainerDiv>
      <StyledLikeListTitleH2>좋아요 리스트</StyledLikeListTitleH2>
      <StyledLikeListDescriptionP>Like Ridebuddy</StyledLikeListDescriptionP>
      <StyledLikeListImg src="path-to-bike-image.png" alt="자전거 이미지" />

      <StyledActionButtonContainerDiv>
        <StyledActionButtonButton>인증 센터</StyledActionButtonButton>
        <StyledActionButtonButton>국토 종주</StyledActionButtonButton>
      </StyledActionButtonContainerDiv>
    </StyledLikeListContainerDiv>
  );
};

export default LikeList;
