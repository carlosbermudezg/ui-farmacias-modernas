import { useState, useEffect, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import loginStyle from '../../assets/styles/login'
import { View, SafeAreaView, FlatList, TextInput, Pressable, Image } from 'react-native'
import { Icon, Text, Avatar } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import { useSocket } from '../utils/SocketContext'
import Message from '../components/Message'

const ChatMobile = ({ route })=>{

    const { chat } = route.params;
    const { user } = route.params;
    console.log(chat)
    console.log(user)

    const [chatRefresh, setChatRefresh] = useState(false)
    const [chatData, setChatData] = useState([])
    const [inputMessage, setInputMessage] = useState('')

    const [image, setImage] = useState(null)

    const { socket, message } = useSocket()

    const inputRef = useRef(null);

    useEffect(()=>{
        setChatData(chat.messages[0])
    },[chatRefresh])

    useEffect(()=>{
        if(message != null && message.idchat === chat.idchats){
            setChatData([...chatData, message])
        }
        if(message != null && message.idchat != chat.idchats){
            setChatRefresh(!chatRefresh)
        }
    },[message])

    const pickImage = async () => {
        if (Constants.platform.ios) {
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
          if (status !== 'granted') {
            alert('Lo siento, necesitamos permisos de la cámara para seleccionar imágenes.');
            return;
          }
        }
    
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
          setImage(result.assets[0]);
          // Aquí puedes enviar la imagen al servidor utilizando Axios u otra librería
        }
    } 

    const sendMsgEnter = (e)=>{
        if(e.nativeEvent.key === 'Enter'){
            sendMsg(chat.idchats, inputMessage)
            setInputMessage('')
            e.preventDefault()
            inputRef.current.focus()
        }
    }

    const sendMsg = async(chatId, msg)=>{
        const userLogged = await AsyncStorage.getItem('user')
        const userParsed = await JSON.parse(userLogged)
        const contenido =  {
            "idchat": chatId,
            "userSend": userParsed.idusers,
            "date": new Date().toLocaleDateString(),
            "content": msg,
            "read": 0,
            "image": image
        }
        const parseMessage = JSON.stringify(contenido)
        socket.emit('mensaje', parseMessage)
        setImage(null)
    }

    return(
        <View style={ loginStyle.chatContent }>
            <View style={ loginStyle.userNameChat}>
                <View style={ { backgroundColor:'#154360', padding:5, borderRadius:50, justifyContent:'center', alignItems:'center' } }>
                    <Icon
                        source="chat-processing"
                        color="#FFF"
                        size={20}
                    />
                </View>
                <Text style={ { color:'#1C2833', fontWeight:'bold' } }>
                    {
                        chat.user.name
                    }
                </Text>
            </View>
            <SafeAreaView style={ loginStyle.chatReading }>
                <FlatList                                      
                    contentContainerStyle={ [loginStyle.flatMessages, { flexDirection:'column-reverse' }] }
                    inverted
                    data={chatData}
                    renderItem={({item}) => 
                        <Message item={ item } user={ user } ></Message>
                    }
                />
            </SafeAreaView>
            <View style={ loginStyle.chatSending }>
                <TextInput
                    ref={inputRef}
                    placeholder='Escribe tu mensaje'
                    style={loginStyle.chatInput}
                    onKeyPress={(e) => {
                        sendMsgEnter(e)
                    }}
                    onChangeText={(value) =>{
                        setInputMessage(value)
                    }}
                    value={inputMessage}
                />
                {image && <Image source={{ uri: image.uri }} style={{ width: 40, height: 40 }} />}
                <Pressable
                    children={ ()=> <Avatar.Icon color='#8E44AD' style={ { backgroundColor:'#FFF', borderColor:'#8E44AD', borderWidth: 1 }} size={40} icon="attachment" /> }
                    onPress={pickImage}
                >
                </Pressable>
                <Pressable
                    android_ripple={ { color: '#AEB6BF' }}
                    children={ ()=> <Avatar.Icon size={40} icon="send"/> }
                    onPress={(e)=>{
                        inputRef.current.focus()
                        e.preventDefault()
                        sendMsg(chat.idchats, inputMessage)
                        setInputMessage('')
                    }}
                >
                </Pressable>
            </View>
        </View>
    )
}

export default ChatMobile