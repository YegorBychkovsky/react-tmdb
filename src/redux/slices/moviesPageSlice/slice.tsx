import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import tmdbAxios from '../../../api/tmdbAxios';
import { RootState } from '../../store';
import {
  moviesSectionSliceState,
  Status,
  MoviesTypes,
  SearchTrendingMovieParams,
  SearchMovieActorsParams,
  MovieActorsType,
} from './types';

const initialState: moviesSectionSliceState = {
  movie: undefined,
  status: Status.LOADING,
  cast: [],
};

export const fetchingMoviesPage = createAsyncThunk<MoviesTypes, SearchTrendingMovieParams>(
  'moviePage/fetchMoviesPage',
  async (params) => {
    const { url } = params;
    const { data } = await tmdbAxios.get<MoviesTypes>(url);

    return data;
  },
);

export const fetchingMovieActors = createAsyncThunk<MovieActorsType, SearchMovieActorsParams>(
  'moviePage/fetchActors',
  async (params) => {
    const { urlActors } = params;
    const { data } = await tmdbAxios.get<MovieActorsType>(urlActors);

    return data;
  },
);

export const moviesPageSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchingMoviesPage.pending, (state) => {
      state.status = Status.LOADING;
      state.movie = undefined;
    });
    builder.addCase(fetchingMoviesPage.fulfilled, (state, action) => {
      state.movie = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchingMoviesPage.rejected, (state) => {
      state.status = Status.ERROR;
      state.movie = undefined;
    });

    builder.addCase(fetchingMovieActors.pending, (state) => {
      state.status = Status.LOADING;
      state.cast = [];
    });
    builder.addCase(fetchingMovieActors.fulfilled, (state, action) => {
      state.cast = action.payload.cast;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchingMovieActors.rejected, (state) => {
      state.status = Status.ERROR;
      state.cast = [];
    });
  },
});

export const {} = moviesPageSlice.actions;

export default moviesPageSlice.reducer;

export const movieSelect = (state: RootState) => state.moviesPageSlice.movie;
export const actorsSelect = (state: RootState) => state.moviesPageSlice.cast;
