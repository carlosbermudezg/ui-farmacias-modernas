import { createSlice } from '@reduxjs/toolkit';

export const selectBodegaSlice = createSlice({
  name: 'selectBodega',
  initialState: [],
  reducers: {
    setSelectBodega: (state, action) => {
      return action.payload
    }
  }
})

export const { setSelectBodega } = selectBodegaSlice.actions;

export default selectBodegaSlice.reducer;