import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code'); // 구글에서 받은 인증 코드
    const state = urlParams.get('state'); // 상태 값 (CSRF 방지용)
    console.log(code);
    console.log(state);

    if (code && state) {
      fetch('http://ridebuddy.life/users/login/google/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, state }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('OAuth', data.OAuth); // 구글 OAuth 정보 저장
            navigate('/Main');
          } else if (data.message === '회원가입 필요') {
            navigate('/SignUp', { state: { googleData: data.googleUser } });
          }
        })
        .catch((error) => {
          console.error('Error during Google login:', error);
          navigate('/Login');
        });
    }
  }, [navigate]);

  return <div>구글 로그인</div>;
};

export default GoogleCallback;