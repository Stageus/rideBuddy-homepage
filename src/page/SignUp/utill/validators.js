// validators.js
import { idRegex, mailRegex, nameRegex, pwRegex, codeRegex } from '../../../assets/regex';

export const validateName = name => {
  if (!name || !nameRegex.test(name)) {
    return '이름 형식을 확인해주세요.';
  }
  return null;
};

export const validateUserId = userId => {
  if (!userId || !idRegex.test(userId)) {
    return '아이디 형식을 확인해주세요.';
  }
  return null;
};

export const validatePassword = password => {
  if (!password || !pwRegex.test(password)) {
    return '비밀번호 형식을 확인해주세요.';
  }
  return null;
};

export const validateEmail = email => {
  if (!email || !mailRegex.test(email)) {
    return '이메일 형식을 확인해주세요.';
  }
  return null;
};

export const validateVerificationCode = code => {
  if (!code || !codeRegex.test(code)) {
    return '인증 코드는 6자리 숫자여야 합니다.';
  }
  return null;
};
