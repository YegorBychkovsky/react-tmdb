import React from 'react';
import { useSelector } from 'react-redux';
import {
  fetchingMoviesKeywords,
  keywordsSelect,
} from '../../redux/slices/getMovieKeywordsSlice/slice';
import { actorsSelect, movieSelect } from '../../redux/slices/moviesPageSlice/slice';
import { MovieActorsType } from '../../redux/slices/moviesPageSlice/types';
import { useAppDispatch } from '../../redux/store';
import ActorCard from '../ActorCard/ActorCard';
import SocialMoviePage from '../SocialMoviePage';
import styles from './MoviePageMain.module.scss';

const MoviePageMain: React.FC = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchingMoviesKeywords({ url }));
  }, []);
  const url = 'movie/505642/keywords?';

  const actors = useSelector(actorsSelect);
  const movie = useSelector(movieSelect);
  const keywordsObj = useSelector(keywordsSelect);

  const keywords = keywordsObj?.keywords;

  console.log(keywords);

  return (
    <div className={styles.MoviePageMain}>
      <div className={styles.top}>
        <h1>Top Billed Cast</h1>
        <div className={styles.links}>
          <div className={styles.facebook}></div>
          <div className={styles.twitter}></div>
          <div className={styles.instagram}></div>
          <div className={styles.link}></div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.leftBar}>
          <div className={styles.actors}>
            {actors.map((actor, i) => {
              if (i < 10) {
                return (
                  <ActorCard
                    key={i}
                    profile_path={`https://www.themoviedb.org/t/p/w138_and_h175_face${actor.profile_path}`}
                    name={actor.name}
                    character={actor.character}
                  />
                );
              }
              return;
            })}
          </div>
          <div className={styles.link}>
            <a href="#">Full Cast & Crew</a>
          </div>
          <div
            style={{
              width: '100%',
              border: '0.7px solid black',
              margin: '30px 0',
              opacity: '0.2',
            }}></div>
          <SocialMoviePage />
        </div>
        <div className={styles.sideBar}>
          <div className={styles.mainInfo}>
            <div>
              <span>Status</span>
              <p className={styles.movieInfo}>{movie?.status}</p>
            </div>
            <div>
              <span>Original Language</span>
              <p className={styles.movieInfo}>{movie?.original_language}</p>
            </div>
            <div>
              <span>Budget</span>
              <p className={styles.movieInfo}>${movie?.budget}</p>
            </div>
            <div>
              <span>Revenue</span>
              <p className={styles.movieInfo}>${movie?.revenue}</p>
            </div>
          </div>
          <div className={styles.keywords}>
            Keywords{' '}
            <div className={styles.keywordsBlocks}>
              {keywords?.map((keyword) => (
                <div key={keyword.id} className={styles.keywordsBlock}>
                  {keyword.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MoviePageMain;
