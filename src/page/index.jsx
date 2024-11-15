import { Route, Routes } from 'react-router-dom';
import Main from './Main';
import Profile from './Profile';
import Login from './Login';
import History from './History';
import Find_Id from './FindId';
import Find_Pw from './FindPw';
import SignUp from './SignUp';

const Page = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/History" element={<History />} />
        <Route path="/FindId" element={<Find_Id />} />
        <Route path="/FindPw" element={<Find_Pw />} />
      </Routes>
    </>
  );
};

export default Page;
