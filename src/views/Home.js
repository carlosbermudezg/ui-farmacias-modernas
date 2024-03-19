import { useState, useEffect } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Avatar, Card, IconButton, Button, Searchbar } from 'react-native-paper'
import { View, Text, ScrollView } from "react-native"
import loginStyle from "../../assets/styles/login"

const Home = ()=>{

    const [products, setProducts] = useState([])
    const [pages, setPages] = useState(1)
    const [searchedProducts, setSearchedProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // const getCategories = async()=>{
        //     const token = await AsyncStorage.getItem('token')
        //     const auth = {  headers: { Authorization: `Bearer ${token}` } }
        //     axios.get(`${process.env.EXPO_PUBLIC_APISHEYLA_URL}/categories`, auth)
        //     .then((response)=>{
        //         setCategories(response.data[0])
        //         console.log(response.data[0])
        //     })
        //     .catch((error)=>{
        //         console.log(error)
        //     })
        // }
        const getProducts = async()=>{
            const token = await AsyncStorage.getItem('token')
            const auth = {  headers: { Authorization: `Bearer ${token}` } }
            axios.get(`${process.env.EXPO_PUBLIC_APISHEYLA_URL}/products`, auth)
            .then((response)=>{
                setProducts(response.data)
                console.log(response.data)
            })
            .catch((error)=>{
                console.log(error)
            })
        }
        // getCategories()
        getProducts()
    }, [])

    const getSearchProduct = async(searchValue)=>{
        setSearchQuery(searchValue)
        const token = await AsyncStorage.getItem('token')
        const auth = {  headers: { Authorization: `Bearer ${token}` } }
        axios.get(`${process.env.EXPO_PUBLIC_APISHEYLA_URL}/products/search/${ searchQuery }`, auth)
        .then((response)=>{
            setSearchedProducts(response.data)
            setRenderingProducts()
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const setRenderingProducts = ()=>{
        setPages((searchedProducts.length/30))
        console.log(pages)
    }    

    return(
        <>
        <View style={ loginStyle.homeWrap }>
            <View style={ loginStyle.homeContent }>
                <Searchbar
                    placeholder="Search"
                    onChangeText={(value)=>{
                        getSearchProduct(value)
                    }}
                    value={searchQuery}
                />
                <View style={ loginStyle.categories }>
                    <Button 
                        style={ [loginStyle.buttonCategory, loginStyle.buttonCategoryFirst, loginStyle.buttonCategoryDivider] } 
                        mode="contained" 
                        onPress={() => console.log('Pressed')}>
                        5%
                    </Button>
                    <Button 
                        style={ [loginStyle.buttonCategory, loginStyle.buttonCategoryDivider] } 
                        mode="contained" 
                        onPress={() => console.log('Pressed')}>
                        10%
                    </Button>
                    <Button 
                        style={ [loginStyle.buttonCategory, loginStyle.buttonCategoryDivider] } 
                        mode="contained" 
                        onPress={() => console.log('Pressed')}>
                        15%
                    </Button>
                    <Button 
                        style={ [loginStyle.buttonCategory, loginStyle.buttonCategoryLast] } 
                        mode="contained" 
                        onPress={() => console.log('Pressed')}>
                        20%
                    </Button>
                </View>
                <ScrollView contentContainerStyle={ loginStyle.table }>
                    {
                        products.map((product, index)=>{
                            return(
                                <Card.Title style={ loginStyle.productCard } key={ index }
                                    title={ product.PRODUCTO }
                                    subtitle={`Cantidad en Stock: ${product.CANTIDAD}`}
                                    left={(props) => <Avatar.Icon key={ index} {...props} icon="folder" />}
                                    right={(props) => <IconButton key={ index } {...props} icon="dots-vertical" onPress={() => {}} />}
                                />
                            )
                        })
                    }
                </ScrollView>
            </View>
        </View>
        </>
    )
}

export default Home