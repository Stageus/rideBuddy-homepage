import React from 'react';
import { StyledFaceImg, StyledInfoDiv, StyledLocInfoDiv, StyledRideStatusP, StyledSmileyDiv } from './style/style';
import GraphChart from './ui/GraphChart';
import useAddress from '../../../../../../../../shared/api/useAddress';
import useUserLocation from '../../../../../../../../shared/api/useUserLocation';
import useWeather from './api/useWeather';
import ErrorMessage from '../ErrorMessage';

const InfoSection = () => {
  const { lat, lng } = useUserLocation();
  const address = useAddress(lat, lng);
  const { weather, loading, error, refetch } = useWeather(lng, lat);

  if (loading) return <StyledInfoDiv><ErrorMessage></ErrorMessage></StyledInfoDiv>;
  if (error) return <StyledInfoDiv><ErrorMessage></ErrorMessage></StyledInfoDiv>;

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

  const rideStatus = getRideStatus();

  return (
    <StyledInfoDiv>
      <StyledLocInfoDiv>
        <h2>{address || 'Loading...'}</h2>
        <p>
          현재 날씨: {weather ? weatherCondition(weather['0_weather']) : '알 수 없음'}, 기온은{' '}
          {weather ? weather['0_temperature'] : '알 수 없음'}°
        </p>
        <p>
          미세먼지 최고 {weather ? (weather.pm10Grade1h === '1' ? '좋음' : '나쁨') : '알 수 없음'} (
          {weather ? weather.pm10Value : '알 수 없음'} µg/m³)
        </p>
        <p>
          초미세먼지 {weather ? (weather.pm25Grade1h === '1' ? '좋음' : '나쁨') : '알 수 없음'} (
          {weather ? weather.pm25Value : '알 수 없음'} µg/m³)
        </p>
      </StyledLocInfoDiv>
      <StyledSmileyDiv>
        {rideStatus === '좋음' ? (
          <StyledFaceImg src="img/happy.png" alt="좋음" />
        ) : (
          <StyledFaceImg src="img/sad.png" alt="나쁨" />
        )}
      </StyledSmileyDiv>
      <StyledRideStatusP status={rideStatus}>
        오늘은 라이딩하기 "{rideStatus}" 입니다
      </StyledRideStatusP>
      <GraphChart weather={weather} />
    </StyledInfoDiv>
  );
};

export default InfoSection;