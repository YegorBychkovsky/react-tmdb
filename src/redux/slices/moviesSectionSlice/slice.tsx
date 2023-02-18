import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import tmdbAxios from '../../../api/tmdbAxios';
import { RootState } from '../../store';

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

type MoviesTypes = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  name: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
};

interface moviesSectionSliceState {
  movies: FetchMoviesTrending;
  status: Status;
  popular: FetchMoviesTrending;
  popularFetchingStatus: Status;
}

type SearchTrendingMovieParams = {
  url: string;
};
type SearchPopularParams = {
  urlPopular: string;
};

type FetchMoviesTrending = {
  results: MoviesTypes[];
};

const initialState: moviesSectionSliceState = {
  movies: { results: [] },
  status: Status.LOADING,
  popular: { results: [] },
  popularFetchingStatus: Status.LOADING,
};

export const fetchingTrendingMovies = createAsyncThunk<
  FetchMoviesTrending,
  SearchTrendingMovieParams
>('movie/fetchTrendingMovies', async (params) => {
  const { url } = params;
  const { data } = await tmdbAxios.get<FetchMoviesTrending>(url);

  return data;
});
export const fetchingPopular = createAsyncThunk<FetchMoviesTrending, SearchPopularParams>(
  'popular/fetchPopular',
  async (params) => {
    const { urlPopular } = params;
    const { data } = await tmdbAxios.get<FetchMoviesTrending>(urlPopular);

    return data;
  },
);

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovies(state, action: PayloadAction<[]>) {
      state.movies.results = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchingTrendingMovies.pending, (state) => {
      state.status = Status.LOADING;
      state.movies.results = [];
    });
    builder.addCase(fetchingTrendingMovies.fulfilled, (state, action) => {
      state.movies.results = action.payload.results;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchingTrendingMovies.rejected, (state) => {
      state.status = Status.ERROR;
      state.movies.results = [];
    });

    builder.addCase(fetchingPopular.pending, (state) => {
      state.popularFetchingStatus = Status.LOADING;
      state.popular.results = [];
    });
    builder.addCase(fetchingPopular.fulfilled, (state, action) => {
      state.popular.results = action.payload.results;
      state.popularFetchingStatus = Status.SUCCESS;
    });
    builder.addCase(fetchingPopular.rejected, (state) => {
      state.popularFetchingStatus = Status.ERROR;
      state.popular.results = [];
    });
  },
});

export const { addMovies } = moviesSlice.actions;

export default moviesSlice.reducer;

export const moviesSelect = (state: RootState) => state.moviesSectionSlice.movies.results;
export const popularSelect = (state: RootState) => state.moviesSectionSlice.popular.results;
