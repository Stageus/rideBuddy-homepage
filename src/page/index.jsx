import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./Main";
import Profile from "./Profile";
import Login from "./Login";
import History from "./History";
import Find_Id from "./FindId";
import Find_Pw from "./FindPw";
import SignUp from "./SignUp";
import NaverCallback from "./NaverCallback";

const getToken = () => {
  return localStorage.getItem("token");
};

const ProtectedRoute = ({ element }) => {
  const token = getToken();
  return token ? element : <Navigate to="/Login" />;
};

const Page = () => {
  return (
    <Routes>
      {/* 토큰이 필요 없는 경로 */}
      <Route path="/" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/FindId" element={<Find_Id />} />
      <Route path="/FindPw" element={<Find_Pw />} />
      <Route path="/callback" element={<NaverCallback />} />

      {/* 토큰이 필요한 경로 */}
      <Route path="/Main" element={<ProtectedRoute element={<Main />} />} />
      <Route path="/Profile" element={<ProtectedRoute element={<Profile />} />} />
      <Route path="/History" element={<ProtectedRoute element={<History />} />} />
    </Routes>
  );
};

export default Page;
