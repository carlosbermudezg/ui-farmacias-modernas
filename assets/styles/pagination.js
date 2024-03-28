import { StyleSheet } from "react-native";

const paginationStyle = StyleSheet.create({
    pagination: {
        backgroundColor:'#FFF',
        width:'100%',
        height: '10%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        elevation: 16, // Android
        borderWidth: 0.3,
        borderColor:'silver'
    },
    paginationButtons: {
        maxWidth:'50',
        padding:0,
        // backgroundColor:'#662D91',
        maxHeight:50,
        borderRadius: 5
    },
})

export default paginationStyle