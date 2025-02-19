export const idRegex = /^[a-zA-Z]{1,20}$/; // 아이디: 영문 대소문자만 허용, 최대 20글자
export const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\*\&\^\@\!])[A-Za-z\d\*\&\^\@\!]{8,20}$/; // 비밀번호: 영문 대문자, 소문자, 숫자, 특수문자(*&^@!) 각 1자 이상 포함, 8~20자
export const nameRegex = /^[가-힣]{1,5}$/; // 이름: 한글만 허용, 1~5글자
export const mailRegex = /^[\w\-\.]+@[a-zA-Z\d\-]+\.[a-zA-Z]{2,4}$/; // 이메일: 최대 30글자, '@' 포함, 연속된 문자 형식
export const codeRegex = /^\d{6}$/; // 인증 코드: 숫자 6자리 고정
export const imgIdxRegex = /^\d+$/; // 인증 코드: 숫자 6자리 고정
