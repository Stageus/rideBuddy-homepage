import { StyledDeleteAccountButton, StyledDetailItemDiv, StyledDetailLabelSpan, StyledDetailValueSpan, StyledDetailsContainerDiv, StyledEditButton } from "./style/style";

const UserProfileDetails = () => {
  return (
    <StyledDetailsContainerDiv>
      <StyledDetailItemDiv>
        <StyledDetailLabelSpan>이름</StyledDetailLabelSpan>
        <StyledDetailValueSpan>홍길동</StyledDetailValueSpan>
      </StyledDetailItemDiv>
      <StyledDetailItemDiv>
        <StyledDetailLabelSpan>이메일 계정</StyledDetailLabelSpan>
        <StyledDetailValueSpan>TEST_ID@gmail.com</StyledDetailValueSpan>
      </StyledDetailItemDiv>
      <StyledDetailItemDiv>
        <StyledDetailLabelSpan>아이디</StyledDetailLabelSpan>
        <StyledDetailValueSpan>TEST_ID</StyledDetailValueSpan>
      </StyledDetailItemDiv>
      <StyledDetailItemDiv>
        <StyledDetailLabelSpan>비밀번호</StyledDetailLabelSpan>
        <StyledEditButton>수정</StyledEditButton>
      </StyledDetailItemDiv>
      <StyledDetailItemDiv>
        <StyledDetailLabelSpan>전화번호</StyledDetailLabelSpan>
        <StyledEditButton>수정</StyledEditButton>
      </StyledDetailItemDiv>
      <StyledDeleteAccountButton>회원탈퇴</StyledDeleteAccountButton>
    </StyledDetailsContainerDiv>
  );
};

export default UserProfileDetails;
