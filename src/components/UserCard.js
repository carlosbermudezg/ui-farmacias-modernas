import { StyleSheet, View, Text } from 'react-native'
import { Card, IconButton, Avatar, TouchableRipple } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { setEditUser } from '../store/slices/users/editUser.slice'
import { useNavigation } from '@react-navigation/native'

const UserCard = ({user, changeUserStatus})=>{

    const dispatch = useDispatch()
    const navigation = useNavigation()

    let type, status

    if(user.type === 1){
        type = 'Médico'
    }else if(user.type === 2){
        type = 'Visitador Médico'
    }else if(user.type === 10){
        type = 'Administrador'
    }

    if(user.active === 1){
        status = 'Activo'
    }else{
        status = 'Inactivo'
    }

    return(
        <Card style={styles.card}>
            <View style={styles.cardContainer}>
                <View style={styles.image}>
                    <Avatar.Image size={56} source={require('../../public/avatar-image.jpg')} />
                </View>
                <View style={styles.data}>
                    <View>
                        <Text style={styles.title}>{ user.name }</Text>
                        <Text style={styles.title}>{ type }</Text>
                        <Text><Text style={styles.title}>Estado: </Text>{ status }</Text>
                    </View>
                </View>
                <Card.Actions style={styles.actions}>
                    <IconButton
                        style={styles.button}
                        icon="account-edit"
                        iconColor='#FFF'
                        size={12}
                        onPress={ ()=> {
                            dispatch(setEditUser(user))
                            navigation.navigate('EditUser')
                        }}
                    />
                    {
                        user.active != 1 ? 
                        <IconButton
                            style={styles.button}
                            icon="close"
                            iconColor='red'
                            size={12}
                            onPress={() => changeUserStatus(user.idusers, user.active)}
                        />:
                        <IconButton
                            style={styles.button}
                            icon="check"
                            iconColor='#FFF'
                            size={12}
                            onPress={() => changeUserStatus(user.idusers, user.active)}
                        />
                    }
                </Card.Actions>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    card:{
        width:'100%',
        height:90,
        padding:10,
    },
    cardContainer: {
        flexDirection:'row',
        gap: 5,
        height:'100%',
    },
    data:{
        flex:5,
    },
    title:{
        fontWeight:'bold'
    },
    actions:{
        flex:1,
    },
    image:{
        justifyContent:'center',
        alignItems:'center',
    },
    editText:{
        color:'#FFF'
    },
    button:{
        margin: 0,
        backgroundColor:'#9A5FE1',
        borderWidth: 1,
        borderColor:'#9A5FE1'
    }
})

export default UserCard