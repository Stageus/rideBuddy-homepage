import React, { useEffect } from 'react';

const NaverPanorama = () => {
  useEffect(() => {
    const initPanorama = () => {
      const panoElement = document.getElementById('pano');

      if (window.naver && window.naver.maps) {
        const panoramaOptions = {
          position: new window.naver.maps.LatLng(37.556835, 126.6038861),
          size: new window.naver.maps.Size(800, 600),
          pov: {
            pan: -135,
            tilt: 29,
            fov: 100,
          },
        };

        const pano = new window.naver.maps.Panorama(panoElement, panoramaOptions);

        // Event Listener for Panorama change
        window.naver.maps.Event.addListener(pano, 'pano_changed', () => {
          console.log('PanoramaLocation', pano.getLocation());
        });
      }
    };

    initPanorama();
  }, []);

  return <div id="pano" style={{ width: '500px', height: '500px' }}></div>;
};

export default NaverPanorama;
