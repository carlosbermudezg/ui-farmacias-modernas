import { createSlice } from '@reduxjs/toolkit';

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    name: '',
    username: '',
    telefono: '',
    direccion: ''
  },
  reducers: {
    setData: (state, action) => {
      return action.payload
    }

  }
})

export const { setData } = dataSlice.actions;

export default dataSlice.reducer;