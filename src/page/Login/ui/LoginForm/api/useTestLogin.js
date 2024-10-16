import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { idRegex, pwRegex } from '../../../../../assets/regex';

const useTestLogin = () => {
    const [status, setStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // 에러 처리 함수
    const handleErrorResponse = (status) => {
        switch (status) {
            case 400:
                setErrorMessage('요청 형식이 잘못되었습니다.');
                break;
            case 404:
                setErrorMessage('아이디 또는 비밀번호가 잘못되었습니다.');
                break;
            case 500:
                setErrorMessage('서버 내부 오류가 발생했습니다.');
                break;
            default:
                setErrorMessage('로그인 실패. 다시 시도해주세요.');
        }
    };

    // 로그인 처리 함수
    const loginClickEvent = (userId, password) => {

        if (!idRegex.test(userId)) {
            setStatus(400);
            handleErrorResponse(400);
            return;
        }

        if (!pwRegex.test(password)) {
            setStatus(400);
            handleErrorResponse(400);
            return;
        }

        
        if (userId === 'TestUser' && password === 'Test1234!') {
            setStatus(200);
            setErrorMessage('');
            navigate('/Main'); 
        } else if (userId === 'Server' && password === 'Server1234!') {
            setStatus(500);
            handleErrorResponse(500);
        } 
        else {
            setStatus(404);
            handleErrorResponse(404);
        }
    };

    return [status, errorMessage, loginClickEvent];
};

export default useTestLogin;
