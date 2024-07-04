import { ScrollView, View, Text, StyleSheet, Dimensions } from "react-native"
import { List, Appbar, Icon } from "react-native-paper"
import homeStyle from "../../../assets/styles/home"
import axios from "axios"
import { useEffect, useState } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage"
import YearSelector from "./components/YearSelector"
import SelectDoctor from "./components/SelectDoctor"
import { useSelector, useDispatch } from "react-redux"
import { setRecetaUser } from "../../store/slices/recetas/recetaUser.slice"
import NoResults from "./components/NoResults"

const RecetasSelect = ({ navigation })=>{

    const [user, setUser] = useState({})
    const [months, setMonths] = useState([])
    const dispatch = useDispatch()
    const selectedUser = useSelector(state=> state.recetaUser)
    const year = useSelector(state=> state.recetaYear)

    const [visible, setVisible] = useState(false)

    useEffect(()=>{
        const init = async()=>{
            const userLogged = await AsyncStorage.getItem('user')
            const parsedUser = JSON.parse(userLogged)
            setUser(parsedUser)
            dispatch(setRecetaUser(parsedUser))
        }
        init()
    },[])

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

    return(
        <View style={ { flex:1 } }>
            <Appbar.Header style={ homeStyle.appbar }>
                <Appbar.Action icon="menu" iconColor='#fff' onPress={() => { navigation.openDrawer() }} />
                <View style={ { flex:1 } }>
                    <Text style={ { color:'#FFF', fontSize:24 } }>Recetas</Text>
                    {
                        user.type == 10 && <Text style={ { color:'#FFF', fontSize:10 } }>{selectedUser.name ? selectedUser.name : 'Selecciona un doctor'}</Text>
                    }
                </View>
                {
                    user.type == 10 &&
                    <Appbar.Action iconColor='#fff' icon="doctor" 
                        style={{right:0}}
                        onPress={() => { setVisible(true) }} 
                    />
                }
                {
                    user.type == 10 &&
                    <Appbar.Action iconColor='#fff' icon="note-plus" 
                        style={{right:0}}
                        onPress={() => { navigation.navigate('AddReceta', { navigation: navigation }) }} 
                    />
                }
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
                                            navigation.navigate('Recetas', { navigation: navigation, monthTitle: monthsText[month.month], month: monthsNums[month.month] }) 
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
            <SelectDoctor visible={visible} setVisible={setVisible}></SelectDoctor>
        </View>
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

export default RecetasSelect