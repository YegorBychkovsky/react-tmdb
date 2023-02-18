import { StyledEngineProvider } from '@mui/material';
import { fontSize } from '@mui/system';
import { generateKeySync } from 'crypto';
import React from 'react';
import {
  GenresMoviesType,
  ProductionCompaniesType,
} from '../../redux/slices/moviesPageSlice/types';
import BigProgressCircle from '../baseUI/BigProgressCircle';
import ProgressCircle from '../baseUI/ProgressCircle';
import styles from './MoviePageInfoTop.module.scss';

type MoviePageInfoTopProps = {
  title: string;
  release_date: string;
  adult: boolean;
  production_companies: ProductionCompaniesType[];
  genres: GenresMoviesType[];
  runtime: number;
  tagline: string;
  overview: string;
  percent: number;
};

const MoviePageInfoTop: React.FC<MoviePageInfoTopProps> = ({
  title,
  release_date,
  adult,
  production_companies,
  genres,
  runtime,
  tagline,
  overview,
  percent,
}) => {
  return (
    <div className={styles.content}>
      <div className={styles.MoviePageInfoTop}>
        <h1>
          {title} <span>({release_date})</span>
        </h1>
        <h3>
          <span className={styles.ageLimit}>{adult === false && 'PG-13'}</span> {release_date} (
          {production_companies[0].origin_country}) <span className={styles.spanDot}>•</span>{' '}
          {genres.map((gener) => `${gener.name}`)} <span className={styles.spanDot}>•</span>{' '}
          {runtime}
        </h3>
      </div>
      <div className={styles.section}>
        <BigProgressCircle percent={percent} />
        <div className={styles.text}>
          <span>
            User <p>Score</p>
          </span>
          <div className={styles.circle}>
            <span style={{ marginTop: '-8px', marginRight: '-2.5px', fontSize: '25px' }}>☰</span>
          </div>
          <div className={styles.circle}>
            <span>♥</span>
          </div>
          <div className={styles.circle}>
            <span style={{ marginTop: '-2px', marginRight: '3px' }}>✓</span>
          </div>
          <div className={styles.circle}>
            <span style={{ marginTop: '-2px' }}>★</span>
          </div>
          <div className={styles.trailerPlayer}> ▶ Play Trailer</div>
        </div>
      </div>
      <div className={styles.overview}>
        <div>
          <p>{tagline}</p>
        </div>
        <div>
          <b>Overview</b>
        </div>
        <div>
          <span>{overview}</span>
        </div>
      </div>
      <div className={styles.authors}>
        <div>
          <b>Someone</b>
          <p>Who did something</p>
        </div>
        <div>
          <b>Someone</b>
          <p>Who did something</p>
        </div>
        <div>
          <b>Someone</b>
          <p>Who did something</p>
        </div>
        <div>
          <b>Someone</b>
          <p>Who did something</p>
        </div>
        <div>
          <b>Someone</b>
          <p>Who did something</p>
        </div>
        <div>
          <b>Someone</b>
          <p>Who did something</p>
        </div>
      </div>
    </div>
  );
};
export default MoviePageInfoTop;
