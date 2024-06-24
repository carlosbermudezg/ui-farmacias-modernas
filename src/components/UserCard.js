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
            <View style={styles.data}>
                <View style={styles.image}>
                    <Avatar.Image size={32} source={require('../../public/avatar-image.jpg')} />
                </View>
                <View>
                    <Text><Text style={styles.title}>Nombre: </Text>{ user.name }</Text>
                    <Text><Text style={styles.title}>Usuario: </Text>{ user.username }</Text>
                    <Text><Text style={styles.title}>Telefono: </Text>{ user.telefono }</Text>
                    <Text><Text style={styles.title}>Tipo: </Text>{ type }</Text>
                    <Text><Text style={styles.title}>Estado: </Text>{ status }</Text>
                </View>
            </View>
            <Card.Actions style={styles.actions}>
                <TouchableRipple
                    style={styles.editButton} 
                    rippleColor="rgba(0, 0, 0, .32)" 
                    onPress={ ()=> {
                        dispatch(setEditUser(user))
                        navigation.navigate('EditUser')
                    }}
                >
                    <Text style={styles.editText}>Editar</Text>
                </TouchableRipple>
                {
                    user.active != 1 ? 
                        <IconButton
                            icon="account-off"
                            iconColor='red'
                            size={20}
                            onPress={() => changeUserStatus(user.idusers, user.active)}
                        />:
                        <IconButton
                            icon="account-check"
                            iconColor='green'
                            size={20}
                            onPress={() => changeUserStatus(user.idusers, user.active)}
                        />
                }
            </Card.Actions>
        </Card>
    )
}

const styles = StyleSheet.create({
    card:{
        width:250,
        maxWidth:250,
        height:200,
        alignItems:'center',
        justifyContent:'center'
    },
    data:{
        width:230,
        height:140
    },
    title:{
        fontWeight:'bold'
    },
    actions:{
        width:230,
        height:40
    },
    editButton: {
        backgroundColor:'#7A428D',
        padding:7,
        borderRadius:5,
        borderWidth:1,
        borderColor:'#D7BDE2'
    },
    image:{
        justifyContent:'center',
        alignItems:'center'
    },
    editText:{
        color:'#FFF'
    }
})

export default UserCard