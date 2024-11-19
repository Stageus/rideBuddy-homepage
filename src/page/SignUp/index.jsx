// SignUp.js
import React from 'react';
import { StyledButton, StyledLink } from '../../style/styles';
import { StyledSignUpForm, StyledSignUpSection, PageWrapper } from './style/style';
import useSignUp from './api/useSignUp';
import NameInput from '../../widgets/Inputs/NameInput';
import UserIdInput from '../../widgets/Inputs/UserIdInput'; 
import PasswordInput from '../../widgets/Inputs/PasswordInput'; 
import EmailVerificationInput from '../../widgets/Inputs/EmailVerificationInput';
import Messages from '../../widgets/Inputs/Messages';
import useFormState from '../../shared/model/useFormState';
import EmailInput from '../../widgets/Inputs/EmailInput';

const SignUp = () => {
  const [formState, setField] = useFormState({
    name: '',
    userId: '',
    password: '',
    confirmPassword: '',
    email: '',
    inputVerificationCode: '',
  });

  const {
    status,
    setStatus,
    errorMessage,
    setErrorMessage,
    successMessage,
    signupClickEvent,
    handleEmailVerificationClick,
    checkIdDuplication,
    confirmVerificationCode,
    isIdConfirmed,
    isVerificationSent,
    isEmailVerified,
    isEmailVisible,
    timeLeft,
    resetTimer,
    isAllFieldsRequiredError,
  } = useSignUp();

  return (
    <PageWrapper>
      <StyledSignUpSection>
        <h1>회원가입</h1>
        <Messages errorMessage={errorMessage} successMessage={successMessage} />

        <StyledSignUpForm>
          <NameInput
            name={formState.name}
            setName={value => setField('name', value)}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            status={status}
            isAllFieldsRequiredError={isAllFieldsRequiredError}
          />

          <UserIdInput
            userId={formState.userId}
            setUserId={value => setField('userId', value)}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            status={status}
            isAllFieldsRequiredError={isAllFieldsRequiredError}
            checkIdDuplication={checkIdDuplication}
          />

          <PasswordInput
            password={formState.password}
            setPassword={value => setField('password', value)}
            confirmPassword={formState.confirmPassword}
            setConfirmPassword={value => setField('confirmPassword', value)}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            status={status}
            isAllFieldsRequiredError={isAllFieldsRequiredError}
          />

          <EmailInput
            email={formState.email}
            setEmail={value => setField('email', value)}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            status={status}
            isAllFieldsRequiredError={isAllFieldsRequiredError}
            handleEmailVerificationClick={() => handleEmailVerificationClick(formState.email)}
            isEmailVerified={isEmailVerified}
            isVerificationSent={isVerificationSent}
          />

          {isEmailVisible && (
            <EmailVerificationInput
              inputVerificationCode={formState.inputVerificationCode}
              setInputVerificationCode={value => setField('inputVerificationCode', value)}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              status={status}
              isAllFieldsRequiredError={isAllFieldsRequiredError}
              confirmVerificationCode={confirmVerificationCode}
              isEmailVerified={isEmailVerified}
              timeLeft={timeLeft}
            />
          )}

          <StyledLink to="/Login">로그인페이지 이동</StyledLink>
          <StyledButton width="100%" type="button" onClick={() => signupClickEvent({ ...formState })}>
            회원가입
          </StyledButton>
        </StyledSignUpForm>
      </StyledSignUpSection>
    </PageWrapper>
  );
};

export default SignUp;
