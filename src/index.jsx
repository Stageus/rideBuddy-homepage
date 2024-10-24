import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import { RecoilRoot } from 'recoil';

createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
);
