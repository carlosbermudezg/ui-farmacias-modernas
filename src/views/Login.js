import { View, Text, Image, TextInput, ScrollView } from "react-native"
import Button from "../components/Button"
import loginStyle from "../../assets/styles/login"
const LogoFarmaciasModernas = require('../../public/farmacias-modernas.jpeg')
const LogoFarmaciasLopez =  require('../../public/farmacias-lopez.jpg')

const Login = ({navigation})=>{

    return(
        <>
        <View style={loginStyle.mainContainer}>
            <Image
                style={ loginStyle.logo }
                source={ LogoFarmaciasLopez } 
            />
        </View>
        <View style={ loginStyle.loginWrap }>
            <ScrollView contentContainerStyle={ loginStyle.loginContainer }>
                <View style={ loginStyle.loginForm }>
                    <Image
                        style={ loginStyle.logo1 }
                        source={ LogoFarmaciasModernas }  
                    />
                    <TextInput style= { loginStyle.loginInput } placeholder="Ingresa tu usuario"></TextInput>
                    <TextInput secureTextEntry={true} style= { loginStyle.loginInput } placeholder="Ingresa tu contraseña"></TextInput>
                    <Button buttonText="Entrar" 
                        callback={ ()=> navigation.navigate('Main') }
                    >
                    </Button>
                </View>
                <Text style={loginStyle.title}>¿No tienes cuenta?</Text>
                <Button buttonText="Registrarse"></Button>
            </ScrollView>
        </View>
        </>
    )
}

export default Login