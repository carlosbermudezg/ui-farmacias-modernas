import { createSlice } from '@reduxjs/toolkit'

export const modalVisibleSlice = createSlice({
  name: 'modalVisible',
  initialState: false,
  reducers: {
    setModalVisible: (state, action) => {
      return action.payload
    }
  }
})

export const { setModalVisible } = modalVisibleSlice.actions;

export default modalVisibleSlice.reducer;