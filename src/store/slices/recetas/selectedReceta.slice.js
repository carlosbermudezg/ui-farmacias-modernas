import { createSlice } from '@reduxjs/toolkit'

export const selectedRecetaSlice = createSlice({
  name: 'selectedReceta',
  initialState: {},
  reducers: {
    setSelectedReceta: (state, action) => {
      return action.payload
    }
  }
})

export const { setSelectedReceta } = selectedRecetaSlice.actions;

export default selectedRecetaSlice.reducer;