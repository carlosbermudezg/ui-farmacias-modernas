import { View, Text } from "react-native"
import loginStyle from "../../assets/styles/login"
import Navbar from "../components/Navbar"

const RendimientoMedico = ({ navigation, route })=>{
    return(
        <>
        <Navbar navigation={ navigation } route={ route.name } ></Navbar>
        <View style={ loginStyle.loginWrap }>
            <Text>
                Rendimiento Médico
            </Text>
        </View>
        </>
    )
}

export default RendimientoMedico