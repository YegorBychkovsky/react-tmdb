import React from 'react';
import styles from './SearchPageCard.module.scss';

type SearchPageCardProps = {
  img: string;
  name: string;
  date: string;
  text: string;
};

export const SearchPageCard: React.FC<SearchPageCardProps> = ({ img, name, date, text }) => {
  return (
    <div className={styles.card}>
      <img
        width={94}
        height={141}
        src={`https://www.themoviedb.org/t/p/w188_and_h282_bestv2` + img}
        alt=""
      />
      <div className={styles.content}>
        <h2>{name}</h2>
        <p className={styles.cardDate}>{date}</p>
        <p className={styles.cardText}>{text}</p>
      </div>
    </div>
  );
};
export default SearchPageCard;
