import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import searchSlice from './slices/searchSlice/slice';
import switchTrendingSlice from './slices/switchTrendingSlice/slice';
import moviesSectionSlice from './slices/moviesSectionSlice/slice';
import trailersBlockSwitcher from './slices/trailersBlockSwitcher/slice';
import trailerBannerSlice from './slices/trailerBannerSlice/slice';
import moviesPageSlice from './slices/moviesPageSlice/slice';
import getMovieKeywordsSlice from './slices/getMovieKeywordsSlice/slice';

export const store = configureStore({
  reducer: {
    searchSlice,
    switchTrendingSlice,
    moviesSectionSlice,
    trailersBlockSwitcher,
    trailerBannerSlice,
    moviesPageSlice,
    getMovieKeywordsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
