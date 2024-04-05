import { View, Text, Image } from "react-native"
import loginStyle from "../../assets/styles/login"
import Navbar from "../components/Navbar"

const Users = ({ navigation, route })=>{
    return(
        <>
        <Navbar navigation={ navigation } route={ route.name } ></Navbar>
        <View style={ loginStyle.loginWrap }>
            <Text>
                Users
            </Text>
        </View>
        </>
    )
}

export default Users