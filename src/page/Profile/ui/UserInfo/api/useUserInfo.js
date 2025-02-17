import { useState, useCallback } from 'react';

const useUserInfo = () => {
  const [user, setUser] = useState(null);    
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);    

  const fetchUserInfo = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      console.log("Retrieved token:", token);

      const response = await fetch('http://3.35.94.179/mypages', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        console.error("Error response:", response.status);
        if (response.status === 401) {
          setError("올바른 access token이 아님");
        } else if (response.status === 500) {
          setError("내부서버에러");
        } else {
          setError("알 수 없는 에러 발생");
        }
        return;
      }

      const data = await response.json();
      console.log("Fetched data:", data);
      
      setUser(data);
    } catch (err) {
      console.error("Network error:", err);
      setError("네트워크 에러");
    } finally {
      setLoading(false);
    }
  }, []);

  return { user, loading, error, fetchUserInfo };
};

export default useUserInfo;
