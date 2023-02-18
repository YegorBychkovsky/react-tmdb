import { useSelect } from '@mui/base';
import { style } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  actorsSelect,
  fetchingMovieActors,
  fetchingMoviesPage,
  movieSelect,
} from '../../redux/slices/moviesPageSlice/slice';
import { useAppDispatch } from '../../redux/store';
import styles from './moviePage.module.scss';
import { MoviesTypes } from '../../redux/slices/moviesPageSlice/types';
import MoviePageInfoTop from '../../components/MoviePageInfoTop';
import MoviePageMain from '../../components/MoviePageMain/MoviePageMain';
import { Button, Menu, MenuItem } from '@mui/material';
import MoviePageNav from '../../components/MoviePageNav';

const MoviePage = () => {
  const { movieId } = useParams();
  const url = `/movie/${movieId}?api_key=5f6ecdf858ad8138d522169f7f1a6786&language=en-US`;
  const urlActors = `/movie/${movieId}/credits?api_key=5f6ecdf858ad8138d522169f7f1a6786&language=en-US`;
  const dispatch = useAppDispatch();
  const movie = useSelector(movieSelect);
  console.log(movie);

  console.log(movie && movie.backdrop_path);

  useEffect(() => {
    dispatch(fetchingMoviesPage({ url }));
    dispatch(fetchingMovieActors({ urlActors }));
  }, []);

  // const actors = useSelector(actorsSelect);
  // console.log(actors);

  return (
    <div className={styles.moviePage}>
      <div className={styles.moviePageNav}>
        <MoviePageNav
          buttonName={'Overview'}
          items={[
            'Main',
            'Alternative Titles',
            'Taglines',
            'Cast & Crew',
            'Released Dates',
            'Translations',
            '',
            'Changes',
            'Report',
            'Edit',
          ]}
        />
        <MoviePageNav buttonName={'Media'} items={['Backdrops', 'Logos', 'Posters', 'Videos']} />
        <MoviePageNav buttonName={'Fandom'} items={['Discussions', 'Reviews']} />
        <MoviePageNav buttonName={'Share'} items={['Share Link', 'FaceBook', 'Tweet']} />
        {/* <MoviePageNav /> */}
        {/* <div>
          <div>
            Overview <span>▼</span>
          </div>
          <div>
            Media <span>▼</span>
          </div>
          <div>
            Fandom <span>▼</span>
          </div>
          <div>
            Share <span>▼</span>
          </div>
        </div> */}
        {/* <Button aria-controls="simple-menu" aria-haspopup="true" onClick={recordButtonPosition}>
          Open Menu
        </Button>
        <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={menuOpen} onClose={closeMenu}>
          <MenuItem onClick={closeMenu}>Main</MenuItem>
          <MenuItem onClick={closeMenu}>Alternative Titles</MenuItem>
          <MenuItem onClick={closeMenu}>Taglines</MenuItem>
          <MenuItem onClick={closeMenu}>Cast & Crew</MenuItem>
          <MenuItem onClick={closeMenu}>Released Dates</MenuItem>
          <MenuItem onClick={closeMenu}>Translations</MenuItem>
          <MenuItem onClick={closeMenu}></MenuItem>
          <MenuItem onClick={closeMenu}>Changes</MenuItem>
          <MenuItem onClick={closeMenu}>Report</MenuItem>
          <MenuItem onClick={closeMenu}>Edit</MenuItem>
        </Menu> */}
        {/* <Button aria-controls="simple-menu" aria-haspopup="true" onClick={recordButtonPosition}>
          Open Menu
        </Button>
        <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={menuOpen} onClose={closeMenu}>
          <MenuItem onClick={closeMenu}>Profile</MenuItem>
          <MenuItem onClick={closeMenu}>My account</MenuItem>
          <MenuItem onClick={closeMenu}>Logout</MenuItem>
        </Menu>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={recordButtonPosition}>
          Open Menu
        </Button>
        <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={menuOpen} onClose={closeMenu}>
          <MenuItem onClick={closeMenu}>Profile</MenuItem>
          <MenuItem onClick={closeMenu}>My account</MenuItem>
          <MenuItem onClick={closeMenu}>Logout</MenuItem>
        </Menu>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={recordButtonPosition}>
          Open Menu
        </Button>
        <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={menuOpen} onClose={closeMenu}>
          <MenuItem onClick={closeMenu}>Profile</MenuItem>
          <MenuItem onClick={closeMenu}>My account</MenuItem>
          <MenuItem onClick={closeMenu}>Logout</MenuItem>
        </Menu> */}
      </div>
      <div
        className={styles.content}
        style={{
          backgroundImage: ` url('https://www.themoviedb.org/t/p/w1920_and_h800_face${
            movie && movie.backdrop_path
          }')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left calc((50vw - 170px) - 340px) top',
        }}>
        <div className={styles.background}>
          <div className={styles.mainImg}>
            <img
              src={movie && `https://www.themoviedb.org/t/p/w600_and_h900_face${movie.poster_path}`}
              alt=""
              width={300}
              height={450}
            />
          </div>
          <div>
            {movie && (
              <MoviePageInfoTop
                percent={Math.round(Number(movie.vote_average * 10))}
                title={movie.title}
                release_date={movie.release_date}
                adult={movie.adult}
                production_companies={movie.production_companies}
                genres={movie.genres}
                runtime={movie.runtime}
                tagline={movie.tagline}
                overview={movie.overview}
              />
            )}
          </div>
        </div>
      </div>
      <MoviePageMain />
    </div>
  );
};
export default MoviePage;
