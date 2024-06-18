import { SafeAreaView, FlatList, RefreshControl, View, Text } from "react-native"
import { useState, useCallback } from "react"
import { useSelector } from "react-redux"
import CardProduct from '../components/cardProduct'
import homeStyle from "../../assets/styles/home"

const ProductsContentMobile = ()=>{

    const [isLoading, setIsLoading] = useState(false)
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
                    renderItem={({item}) => <CardProduct id={item.CODIGO} product={item?.PRODUCTO} stock={(Number(item?.CANTIDAD) + Number(item?.b1) + Number(item?.b2))} category={ item?.CATEGORIA } />}
                    keyExtractor={key => key.CODIGO}
                    />
            </SafeAreaView>
        </>
    )
}

export default ProductsContentMobile