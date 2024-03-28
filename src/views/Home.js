import { useState, useEffect } from 'react'
import axios from 'axios'
import useSWR from 'swr'
import { Platform } from "react-native"
import Navbar from '../components/Navbar'
import HomeWeb from './HomeWeb'
import HomeMobile from './HomeMobile'
import { useDispatch } from 'react-redux'
import { setProducts } from '../store/slices/products.slice'
import { setRenderProducts } from '../store/slices/renderProducts.slice'
import { setTotalPage } from '../store/slices/totalPage'

const Home = ({ navigation })=>{

    const dispatch = useDispatch()

    //swr
    const fetcher = (url)=> axios.get(url).then( res => res.data )
    const { data, error, isLoading } = useSWR(`${process.env.EXPO_PUBLIC_APISHEYLA_URL}/products/`, fetcher,{ suspense: true })
    dispatch(setProducts(data?.data))
    dispatch(setRenderProducts(data?.data.slice(0,5)))
    dispatch(setTotalPage(Math.ceil(data?.data.length / 5)))

    // useEffect(() => {
    //     const getSearchProduct = async()=>{
    //         const url = `${process.env.EXPO_PUBLIC_APISHEYLA_URL}/products/`
    //         const token = await AsyncStorage.getItem('token')
    //         const auth = {  headers: { Authorization: `Bearer ${token}` } }
    //         axios.get(url, auth)
    //         .then((response)=>{
    //             dispatch(setRenderProducts(response.data.data.slice(0, limit)))
    //             dispatch(setProducts(response.data.data))
    //             setTotalPages(Math.ceil(response.data.data.length / limit))
    //         })
    //         .catch((error)=>{
    //             console.log(error)
    //         })
    //     }
    //     getSearchProduct()
    // }, [])

    return(
        <>
        <Navbar navigation={ navigation } ></Navbar>
        {
            Platform.OS === 'web' ?
            //WEB HOME
            <HomeWeb></HomeWeb>
            : 
            //MOBILE HOME
            <HomeMobile></HomeMobile>
            
        }
        </>
    )
}

export default Home