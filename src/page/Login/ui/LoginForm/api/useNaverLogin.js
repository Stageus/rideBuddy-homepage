import { useState } from "react";

const useNaverLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginWithNaver = async () => {
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await fetch("http://www.ridebuddy.life/users/login/naver/", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const result = await response.text();
      console.log("네이버 로그인 응답:", result);
  
      if (!response.ok) {
        throw new Error("네이버 로그인 요청 실패");
      }
  
      if (!result.startsWith("http")) {
        throw new Error("응답이 올바른 URL이 아닙니다.");
      }
  
      return result; // 네이버 로그인 URL 반환
    } catch (err) {
      console.error("네이버 로그인 오류:", err.message);
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { loginWithNaver, isLoading, error };
};

export default useNaverLogin;
