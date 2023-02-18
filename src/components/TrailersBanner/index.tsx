import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchingPopular,
  moviesSelect,
  popularSelect,
} from '../../redux/slices/moviesSectionSlice/slice';
import { switchTrendingValueSelect } from '../../redux/slices/switchTrendingSlice/slice';
import { fetchingTrailers, trailersSelect } from '../../redux/slices/trailerBannerSlice/slice';
import { switchTrailerValueSelect } from '../../redux/slices/trailersBlockSwitcher/slice';
import { useAppDispatch } from '../../redux/store';
import TrailerBannerCard from './TrailerBannerCard';
import styles from './TrailersBanner.module.scss';
import Switcher from './TrailersBannerSwitcher';
let url = '';
const TrailerBanner = () => {
  const popular = useSelector(popularSelect);
  // const movies = useSelector(moviesSelect);
  const dispatch = useAppDispatch();
  // const active = useSelector(switchTrendingValueSelect);

  const value = useSelector(switchTrailerValueSelect);

  const trailers = useSelector(trailersSelect);
  console.log(trailers);

  React.useEffect(() => {
    value
      ? (url = '/tv/popular?api_key=5f6ecdf858ad8138d522169f7f1a6786&language=en-US&page=1')
      : (url = '/movie/popular?api_key=5f6ecdf858ad8138d522169f7f1a6786&language=en-US&page=1');

    const getTrailers = async () => {
      value ? dispatch(fetchingTrailers({ url })) : dispatch(fetchingTrailers({ url }));
    };
    getTrailers();
  }, [value]);

  return (
    <div className={styles.banner}>
      <div className={styles.header}>
        <p>Latest Trailers</p>
        <Switcher />
      </div>
      <div className={styles.trailerList}>
        {trailers.map((series, i) => (
          <TrailerBannerCard key={i} img={series.backdrop_path} p={series.name} />
        ))}
        {/* {active
          ? popular.map((series) => (
              <TrailerBannerCard img={series.backdrop_path} p={series.name} />
            ))
          : movies.map((movie) => <TrailerBannerCard img={movie.backdrop_path} p={movie.name} />)} */}
      </div>
    </div>
  );
};
export default TrailerBanner;
