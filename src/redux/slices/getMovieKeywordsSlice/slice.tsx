import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import tmdbAxios from '../../../api/tmdbAxios';
import { RootState } from '../../store';

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

type SearchTrendingMovieParams = {
  url: string;
};

type KeywordsObj = {
  id: number;
  name: string;
};

type FetchKeywordType = {
  id: number;
  keywords: KeywordsObj[];
};

interface KeywordsSectionSliceState {
  keywords?: FetchKeywordType;
  status: Status;
}

const initialState: KeywordsSectionSliceState = {
  keywords: undefined,
  status: Status.LOADING,
};

export const fetchingMoviesKeywords = createAsyncThunk<FetchKeywordType, SearchTrendingMovieParams>(
  'movie/fetchTrendingMovies',
  async (params) => {
    const { url } = params;
    const { data } = await tmdbAxios.get<FetchKeywordType>(url);

    return data;
  },
);

export const getMovieKeywordsSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchingMoviesKeywords.pending, (state) => {
      state.status = Status.LOADING;
      state.keywords = undefined;
    });
    builder.addCase(fetchingMoviesKeywords.fulfilled, (state, action) => {
      state.keywords = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchingMoviesKeywords.rejected, (state) => {
      state.status = Status.ERROR;
      state.keywords = undefined;
    });
  },
});

export const {} = getMovieKeywordsSlice.actions;

export default getMovieKeywordsSlice.reducer;

export const keywordsSelect = (state: RootState) => state.getMovieKeywordsSlice.keywords;
