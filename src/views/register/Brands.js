import { Appbar, Snackbar } from 'react-native-paper'
import { View, StyleSheet, Text, KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import ButtonComponent from '../../components/ButtonComponent'
import BrandsList from '../../components/BrandsList'
import MyBrands from '../../components/MyBrands'
import { setSnackbar } from '../../store/slices/info/snackbar.slice'
import { useSelector, useDispatch } from 'react-redux'

const Brands = ({navigation})=>{

    const snackbar = useSelector(state => state.snackbar)
    const dispatch = useDispatch()

    return(
        <>
            <Appbar.Header style={ styles.appbar }>
                <Appbar.BackAction color='#fff'  onPress={() => { navigation.navigate('UserType') }} />
                <Appbar.Content color='#fff' title="Volver a UserType" />
            </Appbar.Header>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={ styles.container }>
                <ScrollView contentContainerStyle={styles.scrollView}>
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
                            onPress={() => navigation.navigate('UserType') }
                        >
                        </ButtonComponent>
                        <ButtonComponent 
                            title="Siguiente" 
                            iconName="arrow-right"
                            color="#f69a23"
                            textColor='#FFF'
                            borderColor="#f69a23"
                            iconColor="#FFF"
                            onPress={() => navigation.navigate('Zones')}
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

export default Brands