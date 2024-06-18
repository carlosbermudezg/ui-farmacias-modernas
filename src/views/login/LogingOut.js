import * as React from 'react';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { Text, View } from "react-native"
import { useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import loginStyle from '../../../assets/styles/login';

const LoginOut = ({navigation})=>{

    useEffect(() => {
        setTimeout(()=>{
            Logout()
        },3000)
    }, [])

    const Logout = async()=>{
        await AsyncStorage.removeItem('user')
        await AsyncStorage.removeItem('token')
        navigation.navigate('Login')
    }

    return(
        <View style={ loginStyle.logout }>
            <ActivityIndicator size={'large'} animating={true} color={MD2Colors.red800} />
            <Text>Cerrando Sesión</Text>
        </View>
    )
}

export default LoginOut