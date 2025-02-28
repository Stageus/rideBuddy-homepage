import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedResultState, markerSourceState } from '../../../../../../shared/recoil/atoms/atomState';
import MarkerDetail from './ui';
import useLikeRoad from './api/useLikeRoad';
import useLikeCenters from './api/useLikeCenters';

const MarkerDetailContainer = () => {
  const selectedResult = useRecoilValue(selectedResultState);
  const markerSource = useRecoilValue(markerSourceState);
  const setSelectedResult = useSetRecoilState(selectedResultState);

  // 두 API 훅 호출
  const roadLike = useLikeRoad();
  const centerLike = useLikeCenters();

  if (!selectedResult) return null;

  const handleClose = () => {
    setSelectedResult(null);
  };

  // markerSource가 search가 아닌 경우, 실제 데이터 구조에 맞게 idx 할당
  // 예: centers일 경우 search 결과에서는 idx가 아니라 id 대신 idx가 있을 수 있음.
  let idx;
  if (markerSource === 'search') {
    idx = selectedResult.idx; // search 결과에서는 idx를 사용한다고 가정
  } else if (markerSource === 'centers') {
    idx = selectedResult.id; // 센터의 경우 id를 사용
  } else if (markerSource === 'roads') {
    idx = selectedResult.idx;
  } else {
    idx = selectedResult.idx;
  }

  // markerSource가 "search"인 경우에는 selectedResult.result 값을 사용하고,
  // 그 외에는 markerSource의 값("centers" 또는 "roads")을 단수형으로 변환하여 사용
  const getApiType = () => {
    if (markerSource !== "search" && markerSource !== "centers" && markerSource !== "roads") {
      return selectedResult.result; // "road" 또는 "center"
    }
    if (markerSource === "search") {
      return selectedResult.result; // "road" 또는 "center"
    }
    // markerSource가 plural 형태라면 단수형으로 변환
    if (markerSource === "centers") return "center";
    if (markerSource === "roads") return "road";
    return markerSource;
  };

  const apiType = getApiType();

  const handleLike = async () => {
    if (apiType === "center") {
      if (!centerLike.loading) {
        try {
          const response = await centerLike.likeCenter(idx);
          const newLikeCount = response["center likeCount"];
          centerLike.setLikeCount(newLikeCount);
        } catch (error) {
          console.error("센터 좋아요 API 에러:", error);
        }
      }
    } else if (apiType === "road") {
      if (!roadLike.loading) {
        try {
          const response = await roadLike.likeRoad(idx);
          const newLikeCount = response["road likeCount"];
          roadLike.setLikeCount(newLikeCount);
        } catch (error) {
          console.error("도로 좋아요 API 에러:", error);
        }
      }
    }
  };

  const displayedLikeCount =
    apiType === "center" ? centerLike.likeCount : roadLike.likeCount;
  const error = apiType === "center" ? centerLike.error : roadLike.error;

  return (
    <MarkerDetail
      name={selectedResult.road_name || selectedResult.name}
      address={selectedResult.road_address || selectedResult.address}
      distance={selectedResult.cal || selectedResult.distance}
      latitude={parseFloat(selectedResult.latitude)}
      longitude={parseFloat(selectedResult.longitude)}
      idx={idx}
      like={selectedResult.like}
      onClose={handleClose}
      onLike={handleLike}
      likeCount={displayedLikeCount}
      error={error}
    />
  );
};

export default MarkerDetailContainer;