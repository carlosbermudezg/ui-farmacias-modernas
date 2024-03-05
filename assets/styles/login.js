import { StyleSheet } from "react-native";

const loginStyle = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#f69a23',
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: 100,
    },
    logo:{
        marginTop:20,
        width:200,
        height:50
    },
    loginWrap: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems:'center',
    },
    loginContainer: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        gap: 30,
        backgroundColor:'#FFFFFF'
    },
    loginForm: {
        gap:5
    },
    title:{
        fontWeight: 'bold',
        fontSize: 16
    },
    login: {
        justifyContent:'center',
        alignItems:'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        backgroundColor: '#662D91',
        marginTop: 10,
        width: 300
    },
    loginText: {
        color:'white'
    },
    loginInput: {
        padding: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor:'#662D91',
        width: 300
    }
})

export default loginStyle