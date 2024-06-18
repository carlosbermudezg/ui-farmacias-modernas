import { createSlice } from '@reduxjs/toolkit';

export const selectedBrandsSlice = createSlice({
  name: 'selectedBrands',
  initialState: [],
  reducers: {
    setSelectedBrands: (state, action) => {
      return action.payload
    }

  }
})

export const { setSelectedBrands } = selectedBrandsSlice.actions;

export default selectedBrandsSlice.reducer;