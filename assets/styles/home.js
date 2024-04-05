import { Dimensions, StyleSheet } from "react-native";

const homeStyle = StyleSheet.create({
    //WEB STYLES
    appbar: {
        backgroundColor: '#662D91',
    },
    white: {
        color: '#fff'
    },
    homeWrap: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems:'center',
    },
    homeContent: {
        flex:1,
        width: '100%',
        backgroundColor:'#EBEBEB'
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
    filterContainerMobile: {
        flex: 1.5,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:8,
        flexDirection: 'row',
        backgroundColor:'#E8E8E8',
    },
    categories: {
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center',
        marginTop: 10,
        gap:10,
    },
    categoriesMobile: {
        paddingBottom:10,
        width:'95%',
        flexDirection:'row',
        alignSelf:'center',
        justifyContent:'center',
        gap:10,
        backgroundColor:'#FFF',
        paddingTop:20,
        borderRadius:10,
        shadowColor: "gray",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 16, // Android
        borderColor:'silver'
    },
    buttonCategory: {
        width: 120,
        height:40,
        borderRadius: 5,
        justifyContent:'center',
    },
    buttonCategoryMobile: {
        borderRadius: 100,
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'red'
    },
    iconContainer: {
        justifyContent:'center',
        alignItems:'center',
        gap: 4,
        width:'20%',
    },
    iconText: {
        color:'gray',
        fontSize:18,
        fontWeight: 'bold'
    },
    textResultadosContainer:{
        flex:0.5,
        width:'100%',
        flexDirection:'row',
        paddingLeft:10,
        paddingRight:10,
        justifyContent:'space-between',
    },
    textResultados:{
        fontSize:20,
        alignSelf:'center',
        fontWeight:'bold',
    },
    textCategory:{
        fontSize: 14,
        alignSelf:'center',
        color:'silver'
    },
    searchInput: {
        backgroundColor:'#FFF',
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
    searchInputMobile: {
        backgroundColor: '#8639C0', 
        width:'90%',
        borderRadius: 5,
        padding: 15,
        color:'#FFFFFF',
        marginLeft: 8
    },
    table: {
        backgroundColor:'#FFF',
        marginTop: 10,
        width:'80%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent:'center',
        gap:10,
        flexDirection:'row',
        flexWrap:'wrap',
        padding:30,
        borderRadius: 5
    },
    producto: {
        flex:3
    },
    pagination: {
        backgroundColor:'#FFF',
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
    //MOBILE STYLES
    productsContainerMobile:{
        width:'95%',
        alignSelf:'center',
        flex:5,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
    },
    productCard: {
        width: '95%',
        height: 80,
        borderRadius: 5,
        backgroundColor:'#FFF',
        marginTop:2.5,
        marginBottom: 2.5,
        marginLeft:5,
        marginRight: 5,
        flexDirection:'row',
        padding:10,
        gap:5,
        shadowColor: "silver",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 16, // Android
        alignItems:'center'
    },
    productCardIcon:{
        justifyContent:'center',
        alignItems:'center',
        width:'12%',
        maxHeight:50,
        borderRadius: 100,
        padding:5
    },
    productCardInfo:{
        width:'90%'
    },
    homeContentMobile:{
        flex: 1,
        justifyContent:'space-between',
        backgroundColor: '#E8E8E8',
        gap:5
        
    },
    flatProducts:{
        alignItems:'center',
        width:'100%',
    }
})

export default homeStyle