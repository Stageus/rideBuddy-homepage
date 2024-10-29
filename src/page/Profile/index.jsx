import Aside from "../../widgets/Aside";
import Header from "../../widgets/Header";
import { PageWrapper } from "./style/style";
import LikeList from "./ui/LikeList";
import UserInfo from "./ui/UserInfo";

const Profile = () => {
  return (
    <>
    <Header/>
    <Aside/>
    <PageWrapper>
      <UserInfo/>
      <LikeList/>
    </PageWrapper>
    </>
    
  );
};

export default Profile;
