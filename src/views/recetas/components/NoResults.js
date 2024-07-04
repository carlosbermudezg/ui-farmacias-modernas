import { View, StyleSheet, Text } from "react-native"
import { Icon } from "react-native-paper"

const NoResults = ()=>{
    return(
        <View style={styles.container}>
            <Icon
                source="application-outline"
                color='silver'
                size={64}
            />
            <Text style={styles.text}>No existen recetas</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
    },
    text:{
        color:'silver'
    }
})

export default NoResults