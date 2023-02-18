import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface SwitchTrendingSliceState {
  trendigSwitchValue: boolean;
  popularSwitchValue: boolean;
}

const initialState: SwitchTrendingSliceState = {
  trendigSwitchValue: false,
  popularSwitchValue: false,
};

export const SwitchSlice = createSlice({
  name: 'switchTrending',
  initialState,
  reducers: {
    switchTrendingVal(state, action: PayloadAction<boolean>) {
      state.trendigSwitchValue = action.payload;
    },
    switchPopularVal(state, action: PayloadAction<boolean>) {
      state.popularSwitchValue = action.payload;
    },
  },
});

export const { switchTrendingVal, switchPopularVal } = SwitchSlice.actions;

export default SwitchSlice.reducer;

export const switchTrendingValueSelect = (state: RootState) =>
  state.switchTrendingSlice.trendigSwitchValue;
export const switchPopularValueSelect = (state: RootState) =>
  state.switchTrendingSlice.popularSwitchValue;
