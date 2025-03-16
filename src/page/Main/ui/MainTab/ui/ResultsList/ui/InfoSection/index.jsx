import React from 'react';
import { StyledFaceImg, StyledInfoDiv, StyledLocInfoDiv, StyledRideStatusP, StyledSmileyDiv } from './style/style';
import GraphChart from './ui/GraphChart';
import { ImHappy2 } from 'react-icons/im';
import useAddress from '../../../../../../../../shared/api/useAddress';
import useUserLocation from '../../../../../../../../shared/api/useUserLocation';
import useWeather from './api/useWeather';

const InfoSection = () => {
  const { lat, lng } = useUserLocation();
  const address = useAddress(lat, lng);
  const { weather, loading, error, refetch } = useWeather(lng, lat);

  if (loading) return <StyledInfoDiv>Loading...</StyledInfoDiv>;
  if (error) return <StyledInfoDiv>Error: {error}</StyledInfoDiv>;

  const weatherCondition = weatherCode => {
    switch (weatherCode) {
      case 0:
        return '맑음';
      case 1:
        return '비';
      case 2:
        return '눈';
      default:
        return '알 수 없음';
    }
  };

  const getRideStatus = () => {
    if (!weather) return '알 수 없음';
    const isRainy = weather['0_rain'] !== '0';
    const isBadPm10 = weather.pm10Grade1h !== '1';
    const isBadPm25 = weather.pm25Grade1h !== '1';
    return !isRainy && !isBadPm10 && !isBadPm25 ? '좋음' : '나쁨';
  };

  return (
    <StyledInfoDiv>
      <StyledLocInfoDiv>
        <h2>{address || '위치를 찾을 수 없습니다.'}</h2>
        <p>
          현재 날씨: {weather ? weatherCondition(weather['0_weather']) : '알 수 없음'}, 기온은{' '}
          {weather ? weather['0_temperature'] : '알 수 없음'}°
        </p>
        <p>
          미세먼지 최고 {weather ? (weather.pm10Grade1h === '1' ? '좋음' : '나쁨') : '알 수 없음'}
          {weather ? weather.pm10Value : '알 수 없음'} µg/m³
        </p>
        <p>
          초미세먼지 {weather ? (weather.pm25Grade1h === '1' ? '좋음' : '나쁨') : '알 수 없음'}
          {weather ? weather.pm25Value : '알 수 없음'} µg/m³
        </p>
      </StyledLocInfoDiv>
      <StyledSmileyDiv>
        <StyledFaceImg src="img/happy.png"></StyledFaceImg>
        {/* <ImHappy2 color="#5C7FDA" /> */}
      </StyledSmileyDiv>
      <StyledRideStatusP>오늘은 라이딩하기 "{getRideStatus()}" 입니다</StyledRideStatusP>
      <GraphChart weather={weather} /> {/* weather 데이터를 props로 전달 */}
    </StyledInfoDiv>
  );
};

export default InfoSection;
