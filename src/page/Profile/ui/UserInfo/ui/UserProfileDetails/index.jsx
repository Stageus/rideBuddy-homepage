import styled from "styled-components";

const StyledDetailsContainerDiv = styled.div`
  margin-bottom: 20px;
`;

const StyledDetailItemDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary10};
`;

const StyledDetailLabelSpan = styled.span`
  font-weight: bold;
`;

const StyledDetailValueSpan = styled.span`
  color:${({ theme }) => theme.colors.primary60};
`;

const StyledDeleteAccountButton = styled.button`
background-color: transparent;
margin-top: 10px;
font-size: ${({ theme }) => theme.fontSizes.bodyS};
color: ${({ theme }) => theme.colors.error};
display: block;
margin-left: auto;
`;

const StyledEditButton = styled.button`
  background-color: transparent;
  border: none;
  color:${({ theme }) => theme.colors.primary60};
  cursor: pointer;
`;

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
