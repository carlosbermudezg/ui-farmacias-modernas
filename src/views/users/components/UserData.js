import { View, StyleSheet, Text } from "react-native"
import TextInputComponent from "../../../components/TextInputComponent"
import { useDispatch, useSelector } from "react-redux"
import { setData } from "../../../store/slices/register/data.slice"
import { useEffect } from 'react'

const UserData = () => {

    const data = useSelector( state => state.data )
    const user = useSelector( state => state.editUser )
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(setData({
            name: user.name,
            username: user.username,
            telefono: user.telefono,
            direccion: user.direccion
        }))
    },[])

    return(
        <View style={ styles.container }>
            <Text style={styles.title}>Datos de usuario</Text>
            <TextInputComponent
                val={data.name}
                label="Nombres completos"
                labelColor='#7A428D'
                color='#FFF'
                borderColor='silver'
                inputColor="#000"
                onChange={ (e) => dispatch(setData({
                    name: e,
                    username: data.username,
                    telefono: data.telefono,
                    direccion: data.direccion
                })) }
            />
            <TextInputComponent
                val={data.username}
                label="Correo Eléctronico"
                labelColor='#7A428D'
                color='#FFF'
                borderColor='silver'
                inputColor="#000"
                onChange={ (e) => dispatch(setData({
                    name: data.name,
                    username: e,
                    telefono: data.telefono,
                    direccion: data.direccion
                })) }
            />
            <TextInputComponent
                val={data.telefono}
                label="Teléfono"
                labelColor='#7A428D'
                color='#FFF'
                borderColor='silver'
                inputColor="#000"
                onChange={ (e) => dispatch(setData({
                    name: data.name,
                    username: data.username,
                    telefono: e,
                    direccion: data.direccion
                })) }
            />
            <TextInputComponent
                val={data.direccion}
                label="Dirección"
                labelColor='#7A428D'
                color='#FFF'
                borderColor='silver'
                inputColor="#000"
                onChange={ (e) => dispatch(setData({
                    name: data.name,
                    username: data.username,
                    telefono: data.telefono,
                    direccion: e
                })) }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width:'90%',
        gap:10,
        justifyContent:'center',
        alignSelf:'center',
    },
    title: {
        fontSize:20,
        fontWeight: 'bold',
        color: 'silver'
    }
})

export default UserData