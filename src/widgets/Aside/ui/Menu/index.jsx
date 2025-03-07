// components/Menu.js
import React, { useEffect } from 'react';
import { StyledIcon } from '../../style/style';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { centersState, markerSourceState, roadsState, selectedItemState, selectedResultState } from '../../../../shared/recoil/atoms/atomState';
import useUserLocation from '../../../../shared/api/useUserLocation';
import useCenters from '../../../../shared/api/useCenters';
import useRoads from '../../../../shared/api/useRoads';
import { StyledIconDiv } from './style/style';

const Menu = () => {
  // 사용자 위치 훅
  const userLocation = useUserLocation();
  // centers, roads API 호출 훅
  const { results: centersResults, fetchCenters } = useCenters();
  const { results: roadsResults, fetchRoads } = useRoads();

  // 전역 상태 업데이트 함수
  const setCenters = useSetRecoilState(centersState);
  const setRoads = useSetRecoilState(roadsState);
  const setMarkerSource = useSetRecoilState(markerSourceState);
  const setSelectedResultState = useSetRecoilState(selectedResultState);
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState);
  

  // 현재 활성화된 markerSource 값 읽기
  const currentMarkerSource = useRecoilValue(markerSourceState);

  // centersResults 업데이트 시 centersState 전역 상태에 저장
  useEffect(() => {
    if (centersResults.length > 0) {
      setCenters(centersResults);
    }
  }, [centersResults, setCenters]);

  // roadsResults 업데이트 시 roadsState 전역 상태에 저장
  useEffect(() => {
    if (roadsResults.length > 0) {
      setRoads(roadsResults);
    }
  }, [roadsResults, setRoads]);

  // centers 아이콘 클릭 핸들러
  const handleCentersClick = () => {
    const { lat, lng } = userLocation;
    setSelectedResultState(null)
    setSelectedItem(null)
    if (lat && lng) {
      // 이미 centers 데이터가 활성화되어 있다면 => 토글하여 데이터 클리어
      if (currentMarkerSource === 'centers') {
        setMarkerSource(null); // markerSource 해제
        setCenters([]);         // centers 데이터 비우기
      } else {
        setMarkerSource('centers');
        if (centersResults.length === 0) {
          fetchCenters({ longitude: lng, latitude: lat });
        }
      }
    } else {
      console.error('사용자 위치 정보를 아직 받아오지 못했습니다.');
    }
  };

  // roads 아이콘 클릭 핸들러
  const handleRoadsClick = () => {
    const { lat, lng } = userLocation;
    setSelectedResultState(null);
    setSelectedItem(null)
    if (lat && lng) {
      if (currentMarkerSource === 'roads') {
        setMarkerSource(null); // markerSource 해제
        setRoads([]);          // roads 데이터 비우기
      } else {
        setMarkerSource('roads');
        if (roadsResults.length === 0) {
          fetchRoads({ longitude: lng, latitude: lat });
        }
      }
    } else {
      console.error('사용자 위치 정보를 아직 받아오지 못했습니다.');
    }
  };

  return (
    <>
      {/* 네비게이션 아이콘 클릭 시 roads API 호출 */}
      <StyledIconDiv>
        <StyledIcon
          src="img/icon_road.png"
          alt="Navigation Icon"
          onClick={handleRoadsClick}
          style={{ cursor: 'pointer' }}
        />
        자전거길
      </StyledIconDiv>
     
      {/* 맵 핀 아이콘 클릭 시 centers API 호출 */}
      <StyledIconDiv>
        <StyledIcon
          src="img/icon_centers.png"
          alt="Map Icon"
          onClick={handleCentersClick}
          style={{ cursor: 'pointer' }}
        />
        인증센터
      </StyledIconDiv>
    </>
  );
};

export default Menu;
