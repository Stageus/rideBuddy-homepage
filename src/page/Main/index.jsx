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
        <SidebarComponent />
        <MapContainer>
          <MapComponent />
        </MapContainer>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  margin-top: 60px;
  margin-left: 80px;
  height: calc(100vh - 60px);
`;

const MapContainer = styled.div`
  flex: 1;
  height: 100%;
  overflow: hidden;
`;

export default Main;
