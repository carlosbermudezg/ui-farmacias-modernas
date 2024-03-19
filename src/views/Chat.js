import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { List, MD3Colors, Button } from 'react-native-paper'
import { View, Text, TextInput, Platform } from "react-native"
import loginStyle from "../../assets/styles/login"
import axios from 'axios'

const Chat = ()=>{

    const [chats, setChats] = useState([])
    const [simpleChats, setSimpleChats] = useState([])
    const [inputMessage, setInputMessage] = useState('')

    useEffect(() => {
        const getChats = async() =>{
            const userLogged = await AsyncStorage.getItem('user')
            const userParsed = await JSON.parse(userLogged)
            await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/chats/${userParsed.idusers}`)
            .then(async(response) =>{
                setSimpleChats(response.data)
            })
            .catch((error) => {
                console.log(error)
            } )
        }
        getChats()
    }, [])
    useEffect(() => {
        const setChatsAsync = async() => {
            simpleChats.map(async (chat) =>{
                const userData = await getUserChat(chat)
                setChats(...chats, [chat, userData])
            })
        }
        setChatsAsync()
    }, [simpleChats])

    const getUserChat = async(chat) =>{
        const userLogged = await AsyncStorage.getItem('user')
        const userParsed = await JSON.parse(userLogged)
        if(userParsed.idusers === chat.iduser1){
            const res = 
                await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/users/one/${chat.iduser2}`)
                    .then( (response) =>{
                        return response.data[0]
                    })
                    .catch( (error) => {
                        console.log(error)
                    } )
            return res
        }else{
            const res = 
                await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/users/one/${chat.iduser1}`)
                    .then( (response) =>{
                        return response.data[0]
                    })
                    .catch( (error) => {
                        console.log(error)
                    } )
            return res
        }
    }

    return(
        <>
        <View style={ loginStyle.loginWrap }>
            {
                Platform.OS === 'web' ?
                <View style={ loginStyle.chat }>
                    <View style={ loginStyle.chatContacts }>
                        <List.Section>
                            <List.Subheader>Chats</List.Subheader>
                            {
                                chats.map((chat, index) =>{
                                    console.log(chat)
                                    return (
                                        <List.Item key={ index } title={ chat?.userData?.name } left={() => <List.Icon icon="account-supervisor" />} />
                                    )
                                })
                            }
                        </List.Section>
                    </View>
                    <View style={ loginStyle.chatContent }>
                        <View style={ loginStyle.chatReading }>
                            <Text>
                                Hola
                            </Text>
                        </View>
                        <View style={ loginStyle.chatSending }>
                            <TextInput
                                placeholder='Escribe tu mensaje'
                                style={loginStyle.chatInput}
                                onChangeText={(value) =>{
                                    setInputMessage(value)
                                }}
                                value={inputMessage}
                            />
                            <Button icon="send" mode="contained" 
                                style={loginStyle.chatButton}
                                onPress={(e) => {
                                    e.preventDefault()
                                    navigation.navigate('Register')
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