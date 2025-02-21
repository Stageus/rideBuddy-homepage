import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedResultState } from '../../../../../../shared/recoil/atoms/atomState';
import MarkerDetail from './ui';

const MarkerDetailContainer = () => {
  const selectedResult = useRecoilValue(selectedResultState);
  const setSelectedResult = useSetRecoilState(selectedResultState);

  if (!selectedResult) return null;

  // 닫기 버튼 클릭 시 상세 정보를 제거합니다.
  const handleClose = () => {
    setSelectedResult(null);
  };

  // 좋아요 버튼 클릭 시 처리할 기능을 구현하세요.
  const handleLike = () => {
    console.log('좋아요 클릭됨');
    // 예: 좋아요 수 증가 API 호출 또는 상태 업데이트 등
  };

  return (
    <MarkerDetail
      name={selectedResult.road_name || selectedResult.name}
      address={selectedResult.road_address || selectedResult.address}
      distance={selectedResult.cal || selectedResult.distance}
      latitude={parseFloat(selectedResult.latitude)}
      longitude={parseFloat(selectedResult.longitude)}
      onClose={handleClose}
      onLike={handleLike}
    />
  );
};

export default MarkerDetailContainer;
