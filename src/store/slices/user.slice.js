import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    setUser: (state, action) => {
      return action.payload
    }

  }
})

export const Login = () => (dispatch) => {
    
}

export const { setUser } = productSlice.actions;

export default productSlice.reducer;