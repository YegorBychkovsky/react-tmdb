import { type } from 'os';
import React from 'react';
import { Link } from 'react-router-dom';
import MoreCardButton from '../baseUI/MoreCardButton';
import ProgressCircle from '../baseUI/ProgressCircle';

import styles from './MovieCard.module.scss';

type MovieCardProps = {
  poster_path: string;
  title: string;
  release_date: string;
  percent: number;
  link: string;
};

const MovieCard: React.FC<MovieCardProps> = ({
  poster_path,
  title,
  release_date,
  percent,
  link,
}) => {
  return (
    <div className={styles.card}>
      <Link to={link}>
        <img width={150} height={225} src={poster_path} alt="" />
      </Link>
      <MoreCardButton />
      <ProgressCircle percent={percent} />
      <div className={styles.content}>
        <Link to={link} style={{ textDecoration: 'none', color: 'black' }}>
          <h1>{title}</h1>
        </Link>
        <h4>{release_date}</h4>
      </div>
    </div>
  );
};
export default MovieCard;
