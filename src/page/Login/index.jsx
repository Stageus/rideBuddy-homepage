import { useEffect } from 'react';
import { PageWrapper } from './style/style';
import LoginBanner from './ui/LoginBanner';
import LoginForm from './ui/LoginForm/index';

const Login = () => {
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("OAuth");
  }, []);
  return (
    <PageWrapper>
      <LoginBanner></LoginBanner>
      <LoginForm></LoginForm>
    </PageWrapper>
  );
};

export default Login;