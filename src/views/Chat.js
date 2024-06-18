import { useState, useEffect, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { List, Badge, Icon, Avatar, Text } from 'react-native-paper'
import { View, TextInput, Platform, ScrollView, SafeAreaView, FlatList, Pressable, Image } from "react-native"
import loginStyle from "../../assets/styles/login"
import axios from 'axios'
import Navbar from '../components/Navbar'
import { useSocket } from '../utils/SocketContext'
import Message from '../components/Message'
import ChatSelectMobile from './ChatSelectMobile'

import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'

const Chat = ({navigation, route})=>{

    const [chats, setChats] = useState([])
    const [user, setUser] = useState({})
    const [chatSelected, setChatSelected] = useState(0)
    const [chatRefresh, setChatRefresh] = useState(false)
    const [chatData, setChatData] = useState([])
    const [inputMessage, setInputMessage] = useState('')

    const [image, setImage] = useState(null)

    const { socket, message } = useSocket()

    const inputRef = useRef(null);

    useEffect(()=>{
        if(message != null && message.idchat === chatSelected){
            setChatData([...chatData, message])
        }
        if(message != null && message.idchat != chatSelected){
            setChatRefresh(!chatRefresh)
        }
    },[message])

    useEffect(() => {
        const getChats = async() =>{
            const userLogged = await AsyncStorage.getItem('user')
            const userParsed = await JSON.parse(userLogged)
            setUser(userParsed)
            await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/chats/?id=${userParsed.idusers}`)
            .then(async(response) =>{
                const orderChatData = response.data.sort((a, b) => a.idchats - b.idchats)
                setChats(orderChatData)
            })
            .catch((error) => {
                console.log(error)
            } )
            selectChat(chatSelected)
        }
        getChats()
    }, [chatSelected, chatRefresh])

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

    const selectChat = (idchat)=>{
        const c = chats.find( chat => chat.idchats === idchat )
        if( c.messages != '' ){
            const findUnRead = c.messages[0].filter( element => element.userSend != user.idusers && element.chatRead === 0 )
            findUnRead.map(async(element)=>{
                await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/chats/updateMessage/${element.idmessages}`)
                .then(() =>{
                    console.log('mensajes actualizados')
                })
                .catch((error) => {
                    console.log(error)
                })
            })
            setChatData(c.messages[0])
        } else {
            setChatData([])
        }
    }

    const sendMsgEnter = (e)=>{
        if(e.nativeEvent.key === 'Enter'){
            sendMsg(chatSelected, inputMessage)
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
        <>
        <Navbar navigation={ navigation } route={ route.name } ></Navbar>
        <View style={ loginStyle.chatWrap }>
            {
                Platform.OS === 'web' ?
                <View style={ loginStyle.chat }>
                    <View style={ loginStyle.chatContacts }>
                        <View style={ loginStyle.userChat }>
                            <View style={ { backgroundColor:'#154360', padding:5, borderRadius:50, justifyContent:'center', alignItems:'center' } }>
                                <Icon
                                    source="account"
                                    color="#FFF"
                                    size={20}
                                />
                            </View>
                            <Text style={ { color:'#1C2833', fontWeight:'bold' } }>{user.name}</Text>
                        </View>
                        <ScrollView contentContainerStyle={ loginStyle.chatContactsSection }>
                            <List.Section>
                                <List.Subheader>Contactos</List.Subheader>
                                {
                                    chats.map((chat, index) =>{
                                        let descrip
                                        let countRead = 0
                                        if(chat.messages[0]){
                                            const findRead = chat.messages[0].filter( element => element.userSend != user.idusers && element.chatRead === 0 )
                                            countRead = findRead.length
                                            const lastMsg = chat?.messages[0][chat?.messages[0]?.length - 1].content
                                            if(lastMsg){
                                                descrip = lastMsg
                                            }else{
                                                descrip = ''
                                            }
                                        }

                                        return (
                                            <List.Item
                                                style={[loginStyle.contact, { backgroundColor: chatSelected === chat.idchats ? '#EAECEE':'transparent' }]}
                                                key={ index } 
                                                onPress={()=>{
                                                    setChatSelected(chat.idchats)
                                                }} 
                                                title={ chat.user.name }
                                                description={ descrip }
                                                right={ ()=> countRead > 0 && <Badge style={ { backgroundColor:'#F39C12' } }>{ countRead }</Badge> }
                                                left={() => <List.Icon style={ { backgroundColor:'#8E44AD', borderRadius:'50%', width:40, height:40 } } color='#FFF' icon="account-supervisor" />} 
                                            s/>
                                        )
                                    })
                                }
                            </List.Section>
                        </ScrollView>
                    </View>
                    {
                        chatSelected != 0 ? 
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
                                            chats.find(element => element.idchats === chatSelected).user.name
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
                                            sendMsg(chatSelected, inputMessage)
                                            setInputMessage('')
                                        }}
                                    >
                                    </Pressable>
                                </View>
                            </View> : 
                            <View style={ loginStyle.noChatSelected }>
                                <Icon
                                    source="inbox-full"
                                    color="#FFF"
                                    size={60}
                                />
                            </View>
                    }
                </View> : 
                // Phone View
                <ChatSelectMobile 
                    navigation={ navigation }
                    chats={ chats } 
                    user={ user }
                ></ChatSelectMobile>
            }
            
            {
                
            }
        </View>
        </>
    )
}

export default Chat