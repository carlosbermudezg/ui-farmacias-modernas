import { View, StyleSheet, Text } from "react-native"
import MyBrands from "../../../components/MyBrands"
import BrandsList from "../../../components/BrandsList"
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { setSelectedBrands } from "../../../store/slices/register/selectedBrands.slice"

const UserBrands = () =>{

    const user = useSelector( state => state.editUser )
    const type = useSelector( state => state.userType )
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(setSelectedBrands(JSON.parse(user.brands)))
    },[])

    return(
        <View style={styles.container}>
            {
                type != "10" ?
                <>
                    <Text style={ styles.title }>Marcas seleccionadas</Text>
                    <MyBrands></MyBrands>
                    <View>
                        <BrandsList></BrandsList>
                    </View>
                </> : false
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width:'90%',
        gap:10,
        justifyContent:'center',
        alignSelf:'center'
    },
    title: {
        fontSize:20,
        fontWeight: 'bold',
        color: 'silver'
    }
})

export default UserBrands