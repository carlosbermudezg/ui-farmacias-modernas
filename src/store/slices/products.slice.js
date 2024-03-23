import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    setProducts: (state, action) => {
        console.log(action.payload)
      return action.payload
    }

  }
})

// export const getProductsSearch = () => (dispatch) => {

// }

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;