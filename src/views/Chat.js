import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { List, Button } from 'react-native-paper'
import { View, Text, TextInput, Platform } from "react-native"
import loginStyle from "../../assets/styles/login"
import axios from 'axios'
import Navbar from '../components/Navbar'
import { useSocket } from '../utils/SocketContext'

const Chat = ({navigation, route})=>{

    const [chats, setChats] = useState([])
    const [chatSelected, setChatSelected] = useState(0)
    const [chatData, setChatData] = useState([])
    const [inputMessage, setInputMessage] = useState('')

    const { socket, message } = useSocket()

    useEffect(()=>{
        if(message != null){
            setChatData(message.content)
        }
    },[message])

    useEffect(() => {
        const getChats = async() =>{
            const userLogged = await AsyncStorage.getItem('user')
            const userParsed = await JSON.parse(userLogged)
            await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/chats/?id=${userParsed.idusers}`)
            .then(async(response) =>{
                const orderChatData = response.data.sort((a, b) => a.idchats - b.idchats)
                setChats(orderChatData)
            })
            .catch((error) => {
                console.log(error)
            } )
        }
        getChats()
    }, [chatSelected])

    const selectChat = (idchat)=>{
        setChatSelected(idchat)
        const c = chats.find( chat => chat.idchats === idchat )
        console.log(c)
        if( c.content != '' ){
            const parseChat = JSON.parse(c.content)
            setChatData(parseChat)
        } else {
            setChatData([])
        }
    }

    const sendMsgEnter = (key)=>{
        if(key === 'Enter'){
            sendMsg(chatSelected, inputMessage)
            setInputMessage('')
        }
    }

    const sendMsg = async(chatId, msg)=>{
        const userLogged = await AsyncStorage.getItem('user')
        const userParsed = await JSON.parse(userLogged)
        const contenido = {
            fechaHora : "fecha",
            userSend : userParsed.idusers,
            message : msg
        }
        let data
        if(chatData != ''){
            data = {
                idchats : chatId,
                content : [...chatData, contenido]
            }
        }else{
            data = {
                idchats : chatId,
                content : [contenido]
            }
        }
        socket.emit('mensaje', data, contenido.userSend)
    }

    return(
        <>
        <Navbar navigation={ navigation } route={ route.name } ></Navbar>
        <View style={ loginStyle.loginWrap }>
            {
                Platform.OS === 'web' ?
                <View style={ loginStyle.chat }>
                    <View style={ loginStyle.chatContacts }>
                        <List.Section>
                            <List.Subheader>Chats</List.Subheader>
                            {
                                chats.map((chat, index) =>{
                                    return (
                                        <List.Item 
                                            key={ index } 
                                            onPress={()=>{
                                                selectChat(chat.idchats)
                                            }} 
                                            title={ chat.user.name } 
                                            left={() => <List.Icon icon="account-supervisor" />} 
                                        s/>
                                    )
                                })
                            }
                        </List.Section>
                    </View>
                    <View style={ loginStyle.chatContent }>
                        <View style={ loginStyle.chatReading }>
                            {
                                chatData?.map((element, index)=>{
                                    return(
                                        <Text key={index}>
                                            { element?.message }
                                        </Text>
                                    )
                                })
                            }
                        </View>
                        <View style={ loginStyle.chatSending }>
                            <TextInput
                                placeholder='Escribe tu mensaje'
                                style={loginStyle.chatInput}
                                onKeyPress={(e) => {
                                    sendMsgEnter(e.nativeEvent.key)
                                }}
                                onChangeText={(value) =>{
                                    setInputMessage(value)
                                }}
                                value={inputMessage}
                            />
                            <Button icon="send" mode="contained" 
                                style={loginStyle.chatButton}
                                onPress={(e) => {
                                    e.preventDefault()
                                    sendMsg(chatSelected, inputMessage)
                                    setInputMessage('')
                                }}>
                                Enviar
                            </Button>
                        </View>
                    </View>
                </View> : 
                // Phone View
                <Text>Android</Text>
            }
            
            {
                
            }
        </View>
        </>
    )
}

export default Chat