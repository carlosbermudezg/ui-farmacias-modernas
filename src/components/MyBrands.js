import { Modal, Portal, Button, Badge} from 'react-native-paper'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedBrands } from '../store/slices/register/selectedBrands.slice'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import SelectedBrandItems from './SelectedBrandItems'

const MyBrands = () => {
  const [visible, setVisible] = useState(false)

  const dispatch = useDispatch()
  const selectedBrands = useSelector( state => state.selectedBrands)

  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)
  const containerStyle = {backgroundColor: 'white', padding: 20}

  const styles = StyleSheet.create({
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
    <>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <ScrollView style={ styles.brandsSelector }>
          {
            selectedBrands.length < 1 ? <Text>Sin Marcas seleccionadas</Text> : false
          }
          {
            selectedBrands.map((brand, index)=>{
                const validate = true
                return(
                    <SelectedBrandItems
                        key={index} 
                        brand={brand} 
                        validate={validate} 
                        onPress={ ()=> {
                            if(validate) {
                                const newFilter = selectedBrands.filter( element => element.marca_ID != brand.marca_ID )
                                dispatch(setSelectedBrands(newFilter))
                            }else{
                                dispatch(setSelectedBrands([...selectedBrands, brand]))
                            }
                        }}
                    ></SelectedBrandItems>
                )
            })
          }
        </ScrollView>
        </Modal>
      </Portal>
      <View style={ { flexDirection:'row', backgroundColor:'#BB8FCE', borderRadius:5, padding:4} }>
        <Button textColor='#FFF' buttonColor='#BB8FCE' style={ { borderRadius:5 } } onPress={showModal}>
            Marcas seleccionadas 
        </Button>
        <Badge style={ { width:20, height:20, borderRadius:5, alignSelf:'center', backgroundColor:'#E74C3C' } }>{ selectedBrands.length }</Badge>
      </View>
    </>
  );
};

export default MyBrands;