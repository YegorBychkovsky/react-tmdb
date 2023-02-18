import React from 'react';
import NavBarUl from './NavBarUl';
// import { NavItemsLeft } from './NavItems';
import { NavItemsLeft, NavItemsRight } from './NavItems';

const NavBar = () => {
  return (
    <nav>
      <NavBarUl items={NavItemsLeft} />
      <NavBarUl items={NavItemsRight} />
    </nav>
  );
};
export default NavBar;
