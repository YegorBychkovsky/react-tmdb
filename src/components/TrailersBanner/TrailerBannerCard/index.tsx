import { switchUnstyledClasses } from '@mui/base';
import React from 'react';
import { useSelector } from 'react-redux';
import { popularSelect } from '../../../redux/slices/moviesSectionSlice/slice';
import styles from './TrailerBannerCard.module.scss';

type TrailerBannerCardTupes = {
  img: string;
  p: string;
};

const TrailerBannerCard: React.FC<TrailerBannerCardTupes> = ({ img, p }) => {
  const popular = useSelector(popularSelect);

  if (popular.length > 1) {
    return (
      <div className={styles.card}>
        <img
          src={`https://www.themoviedb.org/t/p/w710_and_h400_multi_faces${img}`}
          width={315}
          height={168}
          style={{ borderRadius: '10px', marginTop: '20px' }}
        />
        <div className={styles.cardBody}>
          <p>{p}</p>
        </div>
        {/* <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/8SWhBsbxmpk"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen></iframe>{' '} */}
      </div>
    );
  }
  return (
    <div className={styles.card}>
      {/* <img
        src={`https://www.themoviedb.org/t/p/w440_and_h660_face${popular[0].poster_path}`}
        alt=""
      /> */}
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/8SWhBsbxmpk"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen></iframe>{' '}
    </div>
  );
};
export default TrailerBannerCard;
