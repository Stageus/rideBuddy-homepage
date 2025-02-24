// InfoSection.js
import React from 'react';
import { StyledInfoDiv, StyledLocInfoDiv, StyledRideStatusP, StyledSmileyDiv } from './style/style';
import GraphChart from './ui/GraphChart';
import { ImHappy2 } from 'react-icons/im';
import useAddress from '../../../../../../../../shared/api/useAddress';
import useUserLocation from '../../../../../../../../shared/api/useUserLocation';
import useWeather from './api/useWeather';

const InfoSection = () => {
  // 테스트용: 실제 위도/경도 값이 있다면 해당 값으로 대체하세요.
  const { lat, lng } = useUserLocation();
  const address = useAddress(lat, lng);
  const { weather, loading, error, refetch } = useWeather(lng, lat);

  // 콘솔에 주소 출력
  console.log('Address:', address);
  console.log('weather:', weather);

  return (
    <StyledInfoDiv>
      <StyledLocInfoDiv>
        <h2>{address || "인천광역시 서구 오류동 1579-8"}</h2>
        <p>현재 날씨: 맑음, 기온은 25°</p>
        <p>미세먼지 최고 좋음 10 µg/m³</p>
        <p>초미세먼지 좋음 6 µg/m³</p>
      </StyledLocInfoDiv>
      <StyledSmileyDiv>
        <ImHappy2 color="#5C7FDA" />
      </StyledSmileyDiv>
      <StyledRideStatusP>오늘은 라이딩하기 "좋음" 입니다</StyledRideStatusP>
      <GraphChart />
    </StyledInfoDiv>
  );
};

export default InfoSection;
