import { ScrollView, Text, StyleSheet, View } from 'react-native'
import { Modal } from 'react-native-paper'
import CustomRadioButton from '../../../components/CustomRadioButton'
import axios from 'axios'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { setRecetaUser } from '../../../store/slices/recetas/recetaUser.slice'

const SelectDoctor = ({visible, setVisible}) =>{

    const [value, setValue] = useState('')
    const [doctors, setDoctors] = useState([])
    const dispatch = useDispatch()

    useEffect(()=>{
        const getDoctors = async()=>{
            const token = await AsyncStorage.getItem('token')
            await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/users/doctors`, {
                headers: {
                    Authorization: `Bearer ${token}`
                  } 
                })
                .then( response => {
                    setDoctors(response.data)
                    setValue(response.data[0].username)
                } )
                .catch( error => console.log( error ) )
        }
        getDoctors()
    },[])

    return(
        <Modal visible={visible} onDismiss={()=> setVisible(false) } contentContainerStyle={styles.container}>
            <Text>Selecciona un Doctor</Text>
            <View style={ styles.doctorsContainer }>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                        {
                            doctors.map( doctor => {
                                return(
                                    <CustomRadioButton
                                        key={doctor.username}
                                        label={doctor.name}
                                        value={doctor.username}
                                        selectedValue={value}
                                        onPress={()=>{
                                            setValue(doctor.username)
                                            dispatch(setRecetaUser(doctor))
                                        }}
                                    />
                                )
                            } )
                        }
                </ScrollView>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 20,
        height: 350
    },
    doctorsContainer:{
        height: 350,
        flex: 1
    },
    scrollContainer : {
        flexGrow: 1,
    }
})

export default SelectDoctor