import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createDrawerNavigator } from '@react-navigation/drawer'
import DrawerContent from '../components/DrawerContent'
import { Icon } from 'react-native-paper'
import { SocketProvider } from '../utils/SocketContext'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()

import Home from './Home'
import Users from './Users'
import LoginOut from './login/LogingOut'
import Chat from './Chat'
import RecetasSelect from './RecetasSelect'
import ChatMobile from './ChatMobile'
import AddReceta from './AddReceta'
import Recetas from './Recetas'
import RendimientoMedico from './RendimientoMedico'

const DrawerStack = ()=>{

    const [user, setUser] = useState({})

    useEffect(() => {
        VerifyPermisos()
    }, [])

    const VerifyPermisos = async() =>{
        const userLogged = await AsyncStorage.getItem('user')
        setUser(JSON.parse(userLogged))
    }

    return(
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
            {
                user.type === 1 || user.type === 10 ? <Drawer.Screen options={ 
                    { 
                        drawerIcon: ()=>{
                            return(
                                <Icon
                                    source="file-document-edit-outline"
                                    color={'#F57E25'}
                                    size={20}
                                />
                            )
                        }
                    } 
                }  name="Todas las Recetas" component={ RecetasSelect } /> : false
            }
            {
                user.type === 2 || user.type === 10 ? <Drawer.Screen options={ 
                    { 
                        drawerIcon: ()=>{
                            return(
                                <Icon
                                    source="chart-box-plus-outline"
                                    color={'#F57E25'}
                                    size={20}
                                />
                            )
                        }
                    } 
                }  name="Rendimiento Médico" component={ RendimientoMedico } /> : false
            }
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
    )
}

const Main = ()=>{

    const [user, setUser] = useState({})

    useEffect(() => {
        VerifyPermisos()
    }, [])

    const VerifyPermisos = async() =>{
        const userLogged = await AsyncStorage.getItem('user')
        setUser(JSON.parse(userLogged))
    }

    return (
        <SocketProvider url={`${process.env.EXPO_PUBLIC_SOCKET_URL}`}>
            <Stack.Navigator>
                    <Stack.Screen
                        name="Drawer"
                        component={DrawerStack}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="ChatMobile"
                        component={ChatMobile}
                    />
                    <Stack.Screen
                        name="AddReceta"
                        component={AddReceta}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Recetas"
                        component={Recetas}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>

        </SocketProvider>
    )
}

export default Main