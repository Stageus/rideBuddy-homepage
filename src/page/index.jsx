import { Route, Routes } from 'react-router-dom';
import Main from './Main';
import SignUp from './Signup';
import Profile from './Profile';
import Login from './Login';
import History from './History';

const Page = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/History" element={<History />} />
      </Routes>
    </>
  );
};

export default Page;
