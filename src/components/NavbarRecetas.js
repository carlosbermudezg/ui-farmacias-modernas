import { useState } from "react"
import { Platform, TextInput } from "react-native"
import { Appbar, Icon } from "react-native-paper"
import homeStyle from "../../assets/styles/home"
import { useDispatch, useSelector } from "react-redux"
import { setSearchQuery } from "../store/slices/searchQuery.slice"
import { setPage } from "../store/slices/page.slice"

const NavbarRecetas = ({navigation, route})=>{

    const dispatch = useDispatch()
    const searchQuery = useSelector( state => state.searchQuery )

    const [searchBarIsVisible, setSearchBarIsVisible] = useState(false)
    const [searchValue, setSearchValue] = useState('Buscar todas las recetas')

    return(
        <Appbar.Header style={ homeStyle.appbar }>
            <Appbar.BackAction iconColor="#FFF" onPress={()=> navigation.navigate('Todas las Recetas')} />
            <Appbar.Content color='#fff' title={ route } />
            <Appbar.Action iconColor='#fff' icon="note-plus" 
                onPress={() => { navigation.navigate('AddReceta', { navigation: navigation }) }} 
            />
        </Appbar.Header>
    )
}

export default NavbarRecetas