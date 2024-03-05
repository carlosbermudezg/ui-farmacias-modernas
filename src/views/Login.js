import { View, Text, Image, TextInput, Pressable, ScrollView } from "react-native"
import loginStyle from "../../assets/styles/login"
const Logo = require('../../public/farmacias-modernas.png')

const Login = ()=>{
    return(
        <>
        <View style={loginStyle.container}>
            <Image
                style={ loginStyle.logo }
                source={Logo}
            />
        </View>
        <View style={ loginStyle.loginWrap }>
            <ScrollView contentContainerStyle={ loginStyle.loginContainer }>
                <Text style={loginStyle.title}>Ingresa tu usuario y contraseña para acceder.</Text>
                <View style={ loginStyle.loginForm }>
                <Text>Usuario</Text>
                    <TextInput style= { loginStyle.loginInput } placeholder="Ingresa tu usuario"></TextInput>
                    <Text>Contraseña</Text>
                    <TextInput secureTextEntry={true} style= { loginStyle.loginInput } placeholder="Ingresa tu contraseña"></TextInput>
                    <Pressable style={ loginStyle.login }><Text style={ loginStyle.loginText }>Entrar</Text></Pressable>
                </View>
                <Text style={loginStyle.title}>¿No tienes cuenta?</Text>
                <Pressable style={ loginStyle.login }>
                    <Text style={ loginStyle.loginText }>Registrate</Text>
                </Pressable>
            </ScrollView>
        </View>
        </>
    )
}

export default Login