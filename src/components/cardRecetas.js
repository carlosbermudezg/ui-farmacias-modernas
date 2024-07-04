import { View, StyleSheet, Image } from "react-native"
import { Text, Icon, TouchableRipple } from "react-native-paper"
import { FormatDate } from "../utils/FormatDate"
import { useState, useEffect } from 'react'
import { useDispatch } from "react-redux"
import { setSelectedReceta } from '../store/slices/recetas/selectedReceta.slice'
import { setModalVisible } from "../store/slices/recetas/modalVisible.slice"


const CardRecetas = ({ receta }) => {
    
    const dispatch = useDispatch()

    const showModal = ()=>{
        dispatch(setSelectedReceta(receta))
        dispatch(setModalVisible(true))
    }

    const [value, setValue] = useState(0)
    const items = JSON.parse(receta.medicamentos) 

    useEffect(()=>{
        const getResult = async()=>{
            const result = await items.reduce((acumulador, item) => {
                const res = ((item.costo * item.porcentaje / 100) * item.cantidad).toFixed(2)
                return acumulador + Number(res);
            }, 0)
            setValue(result)
        }
        getResult()
    },[])

    return(
        <TouchableRipple
            style={styles.wrap}
            onPress={()=> showModal()}
        >
            <View style={ styles.container }>
                <View style={styles.icon}>
                    {/* {
                        receta.image != '' ? 
                            <Image source={{ uri: receta.image }} style={{ width: 40, height: 40 }} /> 
                            : 
                            <Icon
                                source="file-document-outline"
                                color='silver'
                                size={40}
                            /> 
                    } */}
                    <Icon
                        source="file-document-outline"
                        color='silver'
                        size={40}
                    />
                </View>
                <View style={ styles.info }>
                    <Text style={ { fontWeight:'bold' } } numberOfLines={3}>
                        N° Receta: { receta.numReceta }
                    </Text>
                    <Text>
                        {`Fecha de Ingreso: ${FormatDate(receta.fechaHora)}`}
                    </Text>
                    <Text>
                        Estado: {receta.payStatus == 0 ? 'No pagada' : 'Pagada'}
                    </Text>
                </View>
                <View style={styles.price}>
                    <Text style={styles.priceText}>$ {value}</Text>
                </View>
            </View>
        </TouchableRipple>
    )
}

const styles = StyleSheet.create({
    wrap:{
        margin:2,
        borderWidth:0.5,
        borderColor:'silver',
        borderRadius:5
    },
    container : {
        flexDirection:'row',
        gap:5,
        height:80
    },
    icon : {
        width:'15%',
        justifyContent:'center',
        alignItems:'center'
    },
    info : {
        width:'68%',
        justifyContent:'center'
    },
    price : {
        width:'15%',
        justifyContent:'center',
        alignItems:'center'
    },
    priceText:{
        color:'#A537ED'
    },
    iconText : { 
        color:'#FFF', 
        fontSize: 10
    }
})

export default CardRecetas