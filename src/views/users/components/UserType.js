import { View, StyleSheet, Text } from "react-native"
import SelectItem from "../../../components/SelectItem"
import { useDispatch, useSelector } from "react-redux"
import { setUserType } from "../../../store/slices/register/userType.slice"
import { useEffect } from 'react'

const UserType = () => {

    const type = useSelector( state => state.userType )
    const user = useSelector( state => state.editUser )
    const dispatch = useDispatch()

    useEffect(()=>{
        console.log('type')
        dispatch(setUserType(user.type))
    },[])

    return(
        <View style={styles.container}>
            {
                type != "10" ?
                <>
                <Text style={ styles.title }>Tipo de Usuario</Text>
                <View>
                <SelectItem
                    selected={type == "1" && true}
                    title="Médico"
                    backgroundColor='silver'
                    borderColor="#D7BDE2"
                    selectedColor='#662D91'
                    borderColorSelected='#662D91'
                    textColor='#999'
                    textSelectedColor="#FFF"
                    onPress={()=> dispatch(setUserType('1')) }
                >
                </SelectItem>
                <SelectItem
                    selected={type == "2" && true}
                    title="Visitador Médico" 
                    backgroundColor='silver'
                    borderColor="#D7BDE2"
                    selectedColor='#662D91'
                    borderColorSelected='#662D91'
                    textColor='#999'
                    textSelectedColor="#FFF"
                    onPress={()=> dispatch(setUserType('2')) }
                    >
                </SelectItem>
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

export default UserType