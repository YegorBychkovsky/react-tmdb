import { stepClasses } from '@mui/material';
import React from 'react';
import styles from './ProgressCircle.module.scss';

type ProgressCircleType = {
  percent: number;
};

const ProgressCircle: React.FC<ProgressCircleType> = ({ percent }) => {
  const bar = {
    low: '#db2360',
    medium: '#d2d531',
    high: '#21d07a',
    none: '#d4d4d4',
  };
  const track = {
    low: '#571435',
    medium: '#423d0f',
    high: '#204529',
    none: '#666666',
  };
  const getColor = (rating: number) => {
    if (rating >= 70) return 'high';
    if (rating >= 40) return 'medium';
    if (rating > 0) return 'low';
    return 'none';
  };
  const dashArray = Math.PI * 100;
  const dashOffset = Math.PI * (100 - percent);
  return (
    <div className={styles.circle}>
      <svg width="34px" height="34px" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx="52.5"
          cy="52.5"
          r="50"
          fill="transparent"
          stroke="#423d0f"
          strokeWidth={6}
          strokeDasharray={dashArray}
          // strokeDashoffset={dashOffset}
          style={{ transform: 'scale(0.95)' }}></circle>
        <circle
          cx="52.5"
          cy="52.5"
          r="50"
          fill="transparent"
          stroke={bar[getColor(percent)]}
          strokeWidth={6}
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          style={{ transform: 'scale(0.95)' }}></circle>
      </svg>
      <div className={styles.percentNumber}>
        {percent > 0 && percent}
        {percent ? <span>%</span> : 'NR'}
      </div>
    </div>
  );
};
export default ProgressCircle;
