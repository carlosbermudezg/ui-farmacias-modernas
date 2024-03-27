import homeStyle from "../../assets/styles/home"
import { View } from "react-native"
import { Icon, Text, Button } from "react-native-paper"
import { setPage } from "../store/slices/page.slice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { setRenderProducts } from "../store/slices/renderProducts.slice"
import { setTotalPage } from "../store/slices/totalPage"

const Pagination = ()=>{

    const [limit] = useState(5)

    const products = useSelector(state => state.products)
    const category = useSelector(state => state.category)
    const categoryUser = useSelector(state => state.categoryUser)
    const page = useSelector(state => state.page)
    const searchQuery = useSelector(state => state.searchQuery)
    const totalPages = useSelector(state => state.totalPage)
    const dispatch = useDispatch()

    function paginate(array, page_size, page_number) {
        return array.slice((page_number - 1) * page_size, page_number * page_size);
    }

    useEffect(()=>{
        if(category === 0){
            if(searchQuery != ''){
                const filter = products.filter(
                    product => product.PRODUCTO.toLowerCase().includes(searchQuery.toLowerCase()) 
                )
                const render = paginate(filter, limit, page)
                dispatch(setRenderProducts(render))
                dispatch( setTotalPage( Math.ceil(filter.length / limit) ) )
            }else{
                const render = paginate(products, limit, page)
                dispatch(setRenderProducts(render))
                dispatch( setTotalPage( Math.ceil(products.length / limit) ) )
            }
        }else{
            if(searchQuery != ''){
                const filterByCategory = products.filter( product => categoryUser[0].includes(product.CATEGORIA) )
                const filterByQuery = filterByCategory.filter(
                    product => product.PRODUCTO.toLowerCase().includes(searchQuery.toLowerCase())
                )
                const render = paginate(filterByQuery, limit, page)
                dispatch(setRenderProducts(render))
                dispatch( setTotalPage( Math.ceil(filterByQuery.length / limit) ) )
            }else{
                const filterByCategory = products.filter( product => categoryUser[0].includes(product.CATEGORIA) )
                const render = paginate(filterByCategory, limit, page)
                dispatch(setRenderProducts(render))
                dispatch( setTotalPage( Math.ceil(filterByCategory.length / limit) ) )
            }
        }
    },[searchQuery, page, category])


    return(
        <View style={ homeStyle.pagination }>
            <Button 
                disabled={ page === 1 }
                style={ homeStyle.paginationButtons }
                mode="outlined" 
                onPress={() => {
                    dispatch(setPage(1))
                }}>
                <Icon
                    source="chevron-double-left"
                    size={20}
                />
            </Button>
            <Button 
                disabled={ page === 1 }
                style={ homeStyle.paginationButtons }
                mode="outlined" 
                onPress={() => {
                    dispatch(setPage(page - 1))
                }}>
                <Icon
                    source="arrow-left"
                    size={20}
                />
            </Button>
            <Text variant="titleMedium">Pagina: { page } de { totalPages }</Text>
            <Button 
                disabled={ page === totalPages }
                style={ homeStyle.paginationButtons }
                mode="outlined" 
                onPress={() => {
                    dispatch(setPage(page + 1))
                }}>
                <Icon
                    source="arrow-right"
                    size={20}
                />
            </Button>
            <Button 
                style={ homeStyle.paginationButtons }
                mode="outlined" 
                disabled={ page === totalPages }
                onPress={() => {
                    dispatch(setPage(totalPages))
                }}>
                <Icon
                    source="chevron-double-right"
                    size={20}
                />
            </Button>
        </View>
    )
}

export default Pagination