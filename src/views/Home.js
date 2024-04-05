import { useEffect } from 'react'
import axios from 'axios'
import useSWR from 'swr'
import { Platform, BackHandler } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import Navbar from '../components/Navbar'
import HomeWeb from './HomeWeb'
import HomeMobile from './HomeMobile'
import { useDispatch } from 'react-redux'
import { setProducts } from '../store/slices/products.slice'
import { setRenderProducts } from '../store/slices/renderProducts.slice'
import { setTotalPage } from '../store/slices/totalPage'
import LoadingLogin from '../components/LoadingLogin'
import ErrorData from '../components/ErrorData'

const Home = ({ navigation, route })=>{

    const VerifyLogin = async() =>{
        const userLogged = await AsyncStorage.getItem('user')
        const token = await AsyncStorage.getItem('token')
        if (userLogged && token) {
            return true
        }
        return false
    }

    useEffect(() => {
        const backAction = () => {
            const verify = VerifyLogin()
            if(verify){
                navigation.navigate('Main')
            }else{
                navigation.navigate('Login')
            }
            return true
        }
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction,
        );
    
        return () => backHandler.remove();
      }, []);

    const dispatch = useDispatch()

    //swr
    const fetcher = (url)=> axios.get(url).then( res => res.data )
    const { data, isLoading, error } = useSWR(`${process.env.EXPO_PUBLIC_APISHEYLA_URL}/products/`, fetcher)
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
        isLoading === true ? <LoadingLogin></LoadingLogin>:
        error ? <ErrorData></ErrorData>:
        <>
        <Navbar navigation={ navigation } route={ route.name } ></Navbar>
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