import { ScrollView, View } from "react-native"
import { List, Appbar } from "react-native-paper"
import homeStyle from "../../assets/styles/home"
import axios from "axios"
import { useEffect, useState } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage"

const RecetasSelect = ({ navigation })=>{

    const [enero, setEnero] = useState(false)
    const [febrero, setFebrero] = useState(false)
    const [marzo, setMarzo] = useState(false)
    const [abril, setAbril] = useState(false)
    const [mayo, setMayo] = useState(false)
    const [junio, setJunio] = useState(false)
    const [julio, setJulio] = useState(false)
    const [agosto, setAgosto] = useState(false)
    const [septiembre, setSeptiembre] = useState(false)
    const [octubre, setOctubre] = useState(false)
    const [noviembre, setNoviembre] = useState(false)
    const [diciembre, setDiciembre] = useState(false)

    useEffect(()=>{
        const getMonths = async()=>{
            const userLogged = await AsyncStorage.getItem('user')
            const parsedUser = JSON.parse(userLogged)
            const months = ["01","02","03","04","05","06","07","08","09","10","11","12"]
            const year = "2024"

            if( parsedUser.type == 1 ){
                console.log("doctor")
                months.map((month)=>{
                    axios.get(`${process.env.EXPO_PUBLIC_API_URL}/recetas/getByMonthUser/?month=${month}&year=${year}&id=${parsedUser.idusers}`)
                    .then( response => {
                        console.log(response.data)
                        response.data[0].count > 0 && month == "01" && setEnero(true)
                        response.data[0].count > 0 && month == "02" && setFebrero(true)
                        response.data[0].count > 0 && month == "03" && setMarzo(true)
                        response.data[0].count > 0 && month == "04" && setAbril(true)
                        response.data[0].count > 0 && month == "05" && setMayo(true)
                        response.data[0].count > 0 && month == "06" && setJunio(true)
                        response.data[0].count > 0 && month == "07" && setJulio(true)
                        response.data[0].count > 0 && month == "08" && setAgosto(true)
                        response.data[0].count > 0 && month == "09" && setSeptiembre(true)
                        response.data[0].count > 0 && month == "10" && setOctubre(true)
                        response.data[0].count > 0 && month == "11" && setNoviembre(true)
                        response.data[0].count > 0 && month == "12" && setDiciembre(true)
                    })
                    .catch( error => console.log( error ) )
                })
            }else{
                console.log("admin")
                months.map((month)=>{
                    axios.get(`${process.env.EXPO_PUBLIC_API_URL}/recetas/getByMonth/?month=${month}&year=${year}`)
                    .then( response => {
                        console.log([month, response.data])
                        response.data[0].count > 0 && month == "01" && setEnero(true)
                        response.data[0].count > 0 && month == "02" && setFebrero(true)
                        response.data[0].count > 0 && month == "03" && setMarzo(true)
                        response.data[0].count > 0 && month == "04" && setAbril(true)
                        response.data[0].count > 0 && month == "05" && setMayo(true)
                        response.data[0].count > 0 && month == "06" && setJunio(true)
                        response.data[0].count > 0 && month == "07" && setJulio(true)
                        response.data[0].count > 0 && month == "08" && setAgosto(true)
                        response.data[0].count > 0 && month == "09" && setSeptiembre(true)
                        response.data[0].count > 0 && month == "10" && setOctubre(true)
                        response.data[0].count > 0 && month == "11" && setNoviembre(true)
                        response.data[0].count > 0 && month == "12" && setDiciembre(true)
                    })
                    .catch( error => console.log( error ) )
                })
            }     
        }
        getMonths()
    },[])

    return(
        <View style={ { flex:1 } }>
            <Appbar.Header style={ homeStyle.appbar }>
                <Appbar.Action icon="menu" iconColor='#fff' onPress={() => { navigation.openDrawer() }} />
                <Appbar.Content color='#fff' title="Recetas" />
                <Appbar.Action iconColor='#fff' icon="note-plus" 
                    onPress={() => { navigation.navigate('AddReceta', { navigation: navigation }) }} 
                />
            </Appbar.Header>
            <ScrollView>
                <List.Section style>
                    <List.Subheader>Selecciona el mes</List.Subheader>
                    { enero && <List.Item title="Enero" onPress={()=> navigation.navigate('Recetas', { navigation: navigation, monthTitle: "Enero", month: "01" }) } left={() => <List.Icon color="#F0D300" icon="folder"  />} />}
                    { febrero && <List.Item title="Febrero" onPress={()=> navigation.navigate('Recetas', { navigation: navigation, monthTitle: "Febrero", month: "02" }) } left={() => <List.Icon color="#F0D300" icon="folder" />} />}
                    { marzo && <List.Item title="Marzo" onPress={()=> navigation.navigate('Recetas', { navigation: navigation, monthTitle: "Marzo", month: "03" }) } left={() => <List.Icon color="#F0D300" icon="folder" />} />}
                    { abril && <List.Item title="Abril" onPress={()=> navigation.navigate('Recetas', { navigation: navigation, monthTitle: "Abril", month: "04" }) } left={() => <List.Icon color="#F0D300" icon="folder" />} />}
                    { mayo && <List.Item title="Mayo" onPress={()=> navigation.navigate('Recetas', { navigation: navigation, monthTitle: "Mayo", month: "05" }) } left={() => <List.Icon color="#F0D300" icon="folder" />} />}
                    { junio && <List.Item title="Junio" onPress={()=> navigation.navigate('Recetas', { navigation: navigation, monthTitle: "Junio", month: "06" }) } left={() => <List.Icon color="#F0D300" icon="folder" />} />}
                    { julio && <List.Item title="Julio" onPress={()=> navigation.navigate('Recetas', { navigation: navigation, monthTitle: "Julio", month: "07" }) } left={() => <List.Icon color="#F0D300" icon="folder" />} />}
                    { agosto && <List.Item title="Agosto" onPress={()=> navigation.navigate('Recetas', { navigation: navigation, monthTitle: "Agosto", month: "08" }) } left={() => <List.Icon color="#F0D300" icon="folder" />} />}
                    { septiembre && <List.Item title="Septiembre" onPress={()=> navigation.navigate('Recetas', { navigation: navigation, monthTitle: "Septiembre", month: "09" }) } left={() => <List.Icon color="#F0D300" icon="folder" />} />}
                    { octubre && <List.Item title="Octubre" onPress={()=> navigation.navigate('Recetas', { navigation: navigation, monthTitle: "Octubre", month: "10" }) } left={() => <List.Icon color="#F0D300" icon="folder" />} />}
                    { noviembre && <List.Item title="Noviembre" onPress={()=> navigation.navigate('Recetas', { navigation: navigation, monthTitle: "Noviembre", month: "11" }) } left={() => <List.Icon color="#F0D300" icon="folder" />} />}
                    { diciembre && <List.Item title="Diciembre" onPress={()=> navigation.navigate('Recetas', { navigation: navigation, monthTitle: "Diciembre", month: "12" }) } left={() => <List.Icon color="#F0D300" icon="folder" />} />}
                </List.Section>
            </ScrollView>
        </View>
    )
}

export default RecetasSelect