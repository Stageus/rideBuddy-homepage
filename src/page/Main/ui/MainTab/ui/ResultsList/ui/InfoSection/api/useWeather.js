import { useState, useEffect, useCallback } from 'react';

const useWeather = (longitude, latitude) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async () => {
    setLoading(true);
    setError(null);
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("올바른 access token이 아님");
      }
  
      const response = await fetch('http://3.35.94.179/weather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ longitude, latitude }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '에러 발생');
      }
  
      const result = await response.json();
      console.log('API Result:', result);
      setWeather(result); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [longitude, latitude]);

  useEffect(() => {
    if (longitude !== null && latitude !== null) {
      fetchWeather();
    }
  }, [longitude, latitude, fetchWeather]);

  return { weather, loading, error, refetch: fetchWeather };
};

export default useWeather;
