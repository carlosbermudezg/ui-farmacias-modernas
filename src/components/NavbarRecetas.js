import { Appbar, Icon } from "react-native-paper"
import homeStyle from "../../assets/styles/home"

const NavbarRecetas = ({navigation, route})=>{

    return(
        <Appbar.Header style={ homeStyle.appbar }>
            <Appbar.BackAction iconColor="#FFF" onPress={()=> navigation.navigate('RecetasMonth')} />
            <Appbar.Content color='#fff' title={ route } />
            <Appbar.Action iconColor='#fff' icon="note-plus" 
                onPress={() => { navigation.navigate('AddReceta', { navigation: navigation }) }} 
            />
        </Appbar.Header>
    )
}

export default NavbarRecetas