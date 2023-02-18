import { style } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { switchTrendingValueSelect } from '../../../redux/slices/switchTrendingSlice/slice';
import {
  switchTrailerValueSelect,
  switchTrailerBlockVal,
} from '../../../redux/slices/trailersBlockSwitcher/slice';
import styles from './TrailersBannerSwitcher.module.scss';

type SwitcherTypes = {};

const TrailersVariants = ['On TV', 'In Theaters'];

const Switcher: React.FC = () => {
  // const [active, setActive] = React.useState(true);
  const active = useSelector(switchTrailerValueSelect);
  const dispatch = useDispatch();

  const handleSwitcher = (value: boolean) => {
    dispatch(switchTrailerBlockVal(value));
    console.log(active);
  };

  // dispatch(switchTrendsBlockVal(true));
  // console.log(active);

  return (
    <div className={styles.switcher}>
      <div
        className={active ? styles.leftSwitcherActive : styles.leftSwitcher}
        onClick={() => handleSwitcher(true)}>
        {TrailersVariants[0]}
      </div>
      <div
        className={active ? styles.rightSwitcher : styles.rightSwitcherActive}
        onClick={() => handleSwitcher(false)}>
        {TrailersVariants[1]}
      </div>
      <div
        className={styles.spanBackGround}
        style={
          active
            ? {
                left: '0px',
              }
            : {
                right: '0px',
                paddingLeft: '40px',
              }
        }></div>
    </div>
  );
};
export default Switcher;
