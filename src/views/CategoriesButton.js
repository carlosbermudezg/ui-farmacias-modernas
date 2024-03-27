import homeStyle from "../../assets/styles/home"
import { View } from "react-native"
import { Button } from "react-native-paper"
import SearchBar from "./SearchBar"
import { useDispatch, useSelector } from "react-redux"
import { setCategory } from "../store/slices/category.slice"
import { setCategoryUser } from "../store/slices/categoryUser.slice"
import categories from "../utils/Categories"
import { useEffect } from "react"
import { setPage } from "../store/slices/page.slice"
import { setTotalPage } from "../store/slices/totalPage"

const CategoriesButton = ()=>{

    const dispatch = useDispatch()

    const categoryUser = useSelector( state => state.categoryUser )
    const products = useSelector( state => state.products )

    const resetCategory = (category)=>{
        if(category != 0){
            dispatch(setCategory(category))
            const filterCategory = categories.filter((element) => element.value === category )
            dispatch(setCategoryUser(
                [
                    filterCategory.map( element => element.id)
                ]
            ))
        }else{
            dispatch( setCategory(category) )
            dispatch( setCategoryUser([]) )
        }
    }

    useEffect(()=>{
        if(categoryUser != ''){
            const filterProducts = products?.filter((element) => categoryUser[0]?.includes(element.CATEGORIA))
            dispatch( setTotalPage( Math.ceil( filterProducts.length / 20 )  ) )
            dispatch( setPage(1) )
        }else{
            dispatch( setTotalPage( Math.ceil( products.length / 20 ) ) )
            dispatch( setPage(1) )
        }
    },[categoryUser])

    return(
        <View style={ homeStyle.filterContainer }>
            <View style={ homeStyle.categories }>
                <Button 
                    buttonColor='#f69a23'
                    icon="arm-flex-outline"
                    style={ [homeStyle.buttonCategory] } 
                    mode="contained" 
                    onPress={() => {
                        resetCategory(3)
                    }}>
                    3%
                </Button>
                <Button 
                    buttonColor='#F57E25'
                    icon="check-decagram-outline"
                    style={ [homeStyle.buttonCategory] } 
                    mode="contained" 
                    onPress={() => {
                        resetCategory(5)
                    }}>
                    5%
                </Button>
                <Button 
                    buttonColor='#F26524'
                    icon="shield-star-outline"
                    style={ [homeStyle.buttonCategory] } 
                    mode="contained" 
                    onPress={() => {
                        resetCategory(15)
                    }}>
                    15%
                </Button>
                <Button 
                    buttonColor='#662D91'
                    icon="all-inclusive"
                    style={ [homeStyle.buttonCategory] } 
                    mode="contained" 
                    onPress={() => {
                        resetCategory(0)
                    }}
                >
                    Todos
                </Button>
            </View>
            <SearchBar></SearchBar>
        </View>
    )
}

export default CategoriesButton