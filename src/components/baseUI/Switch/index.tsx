import React from 'react';
import styles from './Switch.module.scss';

type SwitchTypes = {
  trends: string[];
  handleSwitch: (value: boolean) => void;
  value: boolean;
};

const Switch: React.FC<SwitchTypes> = ({ trends, handleSwitch, value }) => {
  return (
    <span className={styles.spanSwitch}>
      <div
        className={value ? styles.spanFirstCase : styles.firstCaseActive}
        onClick={() => handleSwitch(false)}>
        {trends[0]}
      </div>
      <div
        className={value ? styles.secondCaseActive : styles.spanSecondCase}
        onClick={() => handleSwitch(true)}>
        {trends[1]}
      </div>
      <div
        className={styles.spanBackGround}
        style={
          value
            ? {
                right: '0px',
                paddingLeft: '25px',
              }
            : {
                left: '-30px',
              }
        }></div>
    </span>
  );
};
export default Switch;
