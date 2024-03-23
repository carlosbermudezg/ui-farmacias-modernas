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
    table: {
        marginTop: 10,
        width:'80%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent:'center',
        gap:10,
        flexDirection:'row',
        flexWrap:'wrap',
    },
    filterContainer: {
        alignSelf:'center',
        justifyContent:'space-between',
        alignItems:'center',
        width: '80%',
        marginTop:10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    pagination: {
        height: 60,
        flexDirection:'row',
        gap: 5,
        justifyContent:'center',
        alignItems:'center',
        shadowColor: "gray",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 16, // Android
        borderWidth: 0.3,
        borderColor:'silver'
    },
    paginationButtons: {
        borderRadius: 50
    },
    searchInput: {
        width:'30%',
        borderRadius: 5,
        shadowColor: "gray",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 16, // Android
        borderWidth: 0.3,
        borderColor:'silver'
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
    productCard: {
        width: 300,
        borderRadius: 10,
        backgroundColor:'#F57E25',
    },
    categories: {
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center',
        marginTop: 10,
        gap:10
    },
    homeWrap: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems:'center',
    },
    homeContent: {
        flex:1,
        width: '100%'
    },
    producto: {
        flex:3
    },
    buttonCategory: {
        width: 120,
        height:40,
        borderRadius: 5,
    },
    registerWrap: {
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems:'center',
    },
    chat: {
        width:'100%',
        flex:1,
        flexDirection:'row'
    },
    chatContacts: {
        backgroundColor: 'silver',
        width: '20%',
        height: Dimensions.get('window').height,
    },
    chatContent: {
        backgroundColor:'green',
        width: '80%',
        height: Dimensions.get('window').height,
    },
    chatSending: {
        flexDirection:'row'
    },
    chatInput: {
        borderWidth: 1,
        backgroundColor:'#fff',
        borderColor:'#662D91',
        width:'85%',
        padding: 10
    },
    chatButton: {
        width:'15%',
        borderRadius:0
    },
    chatReading: {
        height: '80%',
        backgroundColor:'yellow'
    }
})

export default loginStyle