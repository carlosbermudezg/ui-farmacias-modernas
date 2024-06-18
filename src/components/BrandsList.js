import { View, StyleSheet, TouchableOpacity , Text, ScrollView} from 'react-native'
import { Icon } from 'react-native-paper'
import { useState, useEffect } from 'react'
import SearchBox from './SearchBox'
import { setSelectedBrands } from '../store/slices/register/selectedBrands.slice'
import { useDispatch, useSelector } from 'react-redux'
import { getBrandsThunk } from '../store/slices/brands.slice'

const BrandsList = () => {

    const [filteredBrands, setFilteredBrands] = useState([])
    const selectedBrands = useSelector( state => state.selectedBrands)
    const brands = useSelector( state => state.brands)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getBrandsThunk())
    },[])

    const filterBrands = (search)=>{
        if(search == '') {
            setFilteredBrands([])
            return
        }
        const q = brands.filter( brand => brand.marca_NOMBRE.toLowerCase().includes(search.toLowerCase()) )
        setFilteredBrands(q)
    }

    const styles = StyleSheet.create({
        container:{
            backgroundColor:'#7A428D',
            padding:10,
            borderRadius:5,
            marginBottom:30
        },
        brandsSelector:{
            borderRadius:5,
            padding:5,
            maxHeight:200
        },
        brandItem:{
            flexDirection:'row',
            justifyContent:'space-between',
            margin:2,
            padding:5,
            borderRadius:5,
            borderWidth:1,
            borderColor:'#D7BDE2'
        }
    })

    return (
        <View style={styles.container}>
            <SearchBox
                onChange={ (value) => filterBrands(value) }
            ></SearchBox>
            <ScrollView style={ styles.brandsSelector }>
            {
                filteredBrands.map( (brand, index) => {
                    const validate = selectedBrands.some(selected => selected.marca_ID === brand.marca_ID)
                    return(
                        <TouchableOpacity key={index} style={[styles.brandItem, { backgroundColor: validate ? '#E74C3C' : '#BB8FCE' }]}
                            onPress={ ()=> {
                                if(validate) {
                                    const newFilter = selectedBrands.filter( element => element.marca_ID != brand.marca_ID )
                                    dispatch(setSelectedBrands(newFilter))
                                }else{
                                    dispatch(setSelectedBrands([...selectedBrands, brand]))
                                }
                            }}
                        >
                            <Text style={ { color:'#FFF', alignSelf:'center' } }>{brand.marca_NOMBRE}</Text>
                            <Icon
                                source={ validate ? 'close' : 'plus' }
                                color="#FFF"
                                size={15}
                            />
                        </TouchableOpacity>
                    )
                })
            }
            </ScrollView>
            {
                selectedBrands.length < 1 && <Text style={ { color:'#FFF',alignSelf:'center' } }>No has seleccionado ninguna marca</Text>
            }
        </View>
    )
}

export default BrandsList;