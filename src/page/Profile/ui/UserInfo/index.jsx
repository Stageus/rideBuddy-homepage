import { StyledUserInfoSection } from './style/style';
import UserProfile from './ui/UserProfile';
import UserProfileDetails from './ui/UserProfileDetails';

const UserInfo = () => {
  return (
    <StyledUserInfoSection>
      <UserProfile />
      <UserProfileDetails />
    </StyledUserInfoSection>
  );
};

export default UserInfo;
