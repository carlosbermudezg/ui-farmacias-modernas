import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import DrawerContent from '../components/DrawerContent'
import { Icon } from 'react-native-paper'

const Drawer = createDrawerNavigator()

import Home from './Home'
import Users from './Users'
import LoginOut from './LogingOut'
import Chat from './Chat'
import Recetas from './Recetas'

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
    )
}

export default Main