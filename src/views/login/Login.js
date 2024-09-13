import { useState, useEffect } from 'react'
import axios from 'axios'
import ButtonComponent from '../../components/ButtonComponent'
import TextInputComponent from '../../components/TextInputComponent'
import { View, Text, Image, ScrollView } from "react-native"
import { Snackbar } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import loginStyle from "../../../assets/styles/login"
const LogoFarmaciasModernas = require('../../../public/farmacias-modernas.jpeg')
const LogoFarmaciasLopez =  require('../../../public/farmacias-lopez.jpg')
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/slices/user.slice'
import Loading from '../../components/Loading'

const Login = ({ navigation })=>{

    const dispatch = useDispatch()

    const [user, setUserLogin] = useState('')
    const [password, setPassword] = useState('')
    const [loadingLogin, setLoadingLogin] = useState(false)
    const [snackbarMessage, setSnackbarMsg] = useState('')
    const [snackbarVisible, setSnackbarVisible] = useState(false)
    const onDismissSnackBar = () => setSnackbarVisible(false)

    const VerifyLogin = async() =>{
        // const userLogged = await AsyncStorage.getItem('user')
        const token = await AsyncStorage.getItem('token')
        await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/users/validateToken?token=${token}`)
            .then(response => {
                if(response.data.isValid == true){
                    navigation.navigate('Main')
                }else{
                    console.log("token no valido")
                }
            })
            .catch(err=> console.log(err))
        // if (userLogged && token) {
        //     navigation.navigate('Main')
        // }
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
        setLoadingLogin(true)
        axios.post(`${process.env.EXPO_PUBLIC_API_URL}/users/login`, data)
            .then( (response) =>{
                setTimeout(()=>{
                    dispatch(setUser(response.data.user))
                    AsyncStorage.setItem('user', JSON.stringify(response.data.user))
                    AsyncStorage.setItem('token', response.data.token)
                    AsyncStorage.setItem('token2', response.data.admin_token)
                    navigation.navigate('Main')
                    setLoadingLogin(false)
                },2000)
            })
            .catch( (error) => {
                setLoadingLogin(false)
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
                    <TextInputComponent
                        label="Email"
                        labelColor='silver'
                        color='#FFF'
                        borderColor='#662D91'
                        onChange={ (e) => setUserLogin(e)}
                    />
                    <TextInputComponent
                        label="Contraseña"
                        labelColor='silver'
                        secureTextEntry={true}
                        color='#FFF'
                        borderColor='#662D91'
                        onChange={ (e) => setPassword(e)}
                    />
                    {
                        loadingLogin ? 
                        <Loading color="#7A428D"></Loading> : 
                        <>
                            <ButtonComponent 
                                title="Entrar" 
                                iconName="login"
                                color="#7A428D"
                                textColor='#FFF'
                                borderColor="#7A428D"
                                iconColor="#FFF"
                                onPress={() => handleLogin()}
                            >
                            </ButtonComponent>
                            <Text style={loginStyle.title}>¿No tienes cuenta?</Text>
                            <ButtonComponent 
                                title="Registrate" 
                                iconName="account"
                                color="#7A428D"
                                textColor='#FFF'
                                borderColor="#7A428D"
                                iconColor="#FFF"
                                onPress={() => navigation.navigate('Data')}
                            >
                            </ButtonComponent>
                        </>
                    }
                </View>
            </ScrollView>
            <Snackbar
                visible={ snackbarVisible }
                onDismiss={ onDismissSnackBar }
            >
                { snackbarMessage }
            </Snackbar>
        </View>
        </>
    )
}

export default Login