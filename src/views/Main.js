import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createDrawerNavigator } from '@react-navigation/drawer'
import DrawerContent from '../components/DrawerContent'
import { Icon } from 'react-native-paper'
import { SocketProvider } from '../utils/SocketContext'
import { Button } from 'react-native-paper'

import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

const Drawer = createDrawerNavigator()

import Home from './Home'
import Users from './Users'
import LoginOut from './LogingOut'
import Chat from './Chat'
import Recetas from './Recetas'

const Main = ()=>{

    const [user, setUser] = useState({})

    useEffect(() => {
        registerForPushNotificationsAsync();
    
        Notifications.addNotificationReceivedListener(handleNotification);
        Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);
    
        return () => {
          Notifications.removeNotificationSubscription(handleNotification);
          Notifications.removeNotificationSubscription(handleNotificationResponse);
        };
      }, []);
    
      const handleNotification = notification => {
        console.log('Notificación recibida:', notification);
      };
    
      const handleNotificationResponse = response => {
        console.log('Respuesta a la notificación:', response);
      };
    
      const registerForPushNotificationsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        if (status !== 'granted') {
          alert('La aplicación no tiene permiso para recibir notificaciones push.');
          return;
        }
    
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log('Token de notificación push:', token);
      };
    
      const enviarNotificacion = async () => {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: '¡Hola desde Expo!',
            body: 'Esta es una notificación push enviada desde Expo.',
          },
          trigger: null,
        });
      };

    useEffect(() => {
        VerifyPermisos()
    }, [])

    const VerifyPermisos = async() =>{
        const userLogged = await AsyncStorage.getItem('user')
        setUser(JSON.parse(userLogged))
    }

    return (
        <SocketProvider url="http://localhost:3000">
            <Drawer.Navigator
                screenOptions={{
                    headerShown: false,
                    headerTintColor:'#fff',
                    headerStyle: {
                        backgroundColor:'#662D91'
                    },
                    drawerStyle: {
                        margin: 20,
                        marginLeft: 0,
                        backgroundColor: 'transparent',
                        width: 250,
                        borderTopRightRadius:5
                    },
                }
                }
                drawerContent={(props) => <DrawerContent {...props}></DrawerContent> }
            >
                <Drawer.Screen options={ 
                        { 
                            drawerIcon: ()=>{
                                return(
                                    <Icon
                                        source="apps-box"
                                        color={'#F57E25'}
                                        size={20}
                                    />
                                )
                            }
                        } 
                    } 
                    name="Productos" component={ Home } 
                />
                <Drawer.Screen 
                    options={ 
                        { 
                            drawerIcon: ()=>{
                                return(
                                    <Icon
                                        source="email-check-outline"
                                        color={'#F57E25'}
                                        size={20}
                                    />
                                )
                            }
                        } 
                    }  
                    name="Buzón" component={ Chat }
                />
                {
                    user.type === 1 ? <Drawer.Screen options={ 
                        { 
                            drawerIcon: ()=>{
                                return(
                                    <Icon
                                        source="account"
                                        color={'#F57E25'}
                                        size={20}
                                    />
                                )
                            }
                        } 
                    }  name="Recetas" component={ Recetas } /> : false
                }
                {
                    user.type === 10 ? <Drawer.Screen options={ 
                        { 
                            drawerIcon: ()=>{
                                return(
                                    <Icon
                                        source="account"
                                        color={'#F57E25'}
                                        size={20}
                                    />
                                )
                            }
                        } 
                    }  name="Usuarios" component={ Users } /> : false
                }
                <Drawer.Screen options={ {headerShown: false, drawerItemStyle:{ display: 'none' }} } name="Salir" component={ LoginOut } />
            </Drawer.Navigator>
            <Button onPress={()=> enviarNotificacion() }>Enviar notificacion</Button>
        </SocketProvider>
    )
}

export default Main