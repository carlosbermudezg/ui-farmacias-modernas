import { Dimensions, StyleSheet } from "react-native";

const loginStyle = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor: '#112f8f',
        alignItems: 'center',
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
    chatWrap: {
        flex: 1,
        backgroundColor: '#662D91',
        justifyContent: 'center',
        alignItems:'center',
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
        borderRadius: 5,
        backgroundColor: '#662D91',
        marginTop: 10
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
    },
    appbar: {
        height:60,
        color: '#fff',
        backgroundColor:'#662D91',
    },
    drawer: {
        width:250,
        height: Dimensions.get('window').height,
        backgroundColor:'#fff',
        position:'fixed'
    },
    logout: {
        flex: 1,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        gap: 10
    },
    contentForm: {
        height: Dimensions.get('window').height,
        backgroundColor:'#fff'
    },
    registerForm: {
        width: 280,
        justifyContent:'center',
        alignItems:'center',
        gap: 10
    },
    registerText: {
        color: '#662D91'
    },
    registerInput: {
        width:'100%',
        borderBottomWidth:0
    },
    dialogRegister: {
        width: 280,
        alignSelf: 'center'
    },
    registerWrap: {
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems:'center',
    },
    chat: {
        width:'70%',
        flex:1,
        flexDirection:'row',
        marginTop:20,
        marginBottom: 20,
        padding:10,
        backgroundColor:'#EBEDEF',
        height: Dimensions.get('window').height,
        borderRadius:20,
        overflow:'hidden',
        gap:15,
        shadowColor: "#283747",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 16, // Android
    },
    chatContacts: {
        flex:2,
        gap:10
    },
    userChat:{
        flexDirection:'row',
        paddingTop:15,
        paddingBottom:15,
        paddingRight:15,
        gap:10,
        alignItems:'center',
    },
    noChatSelected:{
        justifyContent:'center',
        alignItems:'center',
        flex: 4
    },
    chatContactsSection: {
        flex:9,
        borderRadius:20,
        backgroundColor:'#FFF'
    },
    chatContactsSectionMobile: {
        width: Dimensions.get('screen').width,
        flex:1,
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        backgroundColor:'#FFF'
    },
    contact: {
        padding: 10,
    },
    userNameChat: {
        flex:1,
        backgroundColor:'#D6DBDF',
        flexDirection:'row',
        alignItems:'center',
        gap:10,
        borderRadius:10,
        padding: 5
    },
    chatContent: {
        flex:4,
        gap:10
    },
    chatSending: {
        flex: 1,
        flexDirection:'row',
        backgroundColor:'#FFF',
        padding:10,
        borderRadius:30,
        alignItems:'center',
        gap:10
    },
    chatInput: {
        backgroundColor:'#fff',
        flex:8,
        outlineWidth: 0,
        outline: 'none', 
        MozAppearance: 'textfield',
        padding:15
    },
    chatSendButton: {
        flex:1,
    },
    chatAttachButton: {
        flex:1,
        backgroundColor:'transparent',
        borderWidth:1,
        borderColor:'red'
    },
    chatReading: {
        flex: 8,
        overflow:'hidden',
    },
    flatMessages: {
        padding: 10,
        gap:10
    }
})

export default loginStyle