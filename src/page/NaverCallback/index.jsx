import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NaverCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code'); // 네이버에서 받은 인증 코드
    const state = urlParams.get('state'); // 상태 값
    console.log(code)
    console.log(state)

    if (code && state) {
      // 백엔드에 인증 코드 전달
      fetch('http://ridebuddy.life/users/login/naver/callback', {
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
            navigate('/Main');
          } else if (data.message === 'User not registered') {
            navigate('/SignUp', { state: { naverData: data.naverUser } });
          }
        })
        .catch((error) => {
          console.error('Error during Naver login:', error);
          navigate('/Login');
        });
    }
  }, [navigate]);

  return <div>네이버 로그인 처리 중...</div>;
};

export default NaverCallback;