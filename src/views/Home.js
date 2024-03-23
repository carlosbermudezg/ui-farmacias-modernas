import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Avatar, Card, IconButton, Button, Searchbar, DataTable, Icon, Text } from 'react-native-paper'
import { View, ScrollView, RefreshControl } from "react-native"
import homeStyle from "../../assets/styles/home"

const Home = ()=>{

    const [products, setProducts] = useState([])
    const [productsByCategory, setProductsByCategory] = useState([])
    const [categoryUser, setCategoryUser] = useState([])
    const [page, setPage] = useState(1)
    const [searchValue, setSearchValue] = useState('Buscar todos los productos')
    const [porcentaje, setPorcentaje] = useState(0)
    const [render, setRender] = useState(false)
    const [renderProducts, setRenderProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [changeCategory, setChangeCategory] = useState(false)
    const [limit] = useState(20)
    const [totalPages, setTotalPages] = useState(0)
    const [categories] = useState([
        {
            id: 149,
            name: "Comisiones",
            value: 15,
            color: '#F26524',
            icon: 'shield-star-outline'
        },
        {
            id: 188,
            name: "Dependencia",
            value: 3,
            color: '#f69a23',
            icon: 'arm-flex-outline'
        },
        {
            id: 194,
            name: "Competitivo",
            value: 3,
            color: '#f69a23',
            icon: 'arm-flex-outline'
        },
        {
            id: 205,
            name: "Genericos",
            value: 5,
            color: '#F57E25',
            icon: 'check-decagram-outline'
        },
        {
            id: 206,
            name: "Comerciales",
            value: 5,
            color: '#F57E25',
            icon: 'check-decagram-outline'
        },
        {
            id: 207,
            name: "Comerciales con más utilidad",
            value: 5,
            color: '#F57E25',
            icon: 'check-decagram-outline'
        }
    ])
    const [searchQuery, setSearchQuery] = useState('');

    const onRefresh = useCallback(() => {
        setIsLoading(true);
        setTimeout(() => {
        setIsLoading(false);
        }, 2000);
    }, []);

    useEffect(() => {
        const getSearchProduct = async()=>{
            const url = `${process.env.EXPO_PUBLIC_APISHEYLA_URL}/products/`
            const token = await AsyncStorage.getItem('token')
            const auth = {  headers: { Authorization: `Bearer ${token}` } }
            axios.get(url, auth)
            .then((response)=>{
                setRenderProducts(response.data.data.slice(0,20))
                setProducts(response.data.data)
                setTotalPages(Math.ceil(response.data.data.length / limit))
            })
            .catch((error)=>{
                console.log(error)
            })
        }
        getSearchProduct()
    }, [])

    useEffect(() => {

        const filterProducts = products.filter((element) => categoryUser[0].includes(element.CATEGORIA))
        setTotalPages(Math.ceil((filterProducts.length) / limit))
        const rendering = paginate(filterProducts, limit, page)
        setRenderProducts(rendering)
        setProductsByCategory(filterProducts)

    }, [changeCategory])

    const filterProductsByCategory = (value)=>{
        const filterCategory = categories.filter((element) => element.value === value )
        setCategoryUser(
            [
                filterCategory.map( element => element.id)
            ]
        )
        setChangeCategory(!changeCategory)
        setPage(1)
    }

    useEffect(() => {
        const validateRender = ()=>{
            if(searchQuery != ''){
                const filterProducts = products.filter( (product) => 
                product.PRODUCTO.toLowerCase().includes(searchQuery.toLowerCase())
                )
                const rendering = paginate(filterProducts, limit, page)
                setRenderProducts(rendering)
                console.log('query')
            }
            else if(categoryUser != ''){
                console.log(categoryUser)
                const filterCategory = categories.filter((element) => element.value === porcentaje )
                setCategoryUser(
                    [
                        filterCategory.map( element => element.id)
                    ]
                )
                setChangeCategory(!changeCategory)
            }else {
                const rendering = paginate(products, limit, page)
                setRenderProducts(rendering)
                setTotalPages(Math.ceil((products.length) / limit))
            }
        }
        validateRender()
    }, [render])

    const filterProducts = (searchValue)=>{ 
        setSearchQuery(searchValue)
        if(categoryUser != ''){
            const filterProducts = productsByCategory.filter( (product) => 
            product.PRODUCTO.toLowerCase().includes(searchValue.toLowerCase())
            )
            const totalPages = Math.ceil((filterProducts.length) / limit)
            setTotalPages(totalPages)
            setPage(1)
            const rendering = paginate(filterProducts, limit, page)
            setRenderProducts(rendering)
        }else {
            const filterProducts = products.filter( (product) => 
            product.PRODUCTO.toLowerCase().includes(searchValue.toLowerCase())
            )
            const totalPages = Math.ceil((filterProducts.length) / limit)
            setTotalPages(totalPages)
            setPage(1)
            const rendering = paginate(filterProducts, limit, page)
            setRenderProducts(rendering)
        }
    }

    function paginate(array, page_size, page_number) {
        return array.slice((page_number - 1) * page_size, page_number * page_size);
    }

    const prev = ()=>{
        if(page <= 1) return
        setPage(page - 1)
        setRender(!render)
    }
    const next = ()=>{
        if(page >= totalPages) return
        setPage(page + 1)
        setRender(!render)
    }

    const getAll = ()=>{
        setSearchQuery('')
        setCategoryUser([])
        setPage(1)
        setRender(!render)
    }

    return(
        <>
        <View style={ homeStyle.homeWrap }>
            <View style={ homeStyle.homeContent }>
                <View style={ homeStyle.filterContainer }>
                    <View style={ homeStyle.categories }>
                        <Button 
                            buttonColor='#f69a23'
                            icon="arm-flex-outline"
                            style={ [homeStyle.buttonCategory] } 
                            mode="contained" 
                            onPress={() => {
                                setSearchValue('Buscar en categoria del 3%')
                                filterProductsByCategory(3)
                                setPorcentaje(3)
                            }}>
                            3%
                        </Button>
                        <Button 
                            buttonColor='#F57E25'
                            icon="check-decagram-outline"
                            style={ [homeStyle.buttonCategory] } 
                            mode="contained" 
                            onPress={() => {
                                setSearchValue('Buscar en categoria del 5%')
                                filterProductsByCategory(5)
                                setPorcentaje(5)
                            }}>
                            5%
                        </Button>
                        <Button 
                            buttonColor='#F26524'
                            icon="shield-star-outline"
                            style={ [homeStyle.buttonCategory] } 
                            mode="contained" 
                            onPress={() => {
                                setSearchValue('Buscar en categoria del 15%')
                                filterProductsByCategory(15)
                                setPorcentaje(15)
                            }}>
                            15%
                        </Button>
                        <Button 
                            buttonColor='#662D91'
                            icon="all-inclusive"
                            style={ [homeStyle.buttonCategory] } 
                            mode="contained" 
                            onPress={() => {
                                setSearchValue('Buscar todos los productos')
                                getAll()
                            }}
                        >
                            Todos
                        </Button>
                    </View>
                    <Searchbar
                        style={ homeStyle.searchInput }
                        placeholder={ searchValue }
                        onChangeText={(value)=>{
                            filterProducts(value)
                        }}
                        value={searchQuery}
                    />
                </View>
                <ScrollView contentContainerStyle={ homeStyle.table }
                    refreshControl={
                        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
                      }
                >
                    {
                        Platform.OS === 'web'?
                        <DataTable>
                            <DataTable.Header>
                            <DataTable.Title>Porcentaje</DataTable.Title>
                                <DataTable.Title>Producto</DataTable.Title>
                                <DataTable.Title numeric>Stock</DataTable.Title>
                            </DataTable.Header>
                                {
                                    renderProducts.map((product, index)=>{
                                        const category = categories.find((element) => element.id == product.CATEGORIA);
                                        const porcentaje = category === undefined ? '0%' : `${ category.value }%`
                                        return(
                                            <DataTable.Row key={index}>
                                            <DataTable.Cell>
                                                {/* <Chip 
                                                    textStyle={ { color:'#fff' } } 
                                                    style={ { backgroundColor: category === undefined ? '#662D91' : category.color } } 
                                                    icon={ category === undefined ? 'all-inclusive' : category.icon } 
                                                    onPress={() => console.log('Pressed')}
                                                >
                                                    { porcentaje }
                                                </Chip> */}
                                                <Button 
                                                    style={ { backgroundColor: category === undefined ? '#662D91' : category.color, borderRadius: 5 } }
                                                    icon={ category === undefined ? 'all-inclusive' : category.icon }  mode="contained"
                                                >
                                                    { porcentaje }
                                                </Button>
                                            </DataTable.Cell>
                                            <DataTable.Cell style={ homeStyle.producto }>{ product.PRODUCTO }</DataTable.Cell>
                                            <DataTable.Cell numeric>{ product.CANTIDAD }</DataTable.Cell>
                                            </DataTable.Row>
                                        )
                                    })
                                }
                        </DataTable>:
                        renderProducts.map((product, index)=>{
                            const category = categories.find((element) => element.id == product.CATEGORIA);
                                return(
                                    <Card.Title style={ homeStyle.productCard } key={ index }
                                        title={ product.PRODUCTO }
                                        subtitle={`Cantidad en Stock: ${product.CANTIDAD}`}
                                        left={(props) => <Avatar.Icon key={ index} {...props} icon="folder" />}
                                        right={(props) => <IconButton key={ index } {...props} icon="dots-vertical" onPress={() => {}} />}
                                    />
                                )
                        })
                    }
                </ScrollView>
                <View style={ homeStyle.pagination }>
                    <Button 
                        disabled={ page === 1 }
                        style={ homeStyle.paginationButtons }
                        mode="outlined" 
                        onPress={() => {
                            setPage(1)
                            setRender(!render)
                        }}>
                        <Icon
                            source="chevron-double-left"
                            size={20}
                        />
                    </Button>
                    <Button 
                        style={ homeStyle.paginationButtons }
                        mode="outlined" 
                        onPress={() => prev()}>
                        <Icon
                            source="arrow-left"
                            size={20}
                        />
                    </Button>
                    <Text variant="titleMedium">Pagina: { page } de { totalPages }</Text>
                    <Button 
                        style={ homeStyle.paginationButtons }
                        mode="outlined" 
                        onPress={() => next()}>
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
                            setPage(totalPages)
                            setRender(!render)
                        }}>
                        <Icon
                            source="chevron-double-right"
                            size={20}
                        />
                    </Button>
                </View>
            </View>
        </View>
        </>
    )
}

export default Home