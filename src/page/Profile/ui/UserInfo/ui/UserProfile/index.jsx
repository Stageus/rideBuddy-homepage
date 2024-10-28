import styled from "styled-components";

const StyledUserProfileContainerDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

`;

const StyledAvatarContainerDiv = styled.div`
  position: relative;
  margin-right: 15px;
`;

const StyledAvatarImg = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #ddd;
`;

const StyledEditButtonButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const StyledProfileInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledProfileNameP = styled.p`
  font-weight: bold;
  color:${({ theme }) => theme.colors.black};
  
`;

const StyledProfileEmailP = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.bodyXS};
`;

const StyledProfilePhoneP = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.bodyXS};
  
`;

const UserProfile = () => {
  return (
    <StyledUserProfileContainerDiv>
      <StyledAvatarContainerDiv>
        <StyledAvatarImg />
        <StyledEditButtonButton>✏️</StyledEditButtonButton>
      </StyledAvatarContainerDiv>
      <StyledProfileInfoDiv>
        <StyledProfileNameP>홍길동</StyledProfileNameP>
        <StyledProfileEmailP>TEST_ID@gmail.com</StyledProfileEmailP>
        <StyledProfilePhoneP>010-0000-0000</StyledProfilePhoneP>
      </StyledProfileInfoDiv>
    </StyledUserProfileContainerDiv>
  );
};

export default UserProfile;
