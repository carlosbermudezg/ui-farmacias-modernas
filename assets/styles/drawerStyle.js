import { Dimensions, StyleSheet } from "react-native";

const drawerStyle = StyleSheet.create({
    container: {
     backgroundColor:'transparent',
     height: Dimensions.get('window').height - 40,
     gap:10
    },
    header: {
        flexDirection:'row',
        gap:20,
        paddingLeft:15,
        alignItems:'center',
        backgroundColor:'#FFF',
        height: 60,
        borderTopRightRadius:10,
        borderBottomRightRadius:10
    },
    userIcon: {
        backgroundColor:'#662D91',
        borderRadius:100,
        padding:10
    },
    menu: {
        backgroundColor:'#FFF',
        borderTopRightRadius:10,
        borderBottomRightRadius:10
    },
    footer: {
        backgroundColor:'#FFF',
        height: 60,
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    }
})

export default drawerStyle