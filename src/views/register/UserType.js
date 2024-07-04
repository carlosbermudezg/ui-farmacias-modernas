import { Appbar, Snackbar } from 'react-native-paper'
import { View, StyleSheet, Text, KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import SelectItem from '../../components/SelectItem'
import ButtonComponent from '../../components/ButtonComponent'
import { useSelector, useDispatch } from 'react-redux'
import { setSnackbar } from '../../store/slices/info/snackbar.slice'
import { setUserType } from '../../store/slices/register/userType.slice'

const UserType = ({navigation})=>{

    const type = useSelector(state => state.userType)
    const snackbar = useSelector(state => state.snackbar)
    const dispatch = useDispatch()

    return(
        <>
            <Appbar.Header style={ styles.appbar }>
                <Appbar.BackAction color='#fff'  onPress={() => { navigation.navigate('Data') }} />
                <Appbar.Content color='#fff' title="Volver a Datos" />
            </Appbar.Header>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={ styles.container }>
                <ScrollView contentContainerStyle={styles.scrollView}>
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
                                selectedColor='#E74C3C'
                                borderColorSelected='#E74C3C'
                                textColor='#FFF' 
                                textSelectedColor="#FFF"
                                onPress={()=> dispatch(setUserType('1')) }
                            >
                            </SelectItem>
                            <SelectItem
                                selected={type === "2" && true}
                                title="Visitador Médico" 
                                backgroundColor='transparent'
                                borderColor="#D7BDE2"
                                selectedColor='#E74C3C'
                                borderColorSelected='#E74C3C'
                                textColor='#FFF' 
                                textSelectedColor="#FFF"
                                onPress={()=> dispatch(setUserType('2')) }
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
                            onPress={() => navigation.navigate('Data') }
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
                                    navigation.navigate('Brands')
                                }else{
                                    dispatch(setSnackbar(true, "Elije el tipo de usuario"))
                                }
                            } }
                        >
                        </ButtonComponent>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <Snackbar
                visible={snackbar[0]}
                onDismiss={()=> dispatch(setSnackbar([false, ""]))}
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

export default UserType