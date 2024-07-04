import homeStyle from "../../assets/styles/home";
import { View } from "react-native";
import { Text, Icon } from "react-native-paper";
import categories from "../utils/Categories";

const CardProduct = ({id, product, stock, category}) => {
 
    const filterCategory = categories.find( element => category === element.id )

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
                    { product }
                </Text>
                <Text>
                    {`Cantidad en Stock: ${stock}`}
                </Text>
            </View>
        </View>
    )
}

export default CardProduct