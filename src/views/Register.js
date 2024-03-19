import { useState } from 'react';
import { Appbar, Text, TextInput, Button, Snackbar } from 'react-native-paper';
import { PaperSelect } from 'react-native-paper-select';
import { View, ScrollView } from "react-native"
import loginStyle from "../../assets/styles/login"
import axios from 'axios';

const Register = ({navigation})=>{

    const [snackbarVisible, setSnackbarVisible] = useState(false)
    const [snackbarMsg, setSnackbarMsg] = useState('')
    const [loadingLogin, setLoadingLogin] = useState(false)

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [telefono, setTelefono] = useState('')

    const [type, setType] = useState({
        value: '',
        list: [
          { _id: '1', value: 'Médico' },
          { _id: '2', value: 'Visitador Médico' }
        ],
        selectedList: [],
        error: '',
    });

    const onDismissSnackBar = () => setSnackbarVisible(false)

    const registration = async() =>{
        if(name === '' || username === '' || telefono === '' || password === '' | repeatPassword === '' || type.value === ''){
            setSnackbarMsg('Los campos no pueden estar vacios')
            setSnackbarVisible(true)
            return
        }
        if( password != repeatPassword){
            setSnackbarMsg('Las contraseñas no coinciden')
            setSnackbarVisible(true)
            return
        }
        const data = {
            "name": name,
            "username": username,
            "password": password,
            "telefono": telefono,
            "type": type.selectedList[0]._id
        }
        axios.get(`${process.env.EXPO_PUBLIC_API_URL}/users/${username}`)
            .then((res) =>{
                axios.post(`${process.env.EXPO_PUBLIC_API_URL}/users/adduser`,data)
                .then((response) =>{
                    setLoadingLogin(true)
                    setTimeout(()=>{
                        setSnackbarMsg('El usuario ha sido registrado, Ahora debe esperar a ser admitido por el Administrador')
                        setSnackbarVisible(true)
                        setLoadingLogin(false)
                        setName('')
                        setUsername('')
                        setPassword('')
                        setTelefono('')
                        setRepeatPassword('')
                        setType({
                            value: '',
                            list: [
                            { _id: '1', value: 'Médico' },
                            { _id: '2', value: 'Visitador Médico' }
                            ],
                            selectedList: [],
                            error: '',
                        })
                    }, 2000)
                })
                .catch((error) =>{
                    console.log(error)
                })
            })
            .catch((error) =>{
                console.log(error)
                setSnackbarMsg(error.response.data.error)
                setSnackbarVisible(true)
            })
    }

    return(
        <>
        <Appbar.Header style={ loginStyle.appbar }>
            <Appbar.BackAction color='#fff'  onPress={() => { navigation.navigate('Login') }} />
            <Appbar.Content color='#fff' title="Registrar" />
        </Appbar.Header>
        <ScrollView contentContainerStyle={ loginStyle.contentForm }>
            <View style={ loginStyle.registerWrap }>
                <Text style={ loginStyle.registerText } variant="headlineMedium">Crear una cuenta</Text>
                <Text variant="titleMedium">Por favor ingresa tu datos</Text>
                <View style={ loginStyle.registerForm }>
                    <TextInput 
                        value={ name }
                        style={ loginStyle.registerInput }
                        label="Nombres completos"
                        onChangeText={text => setName(text)}
                    />
                    <TextInput
                        value={ username }
                        style={ loginStyle.registerInput }
                        label="Correo eléctronico"
                        onChangeText={text => setUsername(text)}
                    />
                    <TextInput
                        value={ telefono }
                        style={ loginStyle.registerInput }
                        label="Teléfono"
                        onChangeText={text => setTelefono(text)}
                    />
                    <TextInput
                        value={ password }
                        style={ loginStyle.registerInput }
                        label="Contraseña"
                        onChangeText={text => setPassword(text)}
                    />
                    <TextInput
                        value={ repeatPassword }
                        style={ loginStyle.registerInput }
                        label="Repite tu Contraseña"
                        onChangeText={text => setRepeatPassword(text)}
                    />
                    <PaperSelect
                        dialogStyle={ loginStyle.dialogRegister }
                        dialogCloseButtonText='Cancelar'
                        dialogDoneButtonText='Hecho'
                        hideSearchBox = 'true'
                        label="Tipo de Usuario"
                        value={type.value}
                        onSelection={(value) => {
                            setType({
                                ...type,
                                value: value.text,
                                selectedList: value.selectedList,
                                error: '',
                            });
                        }}
                        arrayList={[...type.list]}
                        selectedArrayList={type.selectedList}
                        errorText={type.error}
                        multiEnable={false}
                        dialogTitleStyle={{ color: '#662D91' }}
                        checkboxColor="yellow"
                        checkboxLabelStyle={{ color: 'red', fontWeight: '700' }}
                        textInputBackgroundColor="yellow"
                        textInputColor="red"
                        outlineColor="black"
                        theme={{
                        colors: {
                            placeholder: 'black'
                        }
                        }}
                    />
                    <Button style={ loginStyle.login } loading={ loadingLogin } icon="account-arrow-right" mode="contained" 
                        onPress={(e) => {
                            e.preventDefault()
                            registration()
                        }}>
                        Crear Cuenta
                    </Button>
                    <Text variant="titleSmall">¿Ya tienes cuenta?</Text>
                    <Button style={ loginStyle.login } icon="login" mode="contained" 
                        onPress={(e) => {
                            e.preventDefault()
                            navigation.navigate('Login')
                        }}>
                        Entrar
                    </Button>
                </View>
            </View>
        </ScrollView>
        <Snackbar
            visible={snackbarVisible}
            onDismiss={onDismissSnackBar}
        >
            { snackbarMsg }
        </Snackbar>
        </>
    )
}

export default Register