import { Modal, Text } from "react-native-paper"
import { useSelector, useDispatch } from "react-redux"
import { setModalVisible } from '../../../store/slices/recetas/modalVisible.slice'
import { FormatDate } from "../../../utils/FormatDate"
import { View, StyleSheet } from "react-native"
import { useEffect, useState } from 'react'

const ModalReceta = ()=>{

    const [value, setValue] = useState(0)

    const dispatch = useDispatch()

    const visible = useSelector( state => state.modalVisible )
    const receta = useSelector( state => state.selectedReceta )

    const hideModal = ()=>{
        dispatch(setModalVisible(false))
    }

    const medicamentos = JSON.parse(receta.medicamentos)

    useEffect(()=>{
        const getResult = async()=>{
            const result = await medicamentos.reduce((acumulador, item) => {
                const res = ((item.costo * item.porcentaje / 100) * item.cantidad).toFixed(2)
                return acumulador + Number(res);
            }, 0)
            setValue(result)
        }
        getResult()
    },[receta])

    console.log(receta)

    const containerStyle = {backgroundColor: 'white', padding: 20, width:'90%', alignSelf:'center', gap:10};

    return(
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <Text style={{color:'silver'}}>Información de la receta</Text>
            <Text><Text style={{fontWeight:'bold'}}>N° Receta :</Text> { receta.numReceta }</Text>
            <Text><Text style={{fontWeight:'bold'}}>Fecha de Ingreso :</Text> { FormatDate(receta.fechaHora) }</Text>
            <Text><Text style={{fontWeight:'bold'}}>Estado :</Text> { receta.payStatus == 0 ? 'No Pagada' : 'Pagada' }</Text>
            <Text style={{color:'silver'}}>Detalle</Text>
            <Text style={{fontWeight:'bold'}}>Medicamentos :</Text>
            {
                medicamentos.map((element, index)=>{
                    const price = ((element.costo * element.porcentaje / 100) * element.cantidad).toFixed(2)
                    return(
                        <View key={index} style={styles.meds}>
                            <Text key={index+1}>- {element.nombre}</Text>
                            <Text key={index+2}>$ {price}</Text>
                        </View>
                    )
                })
            }
            <View style={styles.meds}>
                <Text style={{fontWeight:'bold'}}>Total</Text>
                <Text style={{fontWeight:'bold', color:'#52A665'}}>$ {value}</Text>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    meds:{
        flexDirection:'row',
        justifyContent:'space-between'
    }
})

export default ModalReceta