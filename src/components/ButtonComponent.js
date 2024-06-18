import { StyleSheet, Button, View, TouchableOpacity, Text } from "react-native"
import { Icon } from "react-native-paper"

const ButtonComponent = ({ onPress, title, iconName, iconColor, color, borderColor, textColor })=>{

    const styles = StyleSheet.create({
        component:{
            backgroundColor: color,
            borderRadius:5,
            borderColor: borderColor,
            borderWidth: 1,
        },
        buttonContainer: {
            width:'100%',
            borderRadius: 5,
        },
        button:{
            backgroundColor: color,
            height:30,
            alignItems:'center',
            justifyContent:'center'
        },
        textButton:{
            color: textColor,
        },
        iconContainer:{
            height:'100%',
            position:'absolute',
            justifyContent:'center',
            alignItems:'center',
            zIndex:10,
            paddingLeft:15
        },
        icon: {
            marginLeft: 10, 
            marginRight: 10,
            padding:5,
        },
    })

    return(
        <View style={styles.component}>
            <View style={styles.iconContainer}>
                <Icon
                    source={iconName}
                    color={iconColor}
                    size={20}
                    style={styles.icon}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={onPress}>
                    <Text style={styles.textButton}>{title}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ButtonComponent