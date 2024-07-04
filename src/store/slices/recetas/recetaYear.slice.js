import { createSlice } from '@reduxjs/toolkit'

export const recetaYearSlice = createSlice({
  name: 'recetaYear',
  initialState: '',
  reducers: {
    setRecetaYear: (state, action) => {
      return action.payload
    }
  }
})

export const { setRecetaYear } = recetaYearSlice.actions;

export default recetaYearSlice.reducer;