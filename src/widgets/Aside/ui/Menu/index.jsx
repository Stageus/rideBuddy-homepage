// components/Menu.js (발췌)
import React, { useState, useEffect } from 'react';
import { StyledIcon } from '../../style/style';

const Menu = () => {

  return (
    <>
      <StyledIcon src="img/icon_navigation.png" alt="Navigation Icon" />
      <StyledIcon src="img/icon_map_pin.png" alt="Map Icon" />
    </>
  );
};

export default Menu;
