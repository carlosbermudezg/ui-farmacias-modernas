import { View, Text, StyleSheet } from "react-native"
import { Appbar, List, Icon } from "react-native-paper"
import { useSelector } from "react-redux"
import SelectDoctorR from "./components/SelectDoctorR"
import YearSelector from "../recetas/components/YearSelector"
import { useState, useEffect } from 'react'
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import NoResults from "../recetas/components/NoResults"

const RendimientoMedico = ({ navigation, route })=>{

    const selectedUser = useSelector(state=> state.userRendimiento)
    const year = useSelector(state=> state.recetaYear)
    const [doctorVisible, setDoctorVisible] = useState(false)
    const [months, setMonths] = useState([])

    useEffect(()=>{
        const getMonths = async()=>{
            const token = await AsyncStorage.getItem('token')
            await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/recetas/getByMonthUser/?year=${year}&id=${selectedUser.idusers}`, { 
                headers: {
                    Authorization: `Bearer ${token}`
                  } 
                })
            .then( response => {
                setMonths(response.data)
            })
            .catch( error => console.log( error ) )
        }
        getMonths()
    },[selectedUser, year])

    console.log(months)

    return(
        <>
        <Appbar.Header style={ { backgroundColor:'#662D91' } }>
            <Appbar.Action icon="menu" iconColor='#fff' onPress={() => { navigation.openDrawer() }} />
            <View style={ { flex:1 } }>
                <Text style={ { color:'#FFF', fontSize:18 } }>Rendimiento</Text>
                {
                    <Text style={ { color:'#FFF', fontSize:10 } }>{selectedUser.name ? selectedUser.name : 'Selecciona un doctor'}</Text>
                }
            </View>
            <Appbar.Action iconColor='#fff' icon="doctor" 
                style={{right:0}}
                onPress={() => { setDoctorVisible(true) }} 
            />
        </Appbar.Header>
        <YearSelector></YearSelector>
        {
                months.length == 0 ? 
                <View style={styles.noResults}>
                    <NoResults></NoResults>
                </View>
                :
                <View style={styles.container}>
                    <List.Section style={ styles.listContainer }>
                        {
                            months.map( (month, index) =>{
                                const monthsText = [0, "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
                                const monthsNums = [0, "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
                                return(
                                    <List.Item 
                                        key={index}
                                        style={ styles.listItem }
                                        title={monthsText[month.month]}
                                        description={`${month.count} ${month.count > 1 ? 'recetas': 'receta'}`}
                                        onPress={()=> 
                                            navigation.navigate('RendimientoMes', { navigation: navigation, monthTitle: monthsText[month.month], month: monthsNums[month.month] }) 
                                        }
                                        left={() => 
                                            <Icon
                                                source="folder"
                                                color="#F0D300"
                                                size={48}
                                            />
                                        }  
                                    />
                                )
                            } )
                        }
                    </List.Section>
                </View>
            }
        <SelectDoctorR visible={doctorVisible} setVisible={setDoctorVisible}></SelectDoctorR>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
    },
    noResults:{
        justifyContent:'center',
        flex:1,
        alignItems:'center',
    },
    listContainer: {
        width: '95%',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-between',
        alignItems:'center',
        gap:5,
    },
    listItem: {
        width:160,
        height:70,
        borderWidth:1,
        borderColor:'silver',
        borderRadius:5
    }
})

export default RendimientoMedico