import React, { useState } from 'react';
import { StyledButton, StyledErrorMessage, StyledInputPrimary10, StyledLink } from '../../../../style/styles';
import {
  StyledEmailDiv,
  StyledSignUpForm,
  StyledHiddenEmailDiv,
  StyledSignUpSection,
  StyledIdConfirmDiv,
  StyledEmailConfirmDiv,
} from './style/style';
import useTimer from '../../../../shared/model/useTimer';
import formatTime from '../../../../shared/util/formatTime';
import useSignUp from './api/useSignup/useSignUp';

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [inputVerificationCode, setInputVerificationCode] = useState('');
  const [isEmailVisible, setIsEmailVisible] = useState(false);

  const { timeLeft, resetTimer } = useTimer(180, isEmailVisible);
  const {
    status,
    setStatus,
    errorMessage,
    setErrorMessage,
    succesMessage,
    signupClickEvent,
    handleVerifyClick,
    checkIdDuplication,
    confirmVerificationCode,
    isIdConfirmed,
    isVerificationSent,
    isEmailVerified,
  } = useSignUp();

  const handleEmailVerificationClick = () => {
    const isSuccess = handleVerifyClick(email);
    if (isSuccess) {
      setIsEmailVisible(true);
      resetTimer();
    }
  };

  const handleSignupClick = () => {
    signupClickEvent({ name, userId, password, confirmPassword, email, inputVerificationCode });
  };

  const isAllFieldsRequiredError = status === 400 && errorMessage === '모든 필드를 입력해주세요.';

  return (
    <StyledSignUpSection>
      <h1>회원가입</h1>
      {errorMessage ? (
        <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
      ) : succesMessage ? (
        <p>{succesMessage}</p>
      ) : (
        <p>빠르고 쉽게 가입하세요.</p>
      )}

      <StyledSignUpForm>
        {/* 이름 입력 필드 */}
        <div>
          <label htmlFor="name">
            이름 <span>(최대 5글자 한글 입력)</span>
          </label>
          <StyledInputPrimary10
            type="text"
            id="name"
            maxLength="5"
            placeholder="이름 입력"
            value={name}
            onChange={e => {
              setName(e.target.value);
              setErrorMessage('');
            }}
            required
            status={isAllFieldsRequiredError || (status === 400 && errorMessage === '이름 형식을 확인해주세요.' && status)}
          />
        </div>

        {/* 아이디 입력 필드 */}
        <div>
          <label htmlFor="userId">
            아이디 <span>(최대 20글자 대소문자만 허용)</span>
          </label>
          <StyledIdConfirmDiv>
            <StyledInputPrimary10
              type="text"
              id="userId"
              maxLength="20"
              placeholder="아이디 입력"
              value={userId}
              onChange={e => {
                setUserId(e.target.value);
                setErrorMessage('');
              }}
              required
              status={
                isAllFieldsRequiredError ||
                (status === 400 &&
                  (errorMessage === '아이디 중복 확인을 완료해주세요.' ||
                    errorMessage === '아이디 형식을 확인해주세요.' ||
                    errorMessage === '이미 사용 중인 아이디입니다.') &&
                  status)
              }
            />

            <StyledButton type="button" onClick={() => checkIdDuplication(userId)}>
              중복 체크
            </StyledButton>
          </StyledIdConfirmDiv>
        </div>

        {/* 비밀번호 입력 필드 */}
        <div>
          <label htmlFor="password">
            비밀번호 <span>(최대 20글자 영대소문자, 숫자, 특수문자 포함)</span>
          </label>
          <StyledInputPrimary10
            type="password"
            id="password"
            maxLength="20"
            placeholder="비밀번호 입력"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              setErrorMessage('');
            }}
            required
            status={
              isAllFieldsRequiredError ||
              (status === 400 &&
                (errorMessage === '비밀번호 형식을 확인해주세요.' || errorMessage === '비밀번호가 일치하지 않습니다.') &&
                status)
            }
          />
        </div>

        {/* 비밀번호 확인 필드 */}
        <div>
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <StyledInputPrimary10
            type="password"
            id="confirmPassword"
            placeholder="비밀번호 확인 입력"
            value={confirmPassword}
            onChange={e => {
              setConfirmPassword(e.target.value);
              setErrorMessage('');
            }}
            required
            status={isAllFieldsRequiredError || (status === 400 && errorMessage === '비밀번호가 일치하지 않습니다.' && status)}
          />
        </div>

        {/* 이메일 입력 및 인증 버튼 */}
        <div>
          <label htmlFor="email">이메일</label>
          <StyledEmailDiv>
            <StyledInputPrimary10
              type="email"
              id="email"
              placeholder="이메일 입력"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                setErrorMessage('');
              }}
              required
              status={isAllFieldsRequiredError || (status === 400 && errorMessage === '이메일 형식을 확인해주세요.' && status)}
              disabled={isEmailVerified}
            />
            <StyledButton type="button" onClick={handleEmailVerificationClick} disabled={isEmailVerified}>
              {isVerificationSent ? '재전송' : '인증'}
            </StyledButton>
          </StyledEmailDiv>
        </div>

        {/* 이메일 인증 코드 입력 필드 */}
        {isEmailVisible && (
          <StyledHiddenEmailDiv isvisible={isEmailVisible}>
            <label htmlFor="hiddenEmail">이메일 인증 코드</label>
            <StyledEmailConfirmDiv>
              <StyledInputPrimary10
                type="text"
                id="hiddenEmail"
                placeholder="인증코드 입력"
                value={inputVerificationCode}
                onChange={e => {
                  setInputVerificationCode(e.target.value);
                  setErrorMessage('');
                }}
                required
                disabled={isEmailVerified}
                status={
                  isAllFieldsRequiredError ||
                  (status === 400 &&
                    (errorMessage === '인증 코드를 입력해주세요.' ||
                      errorMessage === '인증 코드는 6자리 숫자여야 합니다.' ||
                      errorMessage === '인증 코드가 일치하지 않습니다.') &&
                    status)
                }
              />
              <StyledButton type="button" onClick={() => confirmVerificationCode(inputVerificationCode)} disabled={isEmailVerified}>
                인증 확인
              </StyledButton>
              {!isEmailVerified && <span>{formatTime(timeLeft)}</span>}
            </StyledEmailConfirmDiv>
          </StyledHiddenEmailDiv>
        )}

        {/* 회원가입 버튼 */}
        <StyledLink to="/Login">로그인페이지 이동</StyledLink>
        <StyledButton width="100%" type="button" onClick={handleSignupClick}>
          회원가입
        </StyledButton>
      </StyledSignUpForm>
    </StyledSignUpSection>
  );
};

export default SignUpForm;
