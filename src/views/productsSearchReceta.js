import { Pressable, FlatList, RefreshControl, SafeAreaView, TextInput } from "react-native"
import { Modal, Text } from "react-native-paper"
import { useState, useCallback } from "react"
import { useSelector } from "react-redux"
import CardProduct from '../components/cardProduct'
import homeStyle from "../../assets/styles/home"

const ProductsSearchReceta = ({ medicamentos, setMedicamentos, showModal, setModalData })=>{

    const [isLoading, setIsLoading] = useState(false)
    const onRefresh = useCallback(() => {
        setIsLoading(true);
        setTimeout(() => {
        setIsLoading(false);
        }, 2000);
    }, []);

    const renderProducts = useSelector( state => state.renderProducts)

    return(
        <SafeAreaView style={ homeStyle.productsContainerMobile }>
            <FlatList
                contentContainerStyle={ homeStyle.flatProducts }
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
                }
                data={renderProducts}
                renderItem={({item}) => 
                    <Pressable onPress={ ()=> {
                        setModalData(item)
                        showModal()
                    } }>
                        <CardProduct id={item.CODIGO} product={item?.PRODUCTO} stock={(Number(item?.CANTIDAD) + Number(item?.b1) + Number(item?.b2))} category={ item?.CATEGORIA } />
                    </Pressable>
                    }
                keyExtractor={key => key.CODIGO}
            />
        </SafeAreaView>
    )
}

export default ProductsSearchReceta