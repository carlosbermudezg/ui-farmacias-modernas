import { createSlice } from '@reduxjs/toolkit'

export const recetaUserSlice = createSlice({
  name: 'recetaUser',
  initialState: {},
  reducers: {
    setRecetaUser: (state, action) => {
      return action.payload
    }
  }
})

export const { setRecetaUser } = recetaUserSlice.actions;

export default recetaUserSlice.reducer;