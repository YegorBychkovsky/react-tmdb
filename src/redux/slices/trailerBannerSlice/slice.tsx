import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import tmdbAxios from '../../../api/tmdbAxios';
import { RootState } from '../../store';

enum TrailerBannerStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

type TrailersResponseTypes = {
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

interface TrailersSectionSliceState {
  trailers: FetchTrailersTrending;
  status: TrailerBannerStatus;
}

type SearchTrailersParams = {
  url: string;
};

type FetchTrailersTrending = {
  results: TrailersResponseTypes[];
};

const initialState: TrailersSectionSliceState = {
  trailers: { results: [] },
  status: TrailerBannerStatus.LOADING,
};

export const fetchingTrailers = createAsyncThunk<FetchTrailersTrending, SearchTrailersParams>(
  'movie/fetchTrailers',
  async (params) => {
    const { url } = params;
    const { data } = await tmdbAxios.get<FetchTrailersTrending>(url);

    return data;
  },
);

export const trailersSlice = createSlice({
  name: 'trailers',
  initialState,
  reducers: {
    addTrailers(state, action: PayloadAction<[]>) {
      state.trailers.results = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchingTrailers.pending, (state) => {
      state.status = TrailerBannerStatus.LOADING;
      state.trailers.results = [];
    });
    builder.addCase(fetchingTrailers.fulfilled, (state, action) => {
      state.trailers.results = action.payload.results;
      state.status = TrailerBannerStatus.SUCCESS;
    });
    builder.addCase(fetchingTrailers.rejected, (state) => {
      state.status = TrailerBannerStatus.ERROR;
      state.trailers.results = [];
    });
  },
});

export const { addTrailers } = trailersSlice.actions;

export default trailersSlice.reducer;

export const trailersSelect = (state: RootState) => state.trailerBannerSlice.trailers.results;
