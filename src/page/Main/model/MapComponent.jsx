import React, { useRef, useEffect, useState } from 'react';

const MapComponent = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);
  const [userLocation, setUserLocation] = useState({ lat: 37.556835, lng: 126.6038861 }); // 기본 위치

  // 더미 인증센터 데이터
  const dummyCenters = [
    { name: '영산하구둑인증센터', latitude: 34.8019679, longitude: 126.4457409 },
    { name: '느러지전망관람대인증센터', latitude: 34.9147873, longitude: 126.5416218 },
    { name: '죽산보인증센터', latitude: 34.9707961, longitude: 126.6264067 },
    { name: '승촌보인증센터', latitude: 35.0653128, longitude: 126.7614059 },
    { name: '낙동강하구둑인증센터', latitude: 35.1084124, longitude: 128.9479504 },
    { name: '담양대나무숲인증센터', latitude: 35.2472386, longitude: 126.8918793 },
    { name: '메타세쿼이아길인증센터', latitude: 35.3318928, longitude: 127.0169042 },
    { name: '양산물문화관인증센터', latitude: 35.3156944, longitude: 128.9742795 },
    { name: '담양댐인증센터', latitude: 35.3712676, longitude: 127.0182184 },
    { name: '창녕함안보인증센터', latitude: 35.3772116, longitude: 128.5507862 },
    { name: '합천창녕보인증센터', latitude: 35.5908546, longitude: 128.3615973 },
    { name: '달성보인증센터', latitude: 35.7370155, longitude: 128.4191659 },
    { name: '강정고령보인증센터', latitude: 35.8419883, longitude: 128.4626587 },
    { name: '금강하구둑인증센터', latitude: 36.0206317, longitude: 126.7645631 },
    { name: '칠곡보인증센터', latitude: 36.0153244, longitude: 128.4008044 },
    { name: '익산성당포구인증센터', latitude: 36.1309589, longitude: 126.9219245 },
    { name: '구미보인증센터', latitude: 36.237332, longitude: 128.3494861 },
    { name: '상주상풍교인증센터', latitude: 36.4987732, longitude: 128.2657686 },
    { name: '안동댐인증센터', latitude: 36.5775627, longitude: 128.7584247 },
    { name: '문경불정역인증센터', latitude: 36.6557033, longitude: 128.1408885 },
    { name: '이화령휴게소인증센터', latitude: 36.7516429, longitude: 128.0316497 },
    { name: '수안보온천인증센터', latitude: 36.8487463, longitude: 127.9894125 },
    { name: '충주탄금대인증센터', latitude: 36.9893008, longitude: 127.9033871 },
    { name: '충주댐인증센터', latitude: 37.0111474, longitude: 127.9786075 },
    { name: '강천보인증센터', latitude: 37.2771209, longitude: 127.6810436 },
    { name: '여주보인증센터', latitude: 37.3263624, longitude: 127.6051899 },
    { name: '이포보인증센터', latitude: 37.4074712, longitude: 127.5419457 },
    { name: '양평군립미술관인증센터', latitude: 37.4982631, longitude: 127.4848049 },
    { name: '능내역인증센터', latitude: 37.52247656, longitude: 127.2950394 },
    { name: '뚝섬전망콤플렉스인증센터', latitude: 37.5321156, longitude: 127.0601551 },
    { name: '여의도서울마리나인증센터', latitude: 37.5181389, longitude: 126.9452965 },
    { name: '광나루자전거공원인증센터', latitude: 37.5465223, longitude: 127.1202657 },
    { name: '아라서해갑문인증센터', latitude: 37.55712258, longitude: 126.6036738 },
    { name: '아라한강갑문인증센터', latitude: 37.5987932, longitude: 126.8003758 },
    { name: '통일전망대(민통선내)', latitude: 38.5148799, longitude: 128.4180703 },
    { name: '북천철교', latitude: 38.4013521, longitude: 128.4742228 },
    { name: '봉포해변인증센터', latitude: 38.2405721, longitude: 128.5750642 },
    { name: '영금정인증센타', latitude: 38.2135984, longitude: 128.6010058 },
    { name: '동호해변', latitude: 38.0619767, longitude: 128.6795389 },
    { name: '지경공원', latitude: 37.9183524, longitude: 128.8081075 },
    { name: '경포해변', latitude: 37.8052348, longitude: 128.9074109 },
    { name: '정동진', latitude: 37.6875986, longitude: 129.0380108 },
    { name: '망상해변', latitude: 37.5899931, longitude: 129.0940242 },
    { name: '추암촛대바위', latitude: 37.4762048, longitude: 129.1600637 },
    { name: '한재공원', latitude: 37.4187068, longitude: 129.1961864 },
    { name: '임원', latitude: 37.2224473, longitude: 129.3390237 },
    { name: '통일전망대(민통선외)', latitude: 38.5148799, longitude: 128.4180703 },
    { name: '백제보인증센터', latitude: 36.3173598, longitude: 126.9421057 },
    { name: '낙단보인증센터', latitude: 36.35898087, longitude: 128.3065762 },
    { name: '상주보인증센터', latitude: 36.4310878, longitude: 128.2502622 },
    { name: '공주보인증센터', latitude: 36.4604396, longitude: 127.1003556 },
    { name: '대청댐인증센터', latitude: 36.4743682, longitude: 127.4821239 },
    { name: '비내섬인증센터', latitude: 37.1103569, longitude: 127.8094644 },
    { name: '밝은광장', latitude: 37.5532934, longitude: 127.3127745 },
    { name: '샛터삼거리', latitude: 37.6623699, longitude: 127.3704546 },
    { name: '경강교', latitude: 37.8208531, longitude: 127.5194727 },
    { name: '신매대교', latitude: 37.9204597, longitude: 127.7130532 },
    { name: '섬진강댐 인증센터', latitude: 35.5207365, longitude: 127.1495502 },
    { name: '장군목인증센터', latitude: 35.4605009, longitude: 127.2014591 },
    { name: '향가유원지인증센터', latitude: 35.3385623, longitude: 127.1885158 },
    { name: '횡탄정인증센터', latitude: 35.3037168, longitude: 127.3280266 },
    { name: '사성암인증센터', latitude: 35.1823053, longitude: 127.4696123 },
    { name: '남도대교인증센터', latitude: 35.1855275, longitude: 127.6211126 },
    { name: '배알도수변공원인증센터', latitude: 34.959737, longitude: 127.7616758 },
    { name: '매화마을인증센터', latitude: 35.0799344, longitude: 127.717136 },
    { name: '합강공원인증센터', latitude: 36.5174854, longitude: 127.3211249 },
    { name: '세종보인증센터', latitude: 36.4767907, longitude: 127.2600025 },
    { name: '용두암', latitude: 33.5152202, longitude: 126.5111212 },
    { name: '다락쉼터', latitude: 33.4694715, longitude: 126.3401181 },
    { name: '해거름마을공원', latitude: 33.369871, longitude: 126.206496 },
    { name: '송악산', latitude: 33.2066978, longitude: 126.2894245 },
    { name: '법환바당', latitude: 33.235906, longitude: 126.5151134 },
    { name: '쇠소깍', latitude: 33.2523011, longitude: 126.6232807 },
    { name: '표선해변', latitude: 33.325435, longitude: 126.8407713 },
    { name: '성산일출봉', latitude: 33.4686728, longitude: 126.9243719 },
    { name: '김녕성세기해변', latitude: 33.5568554, longitude: 126.7598338 },
    { name: '함덕서우봉해변', latitude: 33.544168, longitude: 126.6726071 },
    { name: '울진은어다리 인증센터', latitude: 36.9768213, longitude: 129.4071152 },
    { name: '망양휴계소 인증센터', latitude: 36.8722499, longitude: 129.420715 },
    { name: '월송정 인증센터', latitude: 36.7440846, longitude: 129.4621491 },
    { name: '고래불해변 인증센터', latitude: 36.6005076, longitude: 129.4120601 },
    { name: '해맞이공원 인증센터', latitude: 36.4284801, longitude: 129.434642 },
    { name: '행촌교차로인증센터', latitude: 36.7659726, longitude: 128.0005855 },
    { name: '백로공원인증센터', latitude: 36.7874402, longitude: 127.5830108 },
    { name: '괴강교인증센터', latitude: 36.803981, longitude: 127.8226823 },
    { name: '무심천교인증센터', latitude: 36.6787306, longitude: 127.44859 },
    { name: '팔당대교', latitude: 37.545692, longitude: 127.237083 },
    { name: '목행교', latitude: 37.020554, longitude: 127.9033871 },
  ];

  // 사용자 현재 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        error => {
          console.error('위치를 가져오는 데 실패했습니다:', error);
        },
      );
    }
  }, []);

  // 지도 및 마커 초기화
  useEffect(() => {
    const { naver } = window;
    if (mapRef.current && naver) {
      const location = new naver.maps.LatLng(userLocation.lat, userLocation.lng);
      const mapInstance = new naver.maps.Map(mapRef.current, {
        center: location,
        zoom: 15,
      });
      setMap(mapInstance);

      const infoWindowInstance = new naver.maps.InfoWindow({
        anchorSkew: true,
      });
      setInfoWindow(infoWindowInstance);

      // 사용자 위치에 마커 추가
      new naver.maps.Marker({
        position: location,
        map: mapInstance,
        icon: {
          content: `<div style="background: blue; color: white; padding: 5px 10px; border-radius: 50%; font-weight: bold;">내 위치</div>`,
        },
      });
    }
  }, [userLocation]);

  // 더미 데이터로 마커 추가
  useEffect(() => {
    if (map && dummyCenters.length) {
      dummyCenters.forEach(center => {
        const position = new naver.maps.LatLng(center.latitude, center.longitude);
        const marker = new naver.maps.Marker({
          position,
          map,
          title: center.name,
        });

        // 마커 클릭 시 정보 창 열기
        naver.maps.Event.addListener(marker, 'click', () => {
          infoWindow.setContent(`
            <div style="padding:10px;">
              <h4>${center.name}</h4>
              <p>${center.address}</p>
              <p>${center.distance} km 떨어짐</p>
            </div>
          `);
          infoWindow.open(map, marker);
        });
      });
    }
  }, [map, infoWindow]);

  return <div ref={mapRef} style={{ width: '100%', height: '100vh' }}></div>;
};

export default MapComponent;
