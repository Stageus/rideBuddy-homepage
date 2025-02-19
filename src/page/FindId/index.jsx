import React from 'react';
import { StyledButton, StyledLink } from '../../style/styles';
import { StyledFindIdForm, StyledFindIdFormSection, PageWrapper } from './style/style';
import useFind_Id from './model/useFindId';
import useFormState from '../../shared/model/useFormState';
import NameInput from '../../widgets/Inputs/NameInput';
import EmailInput from '../../widgets/Inputs/EmailInput';
import EmailVerificationInput from '../../widgets/Inputs/EmailVerificationInput';
import Messages from '../../widgets/Inputs/Messages';

const Find_Id = () => {
  const [formState, setField] = useFormState({
    name: '',
    email: '',
    inputVerificationCode: '',
  });

  const {
    status,
    errorMessage,
    successMessage,
    findIdClickEvent,
    handleEmailVerificationClick,
    confirmVerificationCode,
    isVerificationSent,
    isEmailVerified,
    isEmailVisible,
    timeLeft,
    isAllFieldsRequiredError,
    setErrorMessage,
  } = useFind_Id();

  return (
    <PageWrapper>
      <StyledFindIdFormSection>
        <h1>아이디 찾기</h1>
        <Messages errorMessage={errorMessage} successMessage={successMessage} />
        <StyledFindIdForm>
          <NameInput
            name={formState.name}
            setName={value => setField('name', value)}
            errorMessage={errorMessage}
            status={status}
            isAllFieldsRequiredError={isAllFieldsRequiredError}
            setErrorMessage={setErrorMessage}
          />
          <EmailInput
            email={formState.email}
            setEmail={value => setField('email', value)}
            errorMessage={errorMessage}
            status={status}
            handleEmailVerificationClick={!isEmailVerified ? () => handleEmailVerificationClick(formState.email) : undefined}
            isVerificationSent={isVerificationSent}
            isAllFieldsRequiredError={isAllFieldsRequiredError}
            setErrorMessage={setErrorMessage}
            isEmailVerified={isEmailVerified}
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
              setErrorMessage={setErrorMessage}
            />
          )}
          <StyledLink to="/Login">로그인페이지 이동</StyledLink>
          <StyledButton width="100%" type="button" onClick={() => findIdClickEvent({ ...formState })}>
            아이디 찾기
          </StyledButton>
        </StyledFindIdForm>
      </StyledFindIdFormSection>
    </PageWrapper>
  );
};

export default Find_Id;
