import drawerStyle from "../../assets/styles/drawerStyle"
import { View } from "react-native"
import { Icon, Text, FAB } from "react-native-paper"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"
import { useEffect, useState } from "react"

const DrawerContent = (props)=>{

    const [user, setUser] = useState({})

    useEffect(()=>{
        async function getUser(){
            const userLogged = await AsyncStorage.getItem('user')
            const response = JSON.parse(userLogged)
            setUser(response)
        }
        getUser()
    },[])

    return(
        <View style={ drawerStyle.container }>
            <View style={ drawerStyle.header }>
                <View style={ drawerStyle.userIcon }>
                    <Icon
                        source="account"
                        color={'#fff'}
                        size={20}
                    />
                </View>
                <View style={ drawerStyle.userData }>
                    <Text variant="titleMedium" >Bienvenid@</Text>
                    <Text variant="bodySmall">{ user.name }</Text>
                </View>
            </View>
            <DrawerContentScrollView style= { drawerStyle.menu } {...props}>
                <DrawerItemList  {...props}>
                </DrawerItemList>
            </DrawerContentScrollView>
            <View style={ drawerStyle.footer }>
                <Text variant="titleMedium">Cerrar Sesión</Text>
                <FAB
                    style={ { justifyContent:'center', backgroundColor:'#662D91', width:50, maxHeight: 50, borderRadius:100 } }
                        icon='logout'
                        color='#FFF'
                        rippleColor='white'
                        onPress={() => {
                            props.navigation.navigate('Salir')
                        }
                    }
                />
            </View>
        </View>
    )
}
export default DrawerContent