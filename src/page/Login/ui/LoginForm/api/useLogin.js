import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { idRegex, pwRegex } from '../../../assets/regex';

const useLogin = () => {
    const [result, setResult] = useState(null);
    const [status, setStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // 에러 처리 함수를 분리
    const handleErrorResponse = (status) => {
        switch (status) {
            case 400:
                setErrorMessage('요청 형식이 잘못되었습니다. 입력을 확인해주세요.');
                break;
            case 404:
                setErrorMessage('아이디 또는 비밀번호가 잘못되었습니다.');
                break;
            case 500:
                setErrorMessage('서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
                break;
            default:
                setErrorMessage('로그인 실패. 다시 시도해주세요.');
        }
    };

    const loginClickEvent = async (idValue, pwValue) => {
        if (!idRegex.test(idValue)) {
            return;
        }

        if (!pwRegex.test(pwValue)) {
            return;
        }

        setErrorMessage(''); // 오류 메시지 초기화

        try {
            const response = await fetch('', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: idValue,
                    pw: pwValue,
                }),
            });

            setStatus(response.status); // 응답 상태 저장

            if (response.status === 200) {
                const result = await response.json();
                setResult(result);

                if (result.accessToken) {
                    localStorage.setItem('access_token', result.accessToken);
                    navigate('/Main'); // 로그인 성공 후 홈으로 이동
                }
            } else {
                handleErrorResponse(response.status);
            }
        } catch (error) {
            console.error('알수없는 오류 발생:', error);
            setErrorMessage('알수없는 오류가 발생했습니다. 다시 시도해주세요.');
            setStatus('error');
            setResult(null);
        }
    };

    return [result, status, errorMessage, loginClickEvent];
};

export default useLogin;
