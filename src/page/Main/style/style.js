import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  margin-top: 60px;
  margin-left: 80px;
  height: calc(100vh - 60px);
`;

export const MapContainer = styled.div`
  flex: 1;
  height: 100%;
  overflow: hidden;
`;
