import { useState, useEffect } from 'react';

const useTimer = (initialTime, isActive) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isActive, timeLeft]);

  const resetTimer = () => {
    setTimeLeft(initialTime);
  };

  return { timeLeft, resetTimer };
};

export default useTimer;