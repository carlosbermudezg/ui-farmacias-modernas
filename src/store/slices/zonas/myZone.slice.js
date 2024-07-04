import { createSlice } from '@reduxjs/toolkit';

export const myZoneSlice = createSlice({
  name: 'myZone',
  initialState: '',
  reducers: {
    setMyZone: (state, action) => {
      return action.payload
    }
  }
})

export const { setMyZone } = myZoneSlice.actions;

export default myZoneSlice.reducer;