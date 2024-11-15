import React, { useState } from 'react';
import Header from '../../widgets/Header';
import Aside from '../../widgets/Aside';
import { Content, MapContainer, PageWrapper } from './style/style';
import MainTab from './ui/MainTab';
import Map from './ui/Map';

const Main = () => {
  return (
    <>
      <Header />
      <Aside />
      <PageWrapper>
        <Content>
          <MainTab />
          <MapContainer>
            <Map />
          </MapContainer>
        </Content>
      </PageWrapper>
    </>
  );
};

export default Main;
