import homeStyle from "../../assets/styles/home"
import { Searchbar } from "react-native-paper"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setSearchQuery } from "../store/slices/searchQuery.slice"
import { setPage } from "../store/slices/page.slice"

const SearchBar = ()=>{
 
    const dispatch = useDispatch()
    const searchQuery = useSelector( state => state.searchQuery )

    const [searchValue, setSearchValue] = useState('Buscar todos los productos')

    return(
        <Searchbar
            style={ homeStyle.searchInput }
            placeholder={ searchValue }
            onChangeText={(value)=>{
                dispatch( setPage( 1 ) )
                dispatch(setSearchQuery(value))
            }}
            value={searchQuery}
        />
    )
}

export default SearchBar