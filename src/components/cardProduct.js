import { Card, Avatar, IconButton } from "react-native-paper";
import homeStyle from "../../assets/styles/home";
import { useSelector } from "react-redux";

const CardProduct = ({id, product, stock}) => {

    const category = useSelector( state => state.category)

    return(
        <Card.Title style={ homeStyle.productCard } key={ id }
            title={ product }
            subtitle={`Cantidad en Stock: ${category}`}
            left={(props) => <Avatar.Icon key={ id } {...props} icon="folder" />}
            right={(props) => <IconButton key={ id } {...props} icon="dots-vertical" onPress={() => {}} />}
        />
    )
}

export default CardProduct