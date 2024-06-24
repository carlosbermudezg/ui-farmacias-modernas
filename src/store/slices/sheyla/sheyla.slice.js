import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const sheylaSlice = createSlice({
  name: 'sheyla',
  initialState: '',
  reducers: {
    setSheylaUrl: (state, action) => {
      return action.payload
    }
  }
})

export const setSheylaUrlThunk = (id) => (dispatch) =>{
  axios.get(`${process.env.EXPO_PUBLIC_API_URL}/zones/${id}`)
      .then( response => {
            console.log(response.data[0].api)
            dispatch(setSheylaUrl( response.data[0].api ))
      })
      .catch( error => console.log( error ) )
}

export const { setSheylaUrl } = sheylaSlice.actions;

export default sheylaSlice.reducer;