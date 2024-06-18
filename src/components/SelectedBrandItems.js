import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { Icon } from "react-native-paper"

const SelectedBrandItems = ({brand, onPress, validate})=>{

    const styles = StyleSheet.create({
        container:{
            backgroundColor:'#7A428D',
            padding:10,
            borderRadius:5,
            marginBottom:30
        },
        brandsSelector:{
            borderRadius:5,
            padding:5,
            maxHeight:200
        },
        brandItem:{
            flexDirection:'row',
            justifyContent:'space-between',
            margin:2,
            padding:5,
            borderRadius:5,
            borderWidth:1,
            borderColor:'#D7BDE2'
        }
    })

    return(
        <TouchableOpacity style={[styles.brandItem, { backgroundColor: validate ? '#E74C3C' : '#BB8FCE' }]}
            onPress={ onPress }
        >
            <Text style={ { color:'#FFF', alignSelf:'center' } }>{brand.marca_NOMBRE}</Text>
            <Icon
                source={ validate ? 'close' : 'plus' }
                color="#FFF"
                size={15}
            />
        </TouchableOpacity>
    )
}

export default SelectedBrandItems