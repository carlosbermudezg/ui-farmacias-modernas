import { useEffect, useState } from 'react'
import axios from 'axios'
import useSWR from 'swr'
import { Platform, BackHandler, AppState } from "react-native"
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

import * as Notifications from 'expo-notifications';

import { useSocket } from '../utils/SocketContext'

const Home = ({ navigation, route })=>{

    const { lastMessage } = useSocket()
    const [notificationId, setNotificationId] = useState(null)

    useEffect(() => {
      const enviarNotificacion = async () => {
        if (lastMessage != null) {
          try {
            //Consulta el nombre del usuario que envía la notificación
            const userResponse = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/users/one/${lastMessage.userSend}`);
            const userNotification = userResponse.data[0].name;
    
            //Consulta los últimos 5 mensajes sin leer para mostrarlos en la notificación
            const messagesResponse = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/chats/getMessagesNoRead/${lastMessage.idchat}`);
            const messages = extractMessages(messagesResponse.data);
    
            // Construye el cuerpo de la notificación con todos los mensajes
            const notificationBody = messages.join('\n');

            if(notificationId != null){
              Notifications.dismissNotificationAsync(notificationId) 
            }
    
            //Envia la nueva notificación
            const appState = AppState.currentState;
            if (appState === 'background') {
              const notificationIdentifier = await Notifications.scheduleNotificationAsync({
                content: {
                  title: `${userNotification}`,
                  subtitle: 'Farmacias Modernas',
                  body: notificationBody,
                },
                trigger: null,
              });
              setNotificationId(notificationIdentifier)
            }
          } catch (error) {
            console.error('Error al enviar la notificación:', error);
          }
        }
      };
    
      // Función para extraer los mensajes del response
      const extractMessages = (data) => {
        return data[0].reverse().map(element => element.content);
      };
      enviarNotificacion()
    }, [lastMessage])

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
    const fetcher = async(url)=> axios.get(url, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`
      }
    }).then( res => res.data )
    .catch( error => error )
    const { data, isLoading, error } = useSWR(`${process.env.EXPO_PUBLIC_APISHEYLA_URL}/products/`, fetcher)
    
    const destroyToken = async()=>{
      await AsyncStorage.removeItem('token')
      await AsyncStorage.removeItem('user') 
      navigation.navigate('Login')
    }
    
    if(data){
      dispatch(setProducts(data?.data))
      dispatch(setRenderProducts(data?.data?.slice(0,5)))
      dispatch(setTotalPage(Math.ceil(data?.data?.length / 5)))
    }else{
      destroyToken()
    }

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