import { Modal, Text } from "react-native-paper"
import { TextInput, Button } from "react-native"
import { useState } from 'react'

const ModalCantidad = ({ medicamentos, setMedicamentos, modalData, visible, hideModal })=>{

    const [cantidad, setCantidad] = useState(null)

    const containerStyle = {backgroundColor: 'white', padding: 20, width:'90%', alignSelf:'center', gap:10};

    return(
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <Text>{ modalData.PRODUCTO }</Text>
            <TextInput
                style={{ borderWidth:0.5, padding:5 }}
                onChangeText={(value)=> setCantidad(value)}
                placeholder="Cantidad"
                keyboardType="numeric"
                value={cantidad}
            />
            <Button
                title="Confirmar"
                onPress={ ()=>{
                    setCantidad(null)
                    setMedicamentos(
                        [
                            ...medicamentos,
                            {
                                id_producto: modalData.CODIGO,
                                nombre: modalData.PRODUCTO,
                                // costo: modalData.costo,
                                // porcentaje: modalData.porcentaje,
                                cantidad: cantidad
                            }
                        ]
                    )
                    hideModal()
                }}
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
        </Modal>
    )
}

export default ModalCantidad