import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface SwitchTrendingSliceState {
  trailersSwitchValue: boolean;
}

const initialState: SwitchTrendingSliceState = {
  trailersSwitchValue: true,
};

export const SwitchTrailerSlice = createSlice({
  name: 'switchTrailers',
  initialState,
  reducers: {
    switchTrailerBlockVal(state, action: PayloadAction<boolean>) {
      state.trailersSwitchValue = action.payload;
    },
  },
});

export const { switchTrailerBlockVal } = SwitchTrailerSlice.actions;

export default SwitchTrailerSlice.reducer;

export const switchTrailerValueSelect = (state: RootState) =>
  state.trailersBlockSwitcher.trailersSwitchValue;
