import { View, Text, Image, Pressable, Alert, Button } from "react-native"
import loginStyle from "../../../assets/styles/login"
import { Appbar, TextInput, Avatar, List, Modal } from "react-native-paper"
import ProductsSearchReceta from "../productsSearchReceta"
import Pagination from "../Pagination"
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { setSearchQuery } from "../../store/slices/searchQuery.slice"
import { setPage } from "../../store/slices/page.slice"
import axios from "axios"
import ModalCantidad from "../../components/ModalCantidad"
import AsyncStorage from "@react-native-async-storage/async-storage"
import SelectDoctor from "./components/SelectDoctor"
import { DateFormat } from "../../utils/FormatDate"
import { setRecetaUser } from "../../store/slices/recetas/recetaUser.slice"

const AddReceta = ({ navigation })=>{

    const dispatch = useDispatch()
    const searchQuery = useSelector( state => state.searchQuery )

    const containerStyle = {backgroundColor: 'white', padding: 20, width:'90%', alignSelf:'center', gap:10};

    // Estados del modal para definir la cantidad del producto seleccionado
    const [visible, setVisible] = useState(false);
    const [doctorVisible, setDoctorVisible] = useState(false)
    const [visibleModal, setVisibleModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const [searchValue, setSearchValue] = useState('Buscar todos los medicamentos')
    const [image, setImage] = useState(null)
    const [medicamentos, setMedicamentos] = useState([])
    const [doctor, setDoctor] = useState(0)
    const [renderDoctor, setRenderDoctor ] = useState([])
    const [doctorSearch, setDoctorSearch] = useState('')
    const [num, setNum] = useState('')
    const selectedUser = useSelector(state=> state.recetaUser)

    useEffect(()=>{
        const search = async()=>{
            const token = await AsyncStorage.getItem('token')
            if(doctorSearch!= ''){
                axios.get(`${process.env.EXPO_PUBLIC_API_URL}/users/usersBySearch/?search=${doctorSearch}`, { 
                    headers: {
                        Authorization: `Bearer ${token}`
                        } 
                    })
                    .then( response => setRenderDoctor(response.data.data) )
                    .catch( error => console.log( error ) )
            }else{
                setRenderDoctor([])
            }
        }
        search()
    },[doctorSearch])

    const pickImage = async () => {
        if (Constants.platform.ios) {
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
          if (status !== 'granted') {
            alert('Lo siento, necesitamos permisos de la cámara para seleccionar imágenes.');
            return;
          }
        }

        // Allow the user to choose between camera and gallery
        // let result
        // Alert.alert('Seleccionar imagen', '¿Qué deseas hacer?', [
        //     { text: 'Abrir cámara', onPress: async () => {
        //     result = await ImagePicker.launchCameraAsync({
        //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
        //         allowsEditing: false,
        //         quality: 1,
        //     });
        //     if (!result.canceled) {
        //         setImage(result.assets[0]);
        //     }
        //     }},
        //     { text: 'Seleccionar de galería', onPress: async () => {
        //     result = await ImagePicker.launchImageLibraryAsync({
        //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
        //         allowsEditing: false,
        //         quality: 1,
        //     });
        //     if (!result.canceled) {
        //         setImage(result.assets[0]);
        //     }
        //     }},
        //     { text: 'Cancelar', style: 'cancel' },
        // ]);
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            // aspect: [16, 9],
            quality: 1,
        })
        if (!result.canceled) {
            console.log(result.assets[0])
            setImage(result.assets[0]);
            // Aquí puedes enviar la imagen al servidor utilizando Axios u otra librería
        }
    }

    const save = async()=>{
        if(!selectedUser.idusers) {
            Alert.alert("Debe seleccionar un usuario")
            return
        }
        if(num == '') {
            Alert.alert("Escriba un número de receta")
            return
        }
        const user = await AsyncStorage.getItem('user')
        const userParsed = JSON.parse(user)
        const token = await AsyncStorage.getItem('token')
        const receta = {
            "iduser": selectedUser.idusers,
            "idusercreate": userParsed.idusers,
            "numReceta": num,
            "fechaHora": DateFormat(new Date()),
            "image": JSON.stringify(image),
            "medicamentos": medicamentos
        }
        console.log(receta)
        await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/recetas`, receta, { 
            headers: {
                Authorization: `Bearer ${token}`
                }
            })
        .then( response => {
            Alert.alert('La receta se agregó correctamente')
            setImage(null)
            setNum('')
            setMedicamentos([])
            dispatch(setRecetaUser({}))
            dispatch(setSearchQuery(''))
        })
        .catch( error => console.log( error ) )
    }

    return(
        <>
        <Appbar.Header style={ { backgroundColor:'#662D91' } }>
            <Appbar.BackAction color="#FFF" onPress={() => { 
                setImage(null)
                setDoctor({})
                setMedicamentos([])
                navigation.navigate('RecetasMonth')
            }} />
            <View style={ { flex:1 } }>
                <Text style={ { color:'#FFF', fontSize:18 } }>Nueva Receta</Text>
                {
                    <Text style={ { color:'#FFF', fontSize:10 } }>{selectedUser.name ? selectedUser.name : 'Selecciona un doctor'}</Text>
                }
            </View>
            <Appbar.Action iconColor='#fff' icon="doctor" 
                style={{right:0}}
                onPress={() => { setDoctorVisible(true) }} 
            />
            <Appbar.Action iconColor='#fff' icon="clipboard-list-outline" 
                onPress={() => { setVisibleModal(true) }} 
            />
            <Appbar.Action iconColor='#fff' icon="content-save-outline" 
                onPress={() => { save() }} 
            />
        </Appbar.Header>
        <View style={ loginStyle.loginWrap }>
            <View style={ { width:'95%', gap:15, marginBottom:10, flex:1 } }>
                <View>
                    <Text>
                        Número de receta:
                    </Text>
                    <TextInput
                        mode="outlined"
                        label="Ej: 24520"
                        placeholder=""
                        onChangeText={(value)=>{
                            setNum(value)
                        }}
                        value={num}
                    />
                </View>
                <View style={ { flexDirection:'row', justifyContent:'space-between' } }>
                    <Text>
                        Foto de la Receta:
                    </Text>
                    {image && <Image source={{ uri: image.uri }} style={{ width: 40, height: 40 }} />}
                    <Pressable
                        children={ ()=> <Avatar.Icon color='#8E44AD' style={ { backgroundColor:'#FFF', borderColor:'#8E44AD', borderWidth: 1 }} size={40} icon="attachment" /> }
                        onPress={pickImage}
                    ></Pressable>
                </View>
                <View>
                    <Text>
                        Medicamentos:
                    </Text>
                    <TextInput
                        autoFocus={true}
                        placeholder={ searchValue }
                        onChangeText={(value)=>{
                            dispatch( setPage( 1 ) )
                            dispatch(setSearchQuery(value))
                        }} 
                        value={searchQuery}
                        mode="outlined"
                        label="Buscar medicamento"
                        right={<TextInput.Affix text="/100" />}
                    />
                </View>
                <View style={ [{ width:'100%', flex: 1.5 } ] }>
                    <ProductsSearchReceta showModal={showModal} setModalData={setModalData}></ProductsSearchReceta>
                </View>
            </View>
            <View style={ { width:'100%', flex:0.2 } }>
                <Pagination></Pagination>
            </View>
        </View>
        <ModalCantidad medicamentos={ medicamentos } setMedicamentos={ setMedicamentos } modalData={modalData} visible={visible} hideModal={hideModal} ></ModalCantidad>
        <Modal visible={visibleModal} onDismiss={()=> setVisibleModal(false) } contentContainerStyle={containerStyle}>
            <Text>Medicamentos de la receta</Text>
            <View style={ { gap:10 } }>
                {
                    medicamentos.map((medicamento, index)=>{
                        return(
                            <View key={index} style={ { flexDirection:'row', width:'100%', justifyContent:'space-between' } }>
                                <Text key={index+1} style={{ borderWidth:0.5, padding:5, flex:4 }}>{ medicamento.nombre }</Text>
                                <Text key={index+2} style={{ borderWidth:0.5, padding:5, flex:1 }}>{ medicamento.cantidad }</Text>
                                <Button
                                    key={index+3}
                                    onPress={()=>{
                                        setMedicamentos(
                                            medicamentos.filter((element)=> element.id_producto != medicamento.id_producto)
                                        )
                                    }}
                                    title="X"
                                    color="red"
                                />
                            </View>
                        )
                    })
                }
            </View>
            <Button
                onPress={()=> setVisibleModal(false)}
                title="Confirmar"
                color="#841584"
            />
        </Modal>
        <SelectDoctor visible={doctorVisible} setVisible={setDoctorVisible}></SelectDoctor>
        </>
    )
}

export default AddReceta