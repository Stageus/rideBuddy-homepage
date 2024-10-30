import { Link } from "react-router-dom";
import { StyledAvatarContainerDiv, StyledAvatarImg, StyledEditButtonButton, StyledProfileEmailP, StyledProfileInfoDiv, StyledProfileNameP, StyledProfilePhoneP, StyledUserProfileContainerDiv } from "./style/style";

const UserProfile = () => {
  return (
    <StyledUserProfileContainerDiv>
      <StyledAvatarContainerDiv>
        <StyledAvatarImg />
        <Link to="/history">
          <StyledEditButtonButton>✏️</StyledEditButtonButton>
        </Link>
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
