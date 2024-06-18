import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const zonesSlice = createSlice({
  name: 'zones',
  initialState: [],
  reducers: {
    setZones: (state, action) => {
      return action.payload
    }

  }
})

export const getZonesThunk= () => (dispatch) =>{
  axios.get(`${process.env.EXPO_PUBLIC_API_URL}/zones`)
      .then( response => {
          dispatch(setZones( response.data ))
      })
      .catch( error => console.log( error ) )
}

export const { setZones } = zonesSlice.actions;

export default zonesSlice.reducer;