import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import tmdbAxios from '../../../api/tmdbAxios';
import { RootState } from '../../store';
import { SearchTrendingMovieParams, Status } from '../moviesPageSlice/types';

// enum Status {
//   LOADING = 'loading',
//   SUCCESS = 'success',
//   ERROR = 'error',
// }

type SearchResultsArrayType = {
  adult: false;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  opularity: number;
  release_date: string;
  video: false;
  vote_average: number;
  vote_count: number;
};

type FetchSearch = {
  page: number;
  results: SearchResultsArrayType[];
  total_pages: number;
  total_results: number;
};

interface SearchSliceState {
  searchValue: string;
  searchFetchResults?: FetchSearch;
  status: Status;
}

const initialState: SearchSliceState = {
  searchValue: '',
  searchFetchResults: undefined,
  status: Status.LOADING,
};

export const fetchSearch = createAsyncThunk<FetchSearch, SearchTrendingMovieParams>(
  'search/fetchSearch',
  async (params) => {
    const { url } = params;
    const { data } = await tmdbAxios.get<FetchSearch>(url);

    return data;
  },
);

export const searchSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearch.pending, (state) => {
      state.status = Status.LOADING;
      state.searchFetchResults = undefined;
    });
    builder.addCase(fetchSearch.fulfilled, (state, action) => {
      state.searchFetchResults = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchSearch.rejected, (state) => {
      state.status = Status.ERROR;
      state.searchFetchResults = undefined;
    });
  },
});

export const { addValue } = searchSlice.actions;

export default searchSlice.reducer;

export const searchValue = (state: RootState) => state.searchSlice.searchValue;
export const searResultSelect = (state: RootState) => state.searchSlice.searchFetchResults;
