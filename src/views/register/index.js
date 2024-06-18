import { useState } from 'react'
import { Appbar, Snackbar } from 'react-native-paper'
import { View, StyleSheet, Text, KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import TextInputComponent from '../../components/TextInputComponent'
import ButtonComponent from '../../components/ButtonComponent'
import SelectItem from '../../components/SelectItem'
import ChipComponent from '../../components/ChipComponent'
import BrandsList from '../../components/BrandsList'
import MyBrands from '../../components/MyBrands'
import { useDispatch } from 'react-redux'
import registrationMiddleware from './registrationMiddleware'
import { setSelectedBrands } from '../../store/slices/register/selectedBrands.slice'

const Register = ({navigation})=>{

    const [snackbarVisible, setSnackbarVisible] = useState(false)
    const [snackbarMsg, setSnackbarMsg] = useState('')
    const [loadingLogin, setLoadingLogin] = useState(false)
    const [view, setView] = useState('index') 
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [telefono, setTelefono] = useState('')
    const [direccion, setDireccion] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [type, setType] = useState('')
    const [zones, setZones] = useState(["0"])

    const dispatch = useDispatch()

    const onDismissSnackBar = () => setSnackbarVisible(false)

    const registration = async() =>{
        if(name === '' || username === '' || telefono === '' || password === '' | repeatPassword === '' || type === ''){
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
            "direccion":direccion,
            "type": type,
        }
        const createUser = await registrationMiddleware(data)
        if(createUser){
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
                setType('')
                dispatch(setSelectedBrands([]))
            }, 2000)
        }
    }

    const UserType = ()=>{
        return(
            <>
                <View style={styles.header}>
                    <Text style={styles.title}>Yo soy un...</Text>
                    <Text style={styles.subtitle}>Elije que tipo de usuario eres</Text>
                </View>
                <View style={styles.formContainer}>
                    <View>
                        <SelectItem
                            selected={type === "1" && true}
                            title="Médico"
                            backgroundColor='transparent'
                            borderColor="#D7BDE2"
                            selectedColor='#662D91'
                            borderColorSelected='#662D91'
                            textColor='#FFF' 
                            textSelectedColor="#FFF"
                            onPress={()=> setType('1') }
                        >
                        </SelectItem>
                        <SelectItem
                            selected={type === "2" && true}
                            title="Visitador Médico" 
                            backgroundColor='transparent'
                            borderColor="#D7BDE2"
                            selectedColor='#662D91'
                            borderColorSelected='#662D91'
                            textColor='#FFF' 
                            textSelectedColor="#FFF"
                            onPress={()=> setType('2') }
                            >
                        </SelectItem>
                    </View>
                    <ButtonComponent 
                        title="Regresar" 
                        iconName="arrow-left"
                        color="silver"
                        textColor='#FFF'
                        borderColor="silver"
                        iconColor="#FFF"
                        onPress={() => setView('index') }
                    >
                    </ButtonComponent>
                    <ButtonComponent 
                        title="Siguiente" 
                        iconName="arrow-right"
                        color="#f69a23"
                        textColor='#FFF'
                        borderColor="#f69a23"
                        iconColor="#FFF"
                        onPress={() => {
                            if(type){
                                setView('brands')
                            }else{
                                setSnackbarMsg('Elije el tipo de usuario')
                                setSnackbarVisible(true)
                            }
                        } }
                    >
                    </ButtonComponent>
                </View>
            </>
        )
    }

    const Brands = ()=>{
        return(
            <>
                <View style={styles.header}>
                    <Text style={styles.title}>Marcas</Text>
                    <Text style={styles.subtitle}>Elije que las marcas con las que trabajas.</Text>
                </View>
                <MyBrands></MyBrands>
                <View style={styles.formContainer}>
                    <View>
                        <BrandsList></BrandsList>
                    </View>
                    <ButtonComponent
                        title="Regresar" 
                        iconName="arrow-left"
                        color="silver"
                        textColor='#FFF'
                        borderColor="silver"
                        iconColor="#FFF"
                        onPress={() => setView('type') }
                    >
                    </ButtonComponent>
                    <ButtonComponent 
                        title="Siguiente" 
                        iconName="arrow-right"
                        color="#f69a23"
                        textColor='#FFF'
                        borderColor="#f69a23"
                        iconColor="#FFF"
                        onPress={() => setView('zones')}
                    >
                    </ButtonComponent>
                </View>
            </>
        )
    }

    const Zones = ()=>{
        const getZone = (value)=>{
            if(zones.includes(value)){
                const newZones = zones.filter( ( element )=> element != value )
                console.log(newZones)
                setZones([...newZones])
            }else{
                setZones([...zones, value])
            }
        }
        return(
            <>
                <View style={styles.header}>
                    <Text style={styles.title}>Zonas</Text>
                    <Text style={styles.subtitle}>Elije tus zonas de trabajo</Text>
                </View>
                <View style={styles.formContainer}>
                    <View style={ styles.zones }>
                        <ChipComponent
                            selected={ zones.includes("1") }
                            title="Pedernales"
                            textColor="#FFF"
                            borderColorSelected="#FFF"
                            borderColor="#FFF"
                            backgroundColor="transparent"
                            selectedColor="#D7BDE2"
                            onPress={ ()=> getZone("1") }
                        >
                        </ChipComponent>
                        <ChipComponent
                            selected={ zones.includes("2") }
                            title="Manta"
                            textColor="#FFF"
                            borderColorSelected="#FFF"
                            borderColor="#FFF"
                            backgroundColor="transparent"
                            selectedColor="#D7BDE2"
                            onPress={ ()=> getZone("2") }
                        >
                        </ChipComponent>
                    </View>
                    <ButtonComponent 
                        title="Regresar" 
                        iconName="arrow-left"
                        color="silver"
                        textColor='#FFF'
                        borderColor="silver"
                        iconColor="#FFF"
                        onPress={() => setView('brands') }
                    >
                    </ButtonComponent>
                    <ButtonComponent 
                        title="Siguiente" 
                        iconName="arrow-right"
                        color="#f69a23"
                        textColor='#FFF'
                        borderColor="#f69a23"
                        iconColor="#FFF"
                        onPress={() => {
                            if(zones[1]){
                                setView('password')
                            }else{
                                setSnackbarMsg('Elije una zona de trabajo')
                                setSnackbarVisible(true)
                            }
                        } }
                    >
                    </ButtonComponent>
                </View>
            </>
        )
    }

    return(
        <>
        <Appbar.Header style={ styles.appbar }>
            <Appbar.BackAction color='#fff'  onPress={() => { navigation.navigate('Login') }} />
            <Appbar.Content color='#fff' title="Registrar" />
        </Appbar.Header>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={ styles.container }>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {
                    view === 'index' && 
                    <>
                        <View style={styles.header}>
                            <Text style={ styles.title }>Crear una cuenta</Text>
                            <Text style={ styles.subtitle }>Completa el formulario</Text>
                        </View>
                        <View style={ styles.formContainer }>
                            <TextInputComponent
                                val={name}
                                label="Nombres completos"
                                labelColor='silver'
                                color='#7A428D'
                                borderColor='#F2F3F4'
                                inputColor="#FFF"
                                onChange={ (e) => setName(e) }
                            />
                            <TextInputComponent
                                val={username}
                                label="Correo Eléctronico"
                                labelColor='silver'
                                color='#7A428D'
                                borderColor='#F2F3F4'
                                inputColor="#FFF"
                                onChange={ (e) => setUsername(e)}
                            />
                            <TextInputComponent
                                val={telefono}
                                label="Teléfono"
                                labelColor='silver'
                                color='#7A428D'
                                borderColor='#F2F3F4'
                                inputColor="#FFF"
                                onChange={ (e) => setTelefono(e)}
                            />
                            <TextInputComponent
                                val={direccion}
                                label="Dirección"
                                labelColor='silver'
                                color='#7A428D'
                                borderColor='#F2F3F4'
                                inputColor="#FFF"
                                onChange={ (e) => setDireccion(e)}
                            />
                            <ButtonComponent 
                                title="Siguiente" 
                                iconName="arrow-right"
                                color="#f69a23"
                                textColor='#FFF'
                                borderColor="#f69a23"
                                iconColor="#FFF"
                                onPress={() => {
                                    if(name && username && telefono && direccion){
                                        setView('type')
                                    }else{
                                        setSnackbarMsg('Los campos no deben estar vacíos')
                                        setSnackbarVisible(true)
                                    }
                                }}
                            >
                            </ButtonComponent>
                        </View>
                    </>
                }
                {
                    view === 'type' && <UserType></UserType>
                }
                {
                    view === 'brands' && <Brands></Brands>
                }
                {
                    view === 'zones' && <Zones></Zones>
                }
                {
                    view === 'password' && 
                    <>
                        <View style={styles.header}>
                            <Text style={styles.title}>Contraseña</Text>
                            <Text style={styles.subtitle}>Establece una contraseña</Text>
                        </View>
                        <View style={styles.formContainer}>
                            <TextInputComponent
                                label="Contraseña"
                                labelColor='silver'
                                secureTextEntry={true}
                                color='#7A428D'
                                borderColor='#F2F3F4'
                                inputColor="#FFF"
                                onChange={ (e) => setPassword(e)}
                            />
                            <TextInputComponent
                                label="Repite Contraseña"
                                labelColor='silver'
                                secureTextEntry={true}
                                color='#7A428D'
                                borderColor='#F2F3F4'
                                inputColor="#FFF"
                                onChange={ (e) => setRepeatPassword(e)}
                            />
                            <ButtonComponent 
                                title="Regresar" 
                                iconName="arrow-left"
                                secureTextEntry={true}
                                color="silver"
                                textColor='#FFF'
                                borderColor="silver"
                                iconColor="#FFF"
                                onPress={() => setView('zones') }
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
                                        setSnackbarMsg('Escribe una contraseña.')
                                        setSnackbarVisible(true)
                                        return
                                    }
                                    if(password != repeatPassword){
                                        setSnackbarMsg('Las contraseñas no coinciden.')
                                        setSnackbarVisible(true)
                                        return
                                    }else{
                                        registration()
                                    }
                                } }
                            >
                            </ButtonComponent>
                        </View>
                    </>
                }
            </ScrollView>
        </KeyboardAvoidingView>
        <Snackbar
            visible={snackbarVisible}
            onDismiss={onDismissSnackBar}
        >
            { snackbarMsg }
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

export default Register