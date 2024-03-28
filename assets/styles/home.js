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
        alignSelf:'center',
        justifyContent:'space-around',
        alignItems:'center',
        width: '80%',
        marginTop:10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    categories: {
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center',
        marginTop: 10,
        gap:10
    },
    categoriesMobile: {
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center',
        marginTop: 10,
        gap:10
    },
    buttonCategory: {
        width: 120,
        height:40,
        borderRadius: 5,
        justifyContent:'center'
    },
    buttonCategoryMobile: {
        width: 60,
        height: 60,
        borderRadius: 100,
        justifyContent:'center',
        alignItems:'center',
    },
    iconContainer: {
        justifyContent:'center',
        alignItems:'center',
        gap: 8
    },
    iconText: {
        color:'gray',
        fontWeight: 'bold'
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
        width:'100%',
        height: '72%',
        backgroundColor:'#FFF',
        justifyContent:'center',
        alignItems:'center',
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
        elevation:5,
        alignItems:'center'
    },
    productCardIcon:{
        justifyContent:'center',
        alignItems:'center',
        width:'10%',
        maxHeight:50,
        borderRadius: 100,
        padding:5
    },
    productCardInfo:{
        width:'90%'
    },
    filterContainerMobile:{
        height:'18%',
        backgroundColor:'#FFF'
    },
    homeContentMobile:{
        flex: 1,
        backgroundColor: '#FFF',
    },
    flatProducts:{
        alignItems:'center',
        backgroundColor:'#FFF',
        width:'100%',
    }
})

export default homeStyle