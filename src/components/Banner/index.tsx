import { style } from '@mui/system';
import React from 'react';
import ButtonCheckIt from '../baseUI/ButtonCheckIt';
import Input from '../baseUI/Input';
import styles from './Banner.module.scss';

type BannerProps = {
  img?: string;
  h1: string;
  h2: string;
};

const Banner: React.FC<BannerProps> = ({ img, h1, h2 }) => {
  return (
    <>
      <div
        className={styles.banner}
        style={
          img
            ? {
                backgroundImage: `linear-gradient(to right, rgba(45,28,111,0.5) 0%, rgba(45,28,111,0.5) 100%), url(${img})`,
              }
            : {
                backgroundImage: `linear-gradient(to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, 0) 100%),url('https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)/7VrRna8S3x6xbijooeBmxqvHXiu.jpg')`,
              }
        }>
        {h1 === 'Welcome.' ? (
          <h1>{h1}</h1>
        ) : (
          <>
            <h1
              style={{ fontSize: '70px', width: '400px', lineHeight: '80px', marginTop: '-30px' }}>
              {h1}
            </h1>
            <div
              style={{
                backgroundColor: 'white',
                width: '340px',
                height: '1px',
                marginBottom: '15px',
              }}></div>
          </>
        )}
        {h2 === 'Millions of movies, TV shows and people to discover. Explore now.' ? (
          <>
            <h2>{h2}</h2>
          </>
        ) : (
          <h2 style={{ fontSize: '20px', lineHeight: '20px' }}>{h2}</h2>
        )}
        {h1 === 'Welcome.' ? (
          <Input
            className={styles.searchInput}
            type="text"
            placeholder="Search for a movie, tv show, person....."
          />
        ) : (
          <ButtonCheckIt />
        )}
      </div>
    </>
  );
};
export default Banner;
