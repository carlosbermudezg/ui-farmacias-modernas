import { createSlice } from '@reduxjs/toolkit';

export const categorySlice = createSlice({
  name: 'category',
  initialState: 0,
  reducers: {
    setCategory: (state, action) => {
      return action.payload
    }

  }
})

export const { setCategory } = categorySlice.actions;

export default categorySlice.reducer;