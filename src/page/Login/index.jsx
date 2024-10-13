import { PageWrapper } from './style/style';
import LoginBanner from './ui/LoginBanner';
import LoginForm from './ui/LoginForm/index';

const Login = () => {
  return (
    <PageWrapper>
      <LoginBanner></LoginBanner>
      <LoginForm></LoginForm>
    </PageWrapper>
  );
};

export default Login;
