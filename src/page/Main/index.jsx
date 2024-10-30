import React from 'react';
import Header from '../../widgets/Header';
import Aside from '../../widgets/Aside';
import styled from 'styled-components';
import MapComponent from './model/MapComponent';
import SidebarComponent from './ui/Sidebar';

const Main = () => {
  return (
    <Container>
      <Header />
      <Aside />
      <Content>
        <SidebarComponent/>
        <MapContainer>
          <MapComponent />
        </MapContainer>
      </Content>
    </Container>
  );
};

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  margin-top: 60px; /* Header 높이만큼 여백 추가 */
  margin-left: 80px; /* Aside 너비만큼 여백 추가 */
  height: calc(100vh - 60px); /* Header 높이를 뺀 전체 높이 */
`;

const Sidebar = styled.div`
  width: 300px; /* 왼쪽 사이드바의 폭 */
  background-color: #f9f9f9;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const LocationInfo = styled.div`
  text-align: center;
  margin-bottom: 20px;
  color: #333;

  h2 {
    margin: 0;
    font-size: 1.2em;
  }

  p {
    margin: 5px 0;
    font-size: 0.9em;
  }
`;

const Smiley = styled.div`
  font-size: 3em;
  margin: 10px 0;
`;

const RideStatus = styled.p`
  font-weight: bold;
  color: #4caf50;
`;

const GraphPlaceholder = styled.div`
  width: 100%;
  height: 150px;
  background-color: #e0e0e0;
  margin-bottom: 20px;
`;

const BikeImagePlaceholder = styled.div`
  width: 80px;
  height: 80px;
  background-color: #e0e0e0;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const MapContainer = styled.div`
  flex: 1;
  height: 100%;
  overflow: hidden;
`;

export default Main;
