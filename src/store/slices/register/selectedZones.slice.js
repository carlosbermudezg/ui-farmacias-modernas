import { createSlice } from '@reduxjs/toolkit';

export const selectedZonesSlice = createSlice({
  name: 'selectedZones',
  initialState: ["0"],
  reducers: {
    setSelectedZones: (state, action) => {
      return action.payload
    }

  }
})

export const { setSelectedZones } = selectedZonesSlice.actions;

export default selectedZonesSlice.reducer;