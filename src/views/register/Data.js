import { useSelector, useDispatch } from 'react-redux'
import { Appbar, Snackbar } from 'react-native-paper'
import { View, StyleSheet, Text, KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import TextInputComponent from '../../components/TextInputComponent'
import ButtonComponent from '../../components/ButtonComponent'
import { setSnackbar } from '../../store/slices/info/snackbar.slice'
import { setData } from '../../store/slices/register/data.slice'

const Data = ({navigation})=>{

    const data = useSelector(state => state.data)
    const snackbar = useSelector(state => state.snackbar)
    const dispatch = useDispatch()

    return(
        <>
            <Appbar.Header style={ styles.appbar }>
                <Appbar.BackAction color='#fff'  onPress={() => { navigation.navigate('Login') }} />
                <Appbar.Content color='#fff' title="Volver al Login" />
            </Appbar.Header>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={ styles.container }>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.header}>
                        <Text style={ styles.title }>Crear una cuenta</Text>
                        <Text style={ styles.subtitle }>Completa el formulario</Text>
                    </View>
                    <View style={ styles.formContainer }>
                        <TextInputComponent
                            val={data.name}
                            label="Nombres completos"
                            labelColor='silver'
                            color='#7A428D'
                            borderColor='#F2F3F4'
                            inputColor="#FFF"
                            onChange={ (e) => dispatch(setData({
                                name: e,
                                username: data.username,
                                telefono: data.telefono,
                                direccion: data.direccion
                            })) }
                        />
                        <TextInputComponent
                            val={data.username}
                            label="Correo Eléctronico"
                            labelColor='silver'
                            color='#7A428D'
                            borderColor='#F2F3F4'
                            inputColor="#FFF"
                            onChange={ (e) => dispatch(setData({
                                name: data.name,
                                username: e,
                                telefono: data.telefono,
                                direccion: data.direccion
                            })) }
                        />
                        <TextInputComponent
                            val={data.telefono}
                            label="Teléfono"
                            labelColor='silver'
                            color='#7A428D'
                            borderColor='#F2F3F4'
                            inputColor="#FFF"
                            onChange={ (e) => dispatch(setData({
                                name: data.name,
                                username: data.username,
                                telefono: e,
                                direccion: data.direccion
                            })) }
                        />
                        <TextInputComponent
                            val={data.direccion}
                            label="Dirección"
                            labelColor='silver'
                            color='#7A428D'
                            borderColor='#F2F3F4'
                            inputColor="#FFF"
                            onChange={ (e) => dispatch(setData({
                                name: data.name,
                                username: data.username,
                                telefono: data.telefono,
                                direccion: e
                            })) }
                        />
                        <ButtonComponent 
                            title="Siguiente" 
                            iconName="arrow-right"
                            color="#f69a23"
                            textColor='#FFF'
                            borderColor="#f69a23"
                            iconColor="#FFF"
                            onPress={() => {
                                if(data.name && data.username && data.telefono && data.direccion){
                                    navigation.navigate('UserType')
                                }else{
                                    dispatch(setSnackbar([true, "Los campos no deben estar vacíos"]))
                                }
                            }}
                        >
                        </ButtonComponent>
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

export default Data