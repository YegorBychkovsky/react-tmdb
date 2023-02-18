// import axios from 'axios';
import React from 'react';

import NavBar from './NavBar/index';

const Header: React.FC = () => {
  // const [img, setImg] = React.useState('');

  // const handlerClickFilmsSpan = (
  //   func: React.Dispatch<React.SetStateAction<boolean>>,
  //   value: boolean,
  // ) => {
  //   func(!value);
  //   console.log(value);
  // };

  return (
    <header>
      <NavBar />
    </header>
  );
};
export default Header;
