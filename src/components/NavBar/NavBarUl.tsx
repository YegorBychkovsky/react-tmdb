import React from 'react';
import { NavBarUlItems, NavItems } from './NavItems';
import FontAwesomeIcon from 'react-fontawesome';
import { Link } from 'react-router-dom';
import GoogleAuth from '../GoogleAuth';

type NavBarUlProps = {
  items: NavBarUlItems;
};

const NavBarUl: React.FC<NavBarUlProps> = ({ items }) => {
  const [logIn, setLogIn] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const getItem = (item: NavItems) => {
    let itemList = null;
    switch (item.type) {
      case 'logo':
        itemList = (
          <Link to={''}>
            <img width={154} src={item.src} alt={item.name} />
          </Link>
        );
        break;
      case 'language':
        itemList = <p className="languageChange">{item.name}</p>;
        break;
      case 'icon':
        // logIn
        //   ? (itemList = <FontAwesomeIcon name={item.name} size={'lg'} />)
        //   : (itemList = <FontAwesomeIcon name={item.name} size={'lg'} />);
        itemList = <FontAwesomeIcon name={item.name} size={'lg'} />;
        break;
      case 'login':
        // logIn
        //   ? (itemList = <FontAwesomeIcon name={item.name} size={'lg'} />)
        //   : (itemList = <FontAwesomeIcon name={item.name} size={'lg'} />);
        itemList = <GoogleAuth />;
        break;
      default:
        itemList = <p>{item.name}</p>;
        break;
    }
    return itemList;
  };
  return (
    <ul>
      {items.map((item: NavItems, i) => (
        <li key={i}>{getItem(item)}</li>
      ))}
    </ul>
  );
};
export default NavBarUl;
