import { Modal, RadioButton, Text } from "react-native-paper"
import { useSelector, useDispatch } from "react-redux"
import { setModalZone } from "../../../store/slices/zonas/modalZone.slice"
import { View, StyleSheet } from "react-native"
import { setSelectBodega } from "../../../store/slices/zonas/selectBodega.slice"
import { setMyZone } from "../../../store/slices/zonas/myZone.slice"
import { useState, useEffect } from 'react' 
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"

const ModalZone = ()=>{

    const visible = useSelector( state => state.modalZone )
    const [checked, setChecked] = useState('')
    const [bodegas, setBodegas] = useState([])
    const dispatch = useDispatch()

    function replace(texto) {
        texto = texto.replace(/\[/g, '(');
        texto = texto.replace(/\]/g, ')');
        return texto;
    }

    useEffect(()=>{
        const getMyZones = async()=>{
            const token = await AsyncStorage.getItem('token')
            const user = await AsyncStorage.getItem('user')
            const parsedUser = JSON.parse(user)
            const zones = replace(parsedUser.zones)
            await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/zones/getMyZones?zones=${zones}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                  } 
                })
            .then( response => {
                dispatch(setMyZone(response.data[0].name))
                setChecked(response.data[0].name)
                setBodegas(response.data)
            })
            .catch( error => console.log( error ) )
        }
        getMyZones()
    },[])

    const hideModal = ()=>{
        dispatch(setModalZone(false))
    }

    const containerStyle = {backgroundColor: 'white', padding: 20, width:'90%', alignSelf:'center', gap:10};

    return(
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <Text style={styles.title}>Filtro de Stock por zona</Text>
            {
                bodegas.map((bodega, index)=>{
                    return(
                        <View key={index} style={styles.item}>
                            <Text>{bodega.name}</Text>
                            <RadioButton
                                value={bodega.name}
                                status={ checked === bodega.name ? 'checked' : 'unchecked' }
                                onPress={() => {
                                    setChecked(bodega.name)
                                    dispatch(setMyZone(bodega.name))
                                    dispatch(setSelectBodega(JSON.parse(bodega.bodega))) 
                                }}
                            />
                        </View>
                    )
                })
            }
        </Modal>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    title:{
        fontWeight:'bold',
        fontSize:18
    }
})

export default ModalZone