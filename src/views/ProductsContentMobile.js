import { SafeAreaView, FlatList, RefreshControl, View, Text, Pressable } from "react-native"
import { useState, useCallback } from "react"
import { useSelector } from "react-redux"
import CardProduct from '../components/cardProduct'
import homeStyle from "../../assets/styles/home"
import { useDispatch } from "react-redux"

const ProductsContentMobile = ()=>{

    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const onRefresh = useCallback(() => {
        setIsLoading(true);
        setTimeout(() => {
        setIsLoading(false);
        }, 2000);
    }, []);

    const renderProducts = useSelector( state => state.renderProducts)
    const category = useSelector( state => state.category )

    return(
        <>
            <View style={ homeStyle.textResultadosContainer }>
                <Text style={ homeStyle.textResultados }>Resultados</Text>
                <Text style={ homeStyle.textCategory }>
                    {
                        category === 0 ? 'Todos los productos' : `Categoria ${category} %`
                    }
                </Text>
            </View>
            <SafeAreaView style={ homeStyle.productsContainerMobile }>
                <FlatList
                    contentContainerStyle={ homeStyle.flatProducts }
                    refreshControl={
                        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
                    }
                    data={renderProducts}
                    renderItem={({item}) => <CardProduct item={item}/>}
                    keyExtractor={key => key.CODIGO}
                    />
            </SafeAreaView>
        </>
    )
}

export default ProductsContentMobile