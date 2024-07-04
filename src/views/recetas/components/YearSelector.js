import axios from "axios"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { useEffect, useState } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage"
import CustomRadioButton from "../../../components/CustomRadioButton"
import { setRecetaYear } from "../../../store/slices/recetas/recetaYear.slice"
import { useDispatch, useSelector } from "react-redux"

const YearSelector = () =>{
    const yearSelected = useSelector(state=> state.recetaYear)
    const [years, setYears] = useState([])
    const dispatch = useDispatch()

    useEffect(()=>{
        const getYears = async()=>{
            const token = await AsyncStorage.getItem('token')
            await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/years`, {
                headers: {
                    Authorization: `Bearer ${token}`
                  } 
                })
                .then( response => {
                    setYears(response.data)
                    dispatch(setRecetaYear(response.data[0].year))
                } )
                .catch( error => console.log( error ) )
        }
        getYears()
    },[])

    return(
        <View>
            <Text style={styles.text}>Filtra por año</Text>
            <ScrollView
                horizontal={true}
                contentContainerStyle={styles.container}
                showsHorizontalScrollIndicator={false}
            >
                {
                    years.map( year => {
                        return(
                            <CustomRadioButton
                                key={year.year}
                                label={year.year}
                                value={year.year}
                                selectedValue={yearSelected}
                                onPress={()=>{
                                    dispatch(setRecetaYear(year.year))
                                }}
                            />
                        )
                    } )
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flexDirection:'row',
        gap: 5,
        padding:2,
    },
    text:{
        color:'silver',
        marginLeft:2
    }
})

export default YearSelector