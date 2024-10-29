import { StyledActionButtonButton, StyledActionButtonContainerDiv, StyledLikeListContainerDiv, StyledLikeListDescriptionP, StyledLikeListImg, StyledLikeListTitleH2 } from "./style/style";

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
