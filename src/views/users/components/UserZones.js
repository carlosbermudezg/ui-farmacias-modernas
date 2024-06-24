import { View, StyleSheet, Text } from "react-native"
import ChipComponent from "../../../components/ChipComponent"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedZones } from '../../../store/slices/register/selectedZones.slice'
import { useEffect } from 'react'
import { getZonesThunk } from "../../../store/slices/register/zones.slice"

const UserZones = () => {

    const zones = useSelector( state => state.zones )
    const user = useSelector( state => state.editUser )
    const type = useSelector( state => state.userType )
    const selectedZones = useSelector( state => state.selectedZones )
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getZonesThunk())
        dispatch(setSelectedZones(JSON.parse(user.zones)))
    },[])

    const getZone = (value)=>{
        if(selectedZones.includes(value)){
            const newZones = selectedZones.filter( ( element )=> element != value )
            dispatch(setSelectedZones([...newZones]))
        }else{
            dispatch(setSelectedZones([...selectedZones, value]))
        }
    }

    return(
        <View style={styles.container}>
            {
                type != "10" ?
                <>
                    <Text style={styles.title}>Zonas de trabajo</Text>
                    <View style={ styles.zones }>
                        {
                            zones.map((element, index)=>{
                                return(
                                    <ChipComponent
                                        key={index}
                                        selected={ selectedZones.includes(element.idzonas) }
                                        title={element.name}
                                        textColor="#FFF"
                                        borderColorSelected="#FFF"
                                        borderColor="#FFF"
                                        backgroundColor="#662D91"
                                        selectedColor="#D7BDE2"
                                        onPress={ ()=> getZone(element.idzonas) }
                                    >
                                    </ChipComponent>
                                )
                            })
                        }
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
    zones:{
        flexDirection:'row', 
        flexWrap:'wrap', 
        gap:10,
        justifyContent:'center'
    },
    title: {
        fontSize:20,
        fontWeight: 'bold',
        color: 'silver'
    }
})

export default UserZones