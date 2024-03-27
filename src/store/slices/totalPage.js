import { createSlice } from '@reduxjs/toolkit';

export const totalPageSlice = createSlice({
  name: 'totalPage',
  initialState: 0,
  reducers: {
    setTotalPage: (state, action) => {
        return action.payload
    }

  }
})

export const { setTotalPage } = totalPageSlice.actions;

export default totalPageSlice.reducer;