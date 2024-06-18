import homeStyle from "../../assets/styles/home"
import { View, Pressable } from "react-native"
import { Text, Icon } from "react-native-paper"
import axios from "axios"
import { useEffect, useState } from 'react'

const CardRecetas = ({numRecetas, idrecetas, iduser, idusercreate, fechaHora, image, medicamentos}) => {

    // const [user, setUser] = useState([]) 

    // useEffect(()=>{
    //     axios.get(`${process.env.EXPO_PUBLIC_API_URL}/users/one/${iduser}`)
    //         .then( response => setUser(response.data[0]) )
    //         .catch( error => console.log( error ) )
    // },[])

    return(
        <Pressable
            onPress={()=> console.log(idrecetas) }
        >
            <View style={ homeStyle.productCard }>
                <View style={[ homeStyle.productCardIcon, { backgroundColor: 'green' } ]}>
                    <Icon
                        source='all-inclusive'
                        color={"#FFF"}
                        size={14}
                    />
                    <Text style={ { color:'#FFF', fontSize: 10 } }>{ image }</Text>
                </View>
                <View style={ homeStyle.productCardInfo }>
                    <Text style={ { fontWeight:'bold' } } numberOfLines={3}>
                        N° Receta: { numRecetas }
                    </Text>
                    <Text>
                        {`Fecha de Ingreso: ${fechaHora}`}
                    </Text>
                </View>
            </View>
        </Pressable>
    )
}

export default CardRecetas