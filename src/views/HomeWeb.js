import homeStyle from "../../assets/styles/home"
import { View } from "react-native"
import CategoriesButton from "./CategoriesButton"
import ProductsContentWeb from "./ProductsContentWeb"
import Pagination from "./Pagination"

const HomeWeb = ()=>{

    return(
        <View style={ homeStyle.homeWrap }>
            <View style={ homeStyle.homeContent }>
                <CategoriesButton></CategoriesButton>
                <ProductsContentWeb></ProductsContentWeb>
                <Pagination></Pagination>
            </View>
        </View>
    )
}

export default HomeWeb