import { Appbar, Snackbar } from 'react-native-paper'
import { View, StyleSheet, Text, KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import ButtonComponent from '../../components/ButtonComponent'
import ChipComponent from '../../components/ChipComponent'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedZones } from '../../store/slices/register/selectedZones.slice'
import { setSnackbar } from '../../store/slices/info/snackbar.slice'
import { useEffect } from 'react'
import { getZonesThunk } from '../../store/slices/register/zones.slice'

const Zones = ({navigation})=>{
    
    const zones = useSelector(state => state.zones)
    const selectedZones = useSelector(state => state.selectedZones)
    const snackbar = useSelector(state => state.snackbar)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getZonesThunk())
    },[])

    const getZone = (value)=>{
        if(selectedZones.includes(value)){
            const newZones = selectedZones.filter( ( element )=> element != value )
            dispatch(setSelectedZones([...newZones]))
        }else{
            dispatch(setSelectedZones([...selectedZones, value]))
        }
    }

    return(
        <>
            <Appbar.Header style={ styles.appbar }>
                <Appbar.BackAction color='#fff'  onPress={() => { navigation.navigate('Brands') }} />
                <Appbar.Content color='#fff' title="Volver a Laboratorios"/>
            </Appbar.Header>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={ styles.container }>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Zonas</Text>
                        <Text style={styles.subtitle}>Elije tus zonas de trabajo</Text>
                    </View>
                    <View style={styles.formContainer}>
                        <View style={ styles.zones }>
                            {
                                zones.map((element, index)=>{
                                    return(
                                        <ChipComponent
                                            key={index}
                                            selected={ selectedZones.includes(element.idzonas) }
                                            title={element.name}
                                            textColor="#FFF"
                                            borderColorSelected="#FFF"
                                            borderColor="#FFF"
                                            backgroundColor="transparent"
                                            selectedColor="#D7BDE2"
                                            onPress={ ()=> getZone(element.idzonas) }
                                        >
                                        </ChipComponent>
                                    )
                                })
                            }
                        </View>
                        <ButtonComponent 
                            title="Regresar" 
                            iconName="arrow-left"
                            color="silver"
                            textColor='#FFF'
                            borderColor="silver"
                            iconColor="#FFF"
                            onPress={() => navigation.navigate('Brands') }
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
                                    navigation.navigate('Password')
                                }else{
                                    dispatch(setSnackbar([true, "Elije una zona de trabajo"]))
                                }
                            } }
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

export default Zones