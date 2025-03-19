import { useState } from 'react';
import { detailSourceState, selectedResultState } from '../../../../../../../shared/recoil/atoms/atomState';
import { useSetRecoilState } from 'recoil';

// Custom hook for fetching center details
const useCenterDetails = () => {
  const [CenterDetail, setCenterDetail] = useState(null); // Response data for 200
  const [error, setError] = useState(null); // Error message for 400, 401, 404, 500
  const [loading, setLoading] = useState(false); // Loading state
  const setSelectedResult = useSetRecoilState(selectedResultState);
  const setDetailSourceState = useSetRecoilState(detailSourceState);

  // Function to validate centerIdx with regex
  const isValidCenterIdx = (idx) => /^\d+$/.test(idx);

  // API call function
  const fetchCenterDetails = async (centerIdx) => {
    // Get access token from localStorage
    const token = localStorage.getItem('token');

    // Validate centerIdx before making the request
    if (!isValidCenterIdx(centerIdx)) {
      setError({ message: 'centerIdx에서 정규표현식 에러' });
      return;
    }

    // Check if token exists
    if (!token) {
      setError({ message: '액세스 토큰이 로컬스토리지에 없습니다.' });
      return;
    }

    setLoading(true);
    setError(null);
    setCenterDetail(null);

    try {
      const response = await fetch(`http://3.35.94.179/info/centers/${centerIdx}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        const transformedResult = {
          idx: result.centers_idx,         
          name: result.centers_name,       
          latitude: result.centers_lat_lng[1], 
          longitude: result.centers_lat_lng[0],
          like: result.center_likeCount,
          addr: result.centers_address,   
          result: result                   
        };

        setCenterDetail(result);         
        setSelectedResult(transformedResult);
        setDetailSourceState('center') 
        // console.log(transformedResult);
      } else {
        switch (response.status) {
          case 400:
            setError({ message: result.message || 'centerIdx에서 정규표현식 에러' });
            break;
          case 401:
            setError({ message: '올바른 access token이 아님' });
            break;
          case 404:
            setError({ message: 'centerIdx에 대한 값이 없음.' });
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

  return { CenterDetail, error, loading, fetchCenterDetails };
};

export default useCenterDetails;