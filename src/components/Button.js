import { Pressable, Text } from "react-native"
import loginStyle from "../../assets/styles/login"

const Button = ({buttonText})=>{
    return(
        <Pressable style={ loginStyle.login }>
            <Text style={ loginStyle.loginText }>{buttonText}</Text>
        </Pressable>
    )
}

export default Button