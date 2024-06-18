import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const brandsSlice = createSlice({
  name: 'brands',
  initialState: [],
  reducers: {
    setBrands: (state, action) => {
      return action.payload
    }
  }
})

export const getBrandsThunk= () => (dispatch) =>{
    axios.get(`${process.env.EXPO_PUBLIC_APISHEYLA_URL}/products/brands`)
        .then( response => {
            dispatch(setBrands( response.data.data ))
        })
        .catch( error => console.log( error ) )
}

export const { setBrands } = brandsSlice.actions

export default brandsSlice.reducer