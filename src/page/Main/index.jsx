import React from 'react';
import Header from '../../widgets/Header';
import Aside from '../../widgets/Aside';
import MapComponent from './model/MapComponent';
import { Content, MapContainer, PageWrapper } from './style/style';
import MainTab from './ui/Sidebar';

const Main = () => {
  return (
    <PageWrapper>
      <Header />
      <Aside />
      <Content>
        <MainTab />
        <MapContainer>
          <MapComponent />
        </MapContainer>
      </Content>
    </PageWrapper>
  );
};

export default Main;
