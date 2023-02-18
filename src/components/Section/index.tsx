import React from 'react';
import Switch from '../baseUI/Switch';
import MovieCard from '../MovieCard';
import styles from './Section.module.scss';
import { useSelector } from 'react-redux';
import {
  switchPopularVal,
  switchPopularValueSelect,
  switchTrendingVal,
  switchTrendingValueSelect,
} from '../../redux/slices/switchTrendingSlice/slice';
import {
  fetchingPopular,
  fetchingTrendingMovies,
  moviesSelect,
  popularSelect,
} from '../../redux/slices/moviesSectionSlice/slice';
import { useAppDispatch } from '../../redux/store';
import TrailersBanner from '../TrailersBanner';
let url = '';
let urlPopular = '';
export const Section = () => {
  function handleSwitchTrending(value: boolean) {
    dispatch(switchTrendingVal(value));
  }
  function handleSwitchPopular(value: boolean) {
    dispatch(switchPopularVal(value));
  }

  const TrendingSwitchValue = useSelector(switchTrendingValueSelect);
  const PopularSwitchValue = useSelector(switchPopularValueSelect);

  const value1 = useSelector(switchTrendingValueSelect);
  const value2 = useSelector(switchPopularValueSelect);

  const dispatch = useAppDispatch();
  const movies = useSelector(moviesSelect);
  const popular = useSelector(popularSelect);

  console.log(popular);

  React.useEffect(() => {
    value1
      ? (url = '/trending/all/week?api_key=5f6ecdf858ad8138d522169f7f1a6786')
      : (url = '/trending/all/day?api_key=5f6ecdf858ad8138d522169f7f1a6786');

    const getMovies = async () => {
      value1
        ? dispatch(fetchingTrendingMovies({ url }))
        : dispatch(fetchingTrendingMovies({ url }));
    };
    getMovies();
  }, [value1]);
  React.useEffect(() => {
    value2
      ? (urlPopular =
          '/movie/popular?api_key=5f6ecdf858ad8138d522169f7f1a6786&language=en-US&page=1')
      : (urlPopular = '/tv/popular?api_key=5f6ecdf858ad8138d522169f7f1a6786&language=en-US&page=1');

    const getMovies = async () => {
      value2
        ? dispatch(fetchingPopular({ urlPopular }))
        : dispatch(fetchingPopular({ urlPopular }));
    };
    getMovies();
  }, [value2]);

  return (
    <>
      <section className={styles.section}>
        {' '}
        <span className={styles.span}>Trending</span>
        <Switch
          trends={['Today', 'This Week']}
          handleSwitch={handleSwitchTrending}
          value={TrendingSwitchValue}
        />
      </section>
      <section className={styles.movieSection}>
        {movies?.map((movie, i) => (
          <MovieCard
            key={i}
            poster_path={`https://www.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}`}
            title={movie.title || movie.name}
            release_date={movie.release_date || movie.first_air_date}
            percent={Math.round(Number(movie.vote_average * 10))}
            link={`/movie/${movie.id}`}
          />
        ))}
      </section>
      <TrailersBanner />
      <section className={styles.section}>
        {' '}
        <span className={styles.span}>What's Popular</span>
        <Switch
          trends={['On TV', 'In Theaters']}
          handleSwitch={handleSwitchPopular}
          value={PopularSwitchValue}
        />
      </section>
      <section className={styles.movieSection}>
        {popular.map((series, i) => (
          <MovieCard
            key={i}
            poster_path={`https://www.themoviedb.org/t/p/w440_and_h660_face${series.poster_path}`}
            title={series.title || series.name}
            release_date={series.release_date || series.first_air_date}
            percent={Math.round(Number(series.vote_average * 10))}
            link={`/tv/${series.id}`}
          />
        ))}
      </section>
    </>
  );
};
export default Section;
// function switchPopularVal(value: boolean): any {
//   throw new Error('Function not implemented.');
// }
