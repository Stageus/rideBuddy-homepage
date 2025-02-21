import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Panorama = ({ latitude, longitude }) => {
  useEffect(() => {
    const initPanorama = () => {
      const panoElement = document.getElementById('pano');

      if (window.naver && window.naver.maps) {
        const panoramaOptions = {
          position: new window.naver.maps.LatLng(latitude, longitude),
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
  }, [latitude, longitude]);

  return <div id="pano" style={{ width: '100%', height: '200px', overflow: 'hidden' }}></div>;
};

Panorama.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

export default Panorama;
