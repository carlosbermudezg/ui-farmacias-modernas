import { View, Text, Image } from "react-native"
import loginStyle from "../../assets/styles/login"
const LogoFarmaciasLopez =  require('../../public/farmacias-lopez.jpg')

const Permisos = ()=>{
    return(
        <>
        <View style={loginStyle.mainContainer}>
            <Image
                style={ loginStyle.logo }
                source={ LogoFarmaciasLopez } 
            />
        </View>
        <View style={ loginStyle.loginWrap }>
            <Text>
                Permisos
            </Text>
        </View>
        </>
    )
}

export default Permisos