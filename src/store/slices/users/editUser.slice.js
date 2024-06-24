import { createSlice } from '@reduxjs/toolkit'

export const editUserSlice = createSlice({
  name: 'editUser',
  initialState: {},
  reducers: {
    setEditUser: (state, action) => {
      return action.payload
    }
  }
})

export const { setEditUser } = editUserSlice.actions;

export default editUserSlice.reducer;