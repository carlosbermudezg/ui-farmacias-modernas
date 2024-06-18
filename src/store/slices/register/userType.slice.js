import { createSlice } from '@reduxjs/toolkit';

export const userTypeSlice = createSlice({
  name: 'userType',
  initialState: '',
  reducers: {
    setUserType: (state, action) => {
      return action.payload
    }

  }
})

export const { setUserType } = userTypeSlice.actions;

export default userTypeSlice.reducer;