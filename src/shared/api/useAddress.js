import { useState, useEffect } from 'react';

const useAddress = (latitude, longitude) => {
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchAddress = async () => {
      if (latitude && longitude) {
        try {
          const response = await fetch(
            `/api/reverse-geocode?coords=${longitude},${latitude}&output=json&orders=addr`,
            {
              headers: {
                'X-NCP-APIGW-API-KEY-ID': '0oj0k7nvsx',
                'X-NCP-APIGW-API-KEY': 'Kl2aS8UurYAkSIPC04CV2X3RHQDe8W10UFe3R2Xt',
              },
            }
          );
          const data = await response.json();
          if (data.results && data.results[0]) {
            const roadAddress =
              data.results[0].region.area1.name +
              ' ' +
              data.results[0].region.area2.name +
              ' ' +
              data.results[0].region.area3.name;
            setAddress(roadAddress);
          }
        } catch (error) {
          console.error('주소를 가져오는 데 실패했습니다:', error);
        }
      }
    };

    fetchAddress();
  }, [latitude, longitude]);

  return address;
};

export default useAddress;
