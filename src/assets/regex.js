export const idRegex = /^[a-zA-Z]{1,20}$/;
export const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\*\&\^\@\!])[A-Za-z\d\*\&\^\@\!]{1,20}$/; // 비밀번호: 영대소문자, 숫자, 특수문자 포함, 최대 20자
export const nameRegex = /^[가-힣]{1,5}$/; // 이름: 1~5자의 한글만 허용
export const mailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // 이메일: 최대 30자, @ 포함 형식
export const codeRegex = /^\d{6}$/; // 인증 코드: 6자리 숫자 고정
