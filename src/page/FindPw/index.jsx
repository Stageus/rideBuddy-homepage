import React from 'react';
import { StyledButton, StyledLink } from '../../style/styles';
import useFind_Pw from './api/useFindPw';
import useFormState from '../../shared/model/useFormState';
import EmailInput from '../../widgets/Inputs/EmailInput';
import EmailVerificationInput from '../../widgets/Inputs/EmailVerificationInput';
import Messages from '../../widgets/Inputs/Messages';
import { PageWrapper, StyledFindPwForm, StyledFindPwFormSection } from './style/style';
import IdInput from '../../widgets/Inputs/IdInput';

const Find_Pw = () => {
  const [formState, setField] = useFormState({
    userId: '',
    email: '',
    inputVerificationCode: '',
  });

  const {
    status,
    errorMessage,
    successMessage,
    findPwClickEvent,
    handleEmailVerificationClick,
    confirmVerificationCode,
    isVerificationSent,
    isEmailVerified,
    isEmailVisible,
    timeLeft,
    isAllFieldsRequiredError,
    setErrorMessage
  } = useFind_Pw();

  return (
    <PageWrapper>
      <StyledFindPwFormSection>
        <h1>비밀번호 찾기</h1>
        <Messages errorMessage={errorMessage} successMessage={successMessage} />
        <StyledFindPwForm>
        <IdInput
            userId={formState.userId}
            setUserId={value => setField('userId', value)}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            status={status}
            isAllFieldsRequiredError={isAllFieldsRequiredError}
          />
          <EmailInput
            email={formState.email}
            setEmail={value => setField('email', value)}
            errorMessage={errorMessage}
            status={status}
            handleEmailVerificationClick={() => handleEmailVerificationClick(formState.email)}
            isVerificationSent={isVerificationSent}
            isAllFieldsRequiredError={isAllFieldsRequiredError}
          />
          {isEmailVisible && (
            <EmailVerificationInput
              inputVerificationCode={formState.inputVerificationCode}
              setInputVerificationCode={value => setField('inputVerificationCode', value)}
              errorMessage={errorMessage}
              status={status}
              confirmVerificationCode={confirmVerificationCode}
              isEmailVerified={isEmailVerified}
              timeLeft={timeLeft}
              isAllFieldsRequiredError={isAllFieldsRequiredError}
            />
          )}
          <StyledLink to="/Login">로그인페이지 이동</StyledLink>
          <StyledButton
            width="100%"
            type="button"
            onClick={() => findPwClickEvent({ ...formState })}
          >
            비밀번호 찾기
          </StyledButton>
        </StyledFindPwForm>
      </StyledFindPwFormSection>
    </PageWrapper>
  );
};

export default Find_Pw;
