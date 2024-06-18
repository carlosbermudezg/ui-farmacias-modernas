import { createSlice } from '@reduxjs/toolkit';

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: [false, ""],
  reducers: {
    setSnackbar: (state, action) => {
      return action.payload
    }

  }
})

export const { setSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;