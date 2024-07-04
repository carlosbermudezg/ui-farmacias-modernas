import homeStyle from "../../assets/styles/home";
import { View } from "react-native";
import { Text, Icon } from "react-native-paper";
import categories from "../utils/Categories";
import { useSelector } from "react-redux";

const CardProduct = ({ item }) => {
 
    const filterCategory = categories.find( element => item.CATEGORIA === element.id )
    const bodegas = useSelector( state => state.selectBodega)
    // const stock = (Number(item?.CANTIDAD) + Number(item?.b1) + Number(item?.b2))

    const stock = bodegas.reduce((acc, current)=>{
        const add = acc + Number(item[current])
        return add
    }, 0)

    let cat = "0"
    let icon = "all-inclusive"
    let color = '#662D91'

    if(filterCategory){
        cat = filterCategory?.value
        if(filterCategory?.value === 3){
            icon = "star-outline"
            color = '#ffc501'
        }
        if(filterCategory?.value === 5){
            icon = "star-half-full"
            color = '#fe9600'
        }
        if(filterCategory?.value === 15){
            icon = "star"
            color = '#FF5733'
        }
    }

    return(
        <View style={ homeStyle.productCard }>
            <View style={[ homeStyle.productCardIcon, { backgroundColor: color } ]}>
                <Icon
                    source={icon}
                    color={"#FFF"}
                    size={14}
                />
                <Text style={ { color:'#FFF', fontSize: 10 } }>{ cat } %</Text>
            </View>
            <View style={ homeStyle.productCardInfo }>
                <Text style={ { fontWeight:'bold' } } numberOfLines={3}>
                    { item.PRODUCTO }
                </Text>
                <Text>
                    {`Cantidad en Stock: ${stock}`}
                </Text>
            </View>
        </View>
    )
}

export default CardProduct