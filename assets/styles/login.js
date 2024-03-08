import { StyleSheet } from "react-native";

const loginStyle = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor: '#112f8f',
        alignItems: 'center',
        // justifyContent: 'center',
        maxHeight: 100,
    },
    logo:{
        marginTop:30,
        width:300,
        height:60 
    },
    logo1:{
        marginTop:30,
        width:300,
        height:70
    },
    loginWrap: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems:'center',
        borderTopStartRadius: 30,
        borderTopRightRadius: 30
    },
    loginContainer: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        gap: 20,
        backgroundColor:'#FFF'
    },
    loginForm: {
        gap:10
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
        borderRadius: 30,
        backgroundColor: '#662D91',
        marginTop: 10,
        width: 300
    },
    loginText: {
        color:'white'
    },
    loginInput: {
        padding: 10,
        borderRadius: 30,
        borderWidth: 1,
        borderColor:'#662D91',
        width: 300
    }
})

export default loginStyle