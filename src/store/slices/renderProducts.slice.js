import { createSlice } from '@reduxjs/toolkit';

export const renderProductsSlice = createSlice({
  name: 'renderProducts',
  initialState: [],
  reducers: {
    setRenderProducts: (state, action) => {
      return action.payload
    }

  }
})

export const { setRenderProducts } = renderProductsSlice.actions;

export default renderProductsSlice.reducer;