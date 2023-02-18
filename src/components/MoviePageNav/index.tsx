import { Button, Menu, MenuItem, StyledEngineProvider } from '@mui/material';
import React from 'react';
import styles from './MoviePageNav.module.scss';

type MoviePageNavProps = {
  buttonName: string;
  items: string[];
};

const MoviePageNav: React.FC<MoviePageNavProps> = ({ buttonName, items }) => {
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState();

  const recordButtonPosition = (event: any) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget);

    setMenuOpen(true);
  };

  let closeMenu = () => {
    setMenuOpen(false);
    console.log(menuOpen);
  };
  return (
    <StyledEngineProvider injectFirst>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onMouseEnter={recordButtonPosition}
        className={styles.buttonComp}
        size="medium">
        {buttonName}
        <span>▼</span>
      </Button>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={menuOpen} onClose={closeMenu}>
        {items.map((item, i) => (
          <MenuItem key={i} onMouseLeave={closeMenu}>
            {item}{' '}
          </MenuItem>
        ))}
      </Menu>
    </StyledEngineProvider>
  );
};
export default MoviePageNav;
