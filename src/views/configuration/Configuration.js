import { View, Text, StyleSheet } from "react-native"
import Navbar from "../../components/Navbar"

const Configuration = ({navigation, route})=>{
    return(
        <>
        <Navbar navigation={ navigation } route={ route.name } ></Navbar>
        <View>
            <Text>Configuration</Text>
        </View>
        </>
    )
}

export default Configuration