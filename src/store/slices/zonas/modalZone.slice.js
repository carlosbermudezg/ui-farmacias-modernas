import { createSlice } from '@reduxjs/toolkit';

export const modalZoneSlice = createSlice({
  name: 'modalZone',
  initialState: false,
  reducers: {
    setModalZone: (state, action) => {
      return action.payload
    }
  }
})

export const { setModalZone } = modalZoneSlice.actions;

export default modalZoneSlice.reducer;