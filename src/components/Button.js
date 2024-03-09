import { Pressable, Text } from "react-native"
import loginStyle from "../../assets/styles/login"

const Button = ({buttonText, callback})=>{
    return(
        <Pressable onPress={callback} style={ loginStyle.login }>
            <Text style={ loginStyle.loginText }>{buttonText}</Text>
        </Pressable>
    )
}

export default Button