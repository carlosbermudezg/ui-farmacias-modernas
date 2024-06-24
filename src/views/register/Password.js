import { Appbar, Snackbar } from 'react-native-paper'
import { View, StyleSheet, Text, KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import TextInputComponent from '../../components/TextInputComponent'
import ButtonComponent from '../../components/ButtonComponent'
import { setSnackbar } from '../../store/slices/info/snackbar.slice'
import { setData } from '../../store/slices/register/data.slice'
import { setUserType } from '../../store/slices/register/userType.slice'
import { setSelectedBrands } from '../../store/slices/register/selectedBrands.slice'
import { setSelectedZones } from '../../store/slices/register/selectedZones.slice'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import register from './register'
import Loading from '../../components/Loading'

const Password = ({navigation})=>{

    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const data = useSelector(state => state.data)
    const type = useSelector(state => state.userType)
    const selectedBrands = useSelector(state => state.selectedBrands)
    const selectedZones = useSelector(state => state.selectedZones)

    const snackbar = useSelector(state => state.snackbar)
    const dispatch = useDispatch()

    const registration = async() =>{
        setDisabled(true)
        setLoading(true)
        const user = {
            "name": data.name,
            "username": data.username,
            "password": password,
            "telefono": data.telefono,
            "direccion": data.direccion,
            "type": type,
            "brands": JSON.stringify(selectedBrands),
            "zones": JSON.stringify(selectedZones)
        }
        const createUser = await register(user)
        if(createUser){
            setTimeout(()=>{
                dispatch(setSnackbar([true, 'El usuario ha sido registrado, Ahora debe esperar a ser admitido por el Administrador']))
                dispatch(setData({
                    name: '',
                    username: '',
                    telefono: '',
                    direccion: ''
                  }))
                dispatch(setSelectedBrands([]))
                dispatch(setSelectedZones(["0"]))
                dispatch(setUserType(''))
                setPassword('')
                setRepeatPassword('')
                setDisabled(false)
                setLoading(false)
            }, 2000)
            setTimeout(()=>{
                navigation.navigate('Login')
            },4000)
        }
    }

    return(
        <>
            <Appbar.Header style={ styles.appbar }>
                <Appbar.BackAction color='#fff'  onPress={() => { navigation.navigate('Zones') }} />
                <Appbar.Content color='#fff' title="Volver a Zonas" />
            </Appbar.Header>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={ styles.container }>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.header}>
                                <Text style={styles.title}>Contraseña</Text>
                                <Text style={styles.subtitle}>Establece una contraseña</Text>
                    </View>
                    <View style={styles.formContainer}>
                        <TextInputComponent
                            label="Contraseña"
                            labelColor='silver'
                            readOnly={disabled}
                            secureTextEntry={true}
                            color='#7A428D'
                            borderColor='#F2F3F4'
                            inputColor="#FFF"
                            onChange={ (e) => setPassword(e)}
                        />
                        <TextInputComponent
                            label="Repite Contraseña"
                            labelColor='silver'
                            readOnly={disabled}
                            secureTextEntry={true}
                            color='#7A428D'
                            borderColor='#F2F3F4'
                            inputColor="#FFF"
                            onChange={ (e) => setRepeatPassword(e)}
                        />
                        {
                            loading ? <Loading color="#BB8FCE"></Loading> :
                            <>
                                <ButtonComponent 
                                    title="Regresar" 
                                    iconName="arrow-left"
                                    secureTextEntry={true}
                                    color="silver"
                                    textColor='#FFF'
                                    borderColor="silver"
                                    iconColor="#FFF"
                                    onPress={() => navigation.navigate('Zones') }
                                >
                                </ButtonComponent>
                                <ButtonComponent 
                                    title="Crear Cuenta" 
                                    iconName="account"
                                    color="#f69a23"
                                    textColor='#FFF'
                                    borderColor="#f69a23"
                                    iconColor="#FFF"
                                    onPress={() => {
                                        if(!password){
                                            dispatch(setSnackbar([true, "Escribe una contraseña."]))
                                            return
                                        }
                                        if(password != repeatPassword){
                                            dispatch(setSnackbar([true, "Las contraseñas no coinciden."]))
                                            return
                                        }else{
                                            registration()
                                        }
                                    } }
                                >
                                </ButtonComponent>
                            </>
                        }
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <Snackbar
                visible={snackbar[0]}
                onDismiss={()=> dispatch(setSnackbar([false, ""])) }
            >
                { snackbar[1] }
            </Snackbar>
        </>
    )
}

const styles = StyleSheet.create({
    appbar: {
        height: 60,
        color: '#fff',
        backgroundColor:'#7A428D',
        zIndex:10
    },
    container:{
        flex:1,
        backgroundColor:'#7A428D'
    },
    zones:{
        flexDirection:'row', 
        flexWrap:'wrap', 
        gap:10,
        justifyContent:'center'
    },
    zones_buttons:{
    },
    scrollView: {
        flexGrow: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    header:{
        justifyContent:'center',
        alignItems:'center',
        marginBottom:30,
    },
    title:{
        color:'#FFF',
        fontSize:30,
    },
    subtitle:{
        color:'#FFF',
        fontSize:14
    },
    formContainer: {
        width:'80%',
        gap:10,
        justifyContent:'center'
    }
})

export default Password