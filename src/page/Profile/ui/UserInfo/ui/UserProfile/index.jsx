import { StyledAvatarContainerDiv, StyledAvatarImg, StyledEditButtonButton, StyledProfileEmailP, StyledProfileInfoDiv, StyledProfileNameP, StyledProfilePhoneP, StyledUserProfileContainerDiv } from "./style/style";

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
