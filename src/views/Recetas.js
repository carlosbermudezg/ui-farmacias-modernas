import { useState, useCallback, useEffect } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, RefreshControl, SafeAreaView, FlatList } from "react-native"
import { Text } from 'react-native-paper'
import loginStyle from "../../assets/styles/login"
import NavbarRecetas from "../components/NavbarRecetas"
import homeStyle from "../../assets/styles/home"
import CardRecetas from '../components/cardRecetas'
import PaginationRecetas from './PaginationRecetas'

const Recetas = ({ navigation, route, monthTitle, month })=>{

    const [isLoading, setIsLoading] = useState(false)
    const onRefresh = useCallback(() => {
        setIsLoading(true);
        setTimeout(() => {
        setIsLoading(false);
        }, 2000);
    }, []);

    const [renderProducts, setRenderProducts] = useState([]) 
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const year = "2024"

    useEffect(()=>{
        const Load = async()=>{
            const userLogged = await AsyncStorage.getItem('user')
            const parsedUser = JSON.parse(userLogged)
            console.log(parsedUser.idusers)
            if(parsedUser.type === 1){ 
                axios.get(`${process.env.EXPO_PUBLIC_API_URL}/recetas/getByUser/${parsedUser.idusers}/?page=${page}&limit=6&month=${route.params.month}&year=${year}`)
                .then( response => {
                    console.log(response.data.data)
                    setRenderProducts(response.data.data) 
                    setPage(response.data.pagination.page)
                    setTotalPages(response.data.pagination.totalPages)
                })
                .catch( error => console.log( error ) )
            }else{
                axios.get(`${process.env.EXPO_PUBLIC_API_URL}/recetas/?page=${page}&limit=6`)
                .then( response => {
                    setRenderProducts(response.data.data) 
                    setPage(response.data.pagination.page)
                    setTotalPages(response.data.pagination.totalPages)
                })
                .catch( error => console.log( error ) )
            }
        }
        Load()
    },[isLoading, page]) 

    return(
        <>
        <NavbarRecetas navigation={ navigation } route={ route.params.monthTitle } ></NavbarRecetas>
        <View style={ [ loginStyle.loginWrap, { flex:7 } ]}>
            <View style={ { width:'95%', marginBottom:10, marginTop:10 } }>
                <Text style={ { color:'silver' } } variant="titleMedium">Todas las recetas</Text>
            </View>
            <SafeAreaView style={ homeStyle.productsContainerMobile }>
                <FlatList
                    contentContainerStyle={ homeStyle.flatProducts }
                    refreshControl={
                        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
                    }
                    data={renderProducts}
                    renderItem={({item}) => 
                        <CardRecetas
                            key={item.idrecetas}
                            numRecetas={item.numReceta}
                            idrecetas={item.idrecetas} 
                            iduser={item.iduser} 
                            idusercreate={item.idusercreate} 
                            fechaHora={item.fechaHora}
                            image={item.image}
                            medicamentos={ item.medicamentos } 
                        />
                    }
                    keyExtractor={key => key.CODIGO}
                />
            </SafeAreaView>
        </View>
        <PaginationRecetas page={ page } totalPages={ totalPages } setPage={ setPage } ></PaginationRecetas> 
        </>
    )
}

export default Recetas