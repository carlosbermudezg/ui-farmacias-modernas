import { createSlice } from '@reduxjs/toolkit'

export const userRendimientoSlice = createSlice({
  name: 'userRendimiento',
  initialState: {},
  reducers: {
    setUserRendimiento: (state, action) => {
      return action.payload
    }
  }
})

export const { setUserRendimiento } = userRendimientoSlice.actions;

export default userRendimientoSlice.reducer;