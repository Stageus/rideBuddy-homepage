import React, { useState } from 'react';
import Header from '../../widgets/Header';
import Aside from '../../widgets/Aside';
import MapComponent from './model/MapComponent';
import { Content, MapContainer, PageWrapper } from './style/style';
import MainTab from './ui/Sidebar';

const Main = () => {
  const [selectedData, setSelectedData] = useState([]);

  return (
    <PageWrapper>
      <Header />
      <Aside setSelectedData={setSelectedData} />
      <Content>
        <MainTab />
        <MapContainer>
          <MapComponent selectedData={selectedData} />
        </MapContainer>
      </Content>
    </PageWrapper>
  );
};

export default Main;
