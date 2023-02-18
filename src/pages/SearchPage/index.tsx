import { style } from '@mui/system';
import styles from './SearchPage.module.scss';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import SearchPageCard from '../../components/SearchPageCard';
import {
  addValue,
  fetchSearch,
  searchValue,
  searResultSelect,
} from '../../redux/slices/searchSlice/slice';
import { useAppDispatch } from '../../redux/store';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = useSelector(searchValue);
  const result = useSelector(searResultSelect);
  console.log(value);
  console.log(result);

  const dispatch = useAppDispatch();

  const url = `/search/movie?language=en-US&query=${value}&page=1&include_adult=false`;

  useEffect(() => {
    setSearchParams({ query: `${value}` });
    dispatch(fetchSearch({ url }));
  }, [value]);
  const usedispatch = useDispatch();

  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  const handleSearch = () => {
    if (searchInputRef.current) {
      usedispatch(addValue(searchInputRef.current.value));
    }
  };

  // React.useEffect(() => {
  //   usedispatch(addValue(searchInputRef.current.value));
  // }, [value]);

  return (
    <div className={styles.searchPage}>
      <div className={styles.topSection}>
        <span>
          {/* <Link to={''}> */}
          <input
            ref={searchInputRef}
            onKeyDown={handleKeyDown}
            className={styles.inputSearch}
            type="search"
            placeholder={`${value}`}
          />
          {/* </Link> */}
        </span>
      </div>
      <div className={styles.mainSection}>
        <div className={styles.leftBar}>
          <h2>Search Results</h2>
          <p>Movies</p>
          <p>TV Shows</p>
          <p>People</p>
          <p>Collections</p>
          <p>Keywords</p>
          <p>Companies</p>
          <p>Networks</p>
        </div>
        <div className={styles.rightBar}>
          {result?.results.map((item, i) => (
            <SearchPageCard
              key={i}
              img={item.poster_path}
              name={item.title}
              date={item.release_date}
              text={item.overview}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default SearchPage;
