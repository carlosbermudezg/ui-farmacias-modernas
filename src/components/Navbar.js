import { useState } from "react"
import { Platform, TextInput } from "react-native"
import { Appbar, Icon } from "react-native-paper"
import homeStyle from "../../assets/styles/home"
import { useDispatch, useSelector } from "react-redux"
import { setSearchQuery } from "../store/slices/searchQuery.slice"
import { setPage } from "../store/slices/page.slice"

const Navbar = ({navigation, route})=>{

    const dispatch = useDispatch()
    const searchQuery = useSelector( state => state.searchQuery )

    const [searchBarIsVisible, setSearchBarIsVisible] = useState(false)
    const [searchValue, setSearchValue] = useState('Buscar todos los productos')

    return(
        <Appbar.Header style={ homeStyle.appbar }>
            {
                searchBarIsVisible === false && searchQuery === '' || Platform.OS === 'web' ? 
                    <>
                        <Appbar.Action icon="menu" iconColor='#fff' onPress={() => { navigation.openDrawer() }} />
                        <Appbar.Content color='#fff' title={ route } />
                    </>
                : 
                Platform.OS != 'web' ? 
                <>
                    <Icon
                        source="shield-search"
                        color='#fff'
                        size={24}
                    />
                    <TextInput
                        autoFocus={true}
                        onEndEditing={()=>{
                            setSearchBarIsVisible(false)
                        }}
                        selectionColor='#f69a23'
                        placeholderTextColor='#FFFFFF'
                        style={ homeStyle.searchInputMobile } 
                        placeholder={ searchValue }
                        onChangeText={(value)=>{
                            dispatch( setPage( 1 ) )
                            dispatch(setSearchQuery(value))
                        }} 
                        value={searchQuery}
                    />
                </> : false
            }
            {
                Platform.OS != 'web' && searchBarIsVisible === false && route === 'Productos' ? 
                    <Appbar.Action iconColor='#fff' icon="magnify" 
                        onPress={() => { setSearchBarIsVisible(!searchBarIsVisible) }} 
                    />: false
            }
        </Appbar.Header>
    )
}

export default Navbar