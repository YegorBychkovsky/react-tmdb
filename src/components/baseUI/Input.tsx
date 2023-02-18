import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addValue, searchValue } from '../../redux/slices/searchSlice/slice';
import SearchButton from './SearchButton/index';

type InputProps = {
  type: string;
  placeholder: string;
  className?: string;
};

const Input: React.FC<InputProps> = ({ className, type, placeholder }) => {
  const val = useSelector(searchValue);
  const dispatch = useDispatch();

  console.log(val);

  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  const handleSearch = () => {
    if (searchInputRef.current) {
      dispatch(addValue(searchInputRef.current.value));
    }
  };

  console.log(val);

  return (
    <>
      <input
        ref={searchInputRef}
        onKeyDown={handleKeyDown}
        className={className}
        type={type}
        placeholder={placeholder}
      />
      <span>
        <SearchButton onClick={handleSearch} />
      </span>
    </>
  );
};
export default Input;
