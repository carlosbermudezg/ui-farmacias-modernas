import { useState } from "react"
import { Platform, TextInput } from "react-native"
import { Appbar, Icon } from "react-native-paper"
import homeStyle from "../../assets/styles/home"

const Navbar = ({ navigation })=>{

    const [searchBarIsVisible, setSearchBarIsVisible] = useState(false)
    const [searchValue, setSearchValue] = useState('Buscar todos los productos')
    const [searchQuery, setSearchQuery] = useState('');

    return(
        <Appbar.Header style={ homeStyle.appbar }>
            {
                searchBarIsVisible === false ? 
                    <>
                        <Appbar.Action icon="menu" iconColor='#fff' onPress={() => { navigation.openDrawer() }} />
                        <Appbar.Content color='#fff' title="Productos"/>
                    </>
                : 
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
                                filterProducts(value)
                            }} 
                            value={searchQuery}
                        />
                    </>
            }
            {
                Platform.OS != 'web' && searchBarIsVisible === false ? 
                    <Appbar.Action iconColor='#fff' icon="magnify" 
                        onPress={() => { setSearchBarIsVisible(!searchBarIsVisible) }} 
                    />: false
            }
        </Appbar.Header>
    )
}

export default Navbar