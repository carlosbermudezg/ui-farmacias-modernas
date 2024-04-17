import { useState } from 'react'
import loginStyle from '../../assets/styles/login'
import { View, SafeAreaView, FlatList, TextInput, Pressable } from 'react-native'
import { Icon, Text, Avatar } from 'react-native-paper'

const ChatMobile = ({ chat, sendMsg })=>{
    const [inputText, setInputText] = useState('')

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
                    // onKeyPress={(e) => {
                    //     sendMsgEnter(e)
                    // }}
                    onChangeText={(value) =>{
                        setInputText(value)
                    }}
                    value={inputText}
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
                        setInputText('')
                    }}
                >
                </Pressable>
            </View>
        </View>
    )
}

export default ChatMobile