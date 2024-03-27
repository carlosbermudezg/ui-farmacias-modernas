import { createSlice } from '@reduxjs/toolkit';

export const categoryUserSlice = createSlice({
  name: 'categoryUser',
  initialState: [],
  reducers: {
    setCategoryUser: (state, action) => {
      return action.payload
    }

  }
})

export const { setCategoryUser } = categoryUserSlice.actions;

export default categoryUserSlice.reducer;