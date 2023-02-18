import React from 'react';
import styles from './ActorCard.module.scss';

interface ActorCardProps {
  profile_path: string;
  name: string;
  character: string;
}

const ActorCard: React.FC<ActorCardProps> = ({ profile_path, name, character }) => {
  return (
    <div className={styles.card}>
      <img width={138} height={175} src={profile_path} alt="" />
      <div className={styles.content}>
        <b>{name}</b>
        <p>{character}</p>
      </div>
    </div>
  );
};
export default ActorCard;
