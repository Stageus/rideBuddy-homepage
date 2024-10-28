import { PageWrapper } from "./style/style";
import LikeList from "./ui/LikeList";
import UserInfo from "./ui/UserInfo";

const Profile = () => {
  return (
    <PageWrapper>
      <UserInfo/>
      <LikeList/>
    </PageWrapper>
  );
};

export default Profile;
