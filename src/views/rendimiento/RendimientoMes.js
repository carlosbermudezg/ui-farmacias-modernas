import { useState, useCallback, useEffect } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, RefreshControl, SafeAreaView, FlatList, Alert } from "react-native"
import { Text, Appbar } from 'react-native-paper'
import loginStyle from "../../../assets/styles/login"
import homeStyle from "../../../assets/styles/home"
import CardRecetas from '../../components/cardRecetas'
import PaginationRecetas from '../PaginationRecetas'
import { useSelector } from 'react-redux'

const RendimientoMes = ({ navigation, route })=>{

    const [renderProducts, setRenderProducts] = useState([]) 
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const selectedUser = useSelector(state=> state.recetaUser)
    const year = useSelector(state=> state.recetaYear)
    const visible = useSelector(state=> state.modalVisible)

    const [isLoading, setIsLoading] = useState(false)
    const onRefresh = useCallback(() => {
        setIsLoading(true);
        setTimeout(() => {
        setIsLoading(false);
        }, 2000);
    }, []);

    const showAlert = () =>{
        renderProducts[0].payStatus < 1 ?
        Alert.alert(
          'Confirmación',
          '¿Está seguro que desea marcar este lote como PAGADO?',
          [
            {
                text: 'Ok',
                onPress: () => payment(),
                style: 'cancel',
            },
            {
                text: 'Cancel',
                style: 'cancel',
            },
          ],
          {
            cancelable: true,
          },
        ) : 
        Alert.alert('Este lote ya ha sido pagado')
    }

    function replace(texto) {
        texto = texto.replace(/\[/g, '(');
        texto = texto.replace(/\]/g, ')');
        return texto;
    }

    const payment = async()=>{
        const ids = []
        renderProducts.map( element => ids.push(element.idrecetas) )
        const convert = JSON.stringify(ids)
        const identifiers = replace(convert)
        const token = await AsyncStorage.getItem('token')
        await axios.put(`${process.env.EXPO_PUBLIC_API_URL}/recetas/updatePayment`, {"ids": identifiers }, { 
            headers: {
                Authorization: `Bearer ${token}`
                } 
            })
        .then( response => {
            Alert.alert('Este lote se ha marcado como pagado')
        })
        .catch( error => console.log( error ) )
        onRefresh()
    }

    useEffect(()=>{
        const Load = async()=>{
            const token = await AsyncStorage.getItem('token')
            await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/recetas/getByUser/${selectedUser.idusers}/?page=${page}&limit=6&month=${route.params.month}&year=${year}`, { 
                headers: {
                    Authorization: `Bearer ${token}`
                    } 
                })
            .then( response => {
                setRenderProducts(response.data.data) 
                setPage(response.data.pagination.page)
                setTotalPages(response.data.pagination.totalPages)
            })
            .catch( error => console.log( error ) )
        }
        Load()
    },[isLoading, page]) 

    return(
        <> 
        <Appbar.Header style={ homeStyle.appbar }>
            <Appbar.BackAction iconColor="#FFF" onPress={()=> navigation.navigate('Rendimiento')} />
            <Appbar.Content color='#fff' title={`Rendimiento ${route.params.monthTitle} `} />
            <Appbar.Action iconColor='#fff' icon="bookmark-check" 
                onPress={() => { showAlert() }} 
            />
        </Appbar.Header>
        <View style={ [ loginStyle.loginWrap, { flex:7 } ]}>
            <View style={ { width:'95%', marginBottom:10, marginTop:10 } }>
                <Text style={ { color:'silver' } } variant="titleMedium">{selectedUser.name}</Text>
            </View>
            <SafeAreaView style={ homeStyle.productsContainerMobile }>
                <FlatList
                    contentContainerStyle={ homeStyle.flatProducts }
                    refreshControl={
                        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
                    }
                    refreshing={true}
                    data={renderProducts}
                    renderItem={({item}) => 
                        <CardRecetas
                            receta={item}
                        >
                        </CardRecetas>
                    }
                    keyExtractor={key => key.idrecetas}
                />
            </SafeAreaView>
        </View>
        <PaginationRecetas page={ page } totalPages={ totalPages } setPage={ setPage } ></PaginationRecetas> 
        </>
    )
}

export default RendimientoMes