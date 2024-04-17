import { ScrollView } from "react-native"
import loginStyle from "../../assets/styles/login"
import { List, Badge } from 'react-native-paper'

const ChatSelectMobile = ({ chats, user })=>{

    return(
        <ScrollView contentContainerStyle={ loginStyle.chatContactsSectionMobile }>
            <List.Section>
                <List.Subheader>Contactos</List.Subheader>
                {
                    chats.map((chat, index) =>{
                        let descrip
                        let countRead = 0
                        if(chat.messages[0]){
                            const findRead = chat.messages[0].filter( element => element.userSend != user.idusers && element.chatRead === 0 )
                            countRead = findRead.length
                            const lastMsg = chat.messages[0][chat.messages[0].length - 1].content
                            console.log(chat.messages[0][chat.messages[0].length - 2].content)
                            if(lastMsg){
                                descrip = lastMsg
                            }else{
                                descrip = ''
                            }
                        }

                        return (
                            <List.Item
                                style={[loginStyle.contact]}
                                rippleColor='silver'
                                key={ index }
                                onPress={()=>{
                                    console.log(chat.idchats)
                                }}
                                title={ chat.user.name }
                                description={ descrip }
                                right={ ()=> countRead > 0 && <Badge style={ { backgroundColor:'#F39C12' } }>{ countRead }</Badge> }
                                left={() => <List.Icon style={ { backgroundColor:'#8E44AD', width:40, height:40 } } color='#FFF' icon="account-supervisor" />} 
                            s/>
                        )
                    })
                }
            </List.Section>
        </ScrollView>
    )
}

export default ChatSelectMobile