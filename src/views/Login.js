import { useState, useEffect } from 'react'
import { TextInput, Button, Snackbar } from 'react-native-paper'
import axios from 'axios'
import { View, Text, Image, ScrollView } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import loginStyle from "../../assets/styles/login"
const LogoFarmaciasModernas = require('../../public/farmacias-modernas.jpeg')
const LogoFarmaciasLopez =  require('../../public/farmacias-lopez.jpg')
import { useDispatch } from 'react-redux'
import { setUser } from '../store/slices/user.slice'

const Login = ({navigation})=>{

    const dispatch = useDispatch()

    const [user, setUserLogin] = useState('')
    const [password, setPassword] = useState('')
    const [loadingLogin, setLoadingLogin] = useState(false)
    const [snackbarVisible, setSnackbarVisible] = useState(false)
    const [snackbarMsg, setSnackbarMsg] = useState('')

    const onDismissSnackBar = () => setSnackbarVisible(false)

    const VerifyLogin = async() =>{
        const userLogged = await AsyncStorage.getItem('user')
        const token = await AsyncStorage.getItem('token')
        if (userLogged && token) {
            navigation.navigate('Main')
          }
    }

    useEffect(() => {
        VerifyLogin()
    }, [])

    const handleLogin = () =>{
        if (user == '' || password == ''){
            setSnackbarMsg('Los campos no deben estar vacíos')
            setSnackbarVisible(true)
            return
        }
        const data = {
            user, 
            password
        }
        axios.post(`${process.env.EXPO_PUBLIC_API_URL}/users/login`, data)
            .then( (response) =>{
                setLoadingLogin(true)
                setTimeout(()=>{
                    dispatch(setUser(response.data.user))
                    AsyncStorage.setItem('user', JSON.stringify(response.data.user))
                    AsyncStorage.setItem('token', response.data.token)
                    navigation.navigate('Main')
                    setLoadingLogin(false)
                },2000)
            })
            .catch( (error) => {
                setSnackbarMsg(error.response.data.error)
                setSnackbarVisible(true)
            } )
    }

    return(
        <>
        <View style={loginStyle.mainContainer}>
            <Image
                style={ loginStyle.logo }
                source={ LogoFarmaciasLopez } 
            />
        </View>
        <View style={ loginStyle.loginWrap }>
            <ScrollView contentContainerStyle={ loginStyle.loginContainer }>
                <View style={ loginStyle.loginForm }>
                    <Image
                        style={ loginStyle.logo1 }
                        source={ LogoFarmaciasModernas }  
                    />
                    <TextInput
                        mode="outlined"
                        label="Usuario"
                        placeholder="Escribe tu usuario"
                        onChange={ (e) => setUserLogin(e.nativeEvent.text)}
                    />
                    <TextInput
                        mode="outlined"
                        label="Contraseña"
                        secureTextEntry
                        placeholder="Escribe tu contraseña"
                        onChange={ (e) => {
                            e.preventDefault()
                            setPassword(e.nativeEvent.text)
                        }}
                    />
                    <Button style={ loginStyle.login } loading={ loadingLogin } icon="login" mode="contained" 
                        onPress={(e) => {
                            e.preventDefault()
                            handleLogin()
                        }}
                    >
                        Entrar
                    </Button>
                    <Text style={loginStyle.title}>¿No tienes cuenta?</Text>
                    <Button style={ loginStyle.login } icon="account-arrow-right" mode="contained" 
                        onPress={(e) => {
                            e.preventDefault()
                            navigation.navigate('Register')
                        }}>
                        Registrate
                    </Button>
                </View>
            </ScrollView>
            <Snackbar
                visible={snackbarVisible}
                onDismiss={onDismissSnackBar}
            >
            { snackbarMsg }
            </Snackbar>
        </View>
        </>
    )
}

export default Login