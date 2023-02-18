import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SearchButton.module.scss';

type SearchButtonProps = {
  onClick: () => void;
};

const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {
  return (
    <Link to={`/search`}>
      <button className={styles.button} onClick={onClick}>
        Search
      </button>
    </Link>
  );
};
export default SearchButton;
