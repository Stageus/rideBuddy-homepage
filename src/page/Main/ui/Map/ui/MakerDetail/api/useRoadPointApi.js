import { useState } from 'react';
import { markerSourceState, selectedResultState } from '../../../../../../../shared/recoil/atoms/atomState';
import { useSetRecoilState } from 'recoil';

// Custom hook for fetching road point data
const useRoadPointApi = () => {
  const [RoadDetail, setRoadDetail] = useState(null); // Response data for 200
  const [error, setError] = useState(null); // Error message for 400, 401, 404, 500
  const [loading, setLoading] = useState(false); // Loading state
  const setSelectedResult = useSetRecoilState(selectedResultState);
  const setMarkerSourceState = useSetRecoilState(markerSourceState);

  // Function to validate roadPointIdx with regex
  const isValidRoadPointIdx = (idx) => /^\d+$/.test(idx);

  // API call function
  const fetchRoadPoint = async (roadPointIdx) => {
    // Get access token from localStorage
    const accessToken = localStorage.getItem('token');
    
    // Validate roadPointIdx before making the request
    if (!isValidRoadPointIdx(roadPointIdx)) {
      setError({ message: 'roadPointIdx에서 정규표현식 에러' });
      return;
    }

    // Check if accessToken exists
    if (!accessToken) {
      setError({ message: 'access token이 로컬스토리지에 없습니다.' });
      return;
    }

    setLoading(true);
    setError(null);
    setRoadDetail(null);

    try {
      const response = await fetch(`http://3.35.94.179/Info/roads/${roadPointIdx}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        const transformedResult = {
          idx: result.roads_point_idx,         
          name: result.roads_name,             
          latitude: result.roads_lat_lng[0],  
          longitude: result.roads_lat_lng[1], 
          like: result.road_likeCount,         
          addr: result.roads_address,         
          result: result                      
        };

        setRoadDetail(result);                
        setSelectedResult(transformedResult);
        setMarkerSourceState('road')
      } else {
        switch (response.status) {
          case 400:
            setError({ message: result.message || 'roadPointIdx에서 정규표현식 에러' });
            break;
          case 401:
            setError({ message: '올바른 access token이 아님' });
            break;
          case 404:
            setError({ message: 'roadIdx에 대한 값이 없음.' });
            break;
          case 500:
            setError({ message: '내부 서버 에러' });
            break;
          default:
            setError({ message: '알 수 없는 에러 발생' });
        }
      }
    } catch (err) {
      // Network or unexpected errors
      setError({ message: '내부 서버 에러' });
    } finally {
      setLoading(false);
    }
  };

  return { RoadDetail, error, loading, fetchRoadPoint };
};

export default useRoadPointApi;