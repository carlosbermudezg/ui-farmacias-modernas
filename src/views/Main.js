import { useState, useEffect, Suspense, Text } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { createDrawerNavigator } from '@react-navigation/drawer'

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
                    backgroundColor: '#FFF',
                    width: 250,
                },
            }
            }
        >
            <Drawer.Screen options={ { gestureEnabled: true,swipeEnabled: false} } name="Productos" component={ Home } />
            <Drawer.Screen name="Chat" component={ Chat } />
            {
                user.type === 1 ? <Drawer.Screen name="Recetas" component={ Recetas } /> : false
            }
            {
                user.type === 10 ? <Drawer.Screen name="Usuarios" component={ Users } /> : false
            }
            <Drawer.Screen options={ {headerShown: false} } name="Salir" component={ LoginOut } />
        </Drawer.Navigator>
    )
}

export default Main