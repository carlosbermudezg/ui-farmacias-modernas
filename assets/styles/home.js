import { StyleSheet } from "react-native";

const homeStyle = StyleSheet.create({
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
    filterContainer: {
        alignSelf:'center',
        justifyContent:'space-between',
        alignItems:'center',
        width: '80%',
        marginTop:10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    categories: {
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
    producto: {
        flex:3
    },
    productCard: {
        width: 300,
        borderRadius: 10,
        backgroundColor:'#F57E25',
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
})

export default homeStyle