import React from "react"
import { View, ScrollView, StyleSheet } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { Appbar, Snackbar } from "react-native-paper"
import { setSnackbar } from "../../store/slices/info/snackbar.slice"
import UserData from "./components/UserData"
import UserType from "./components/UserType"
import UserBrands from "./components/UserBrands"
import UserZones from "./components/UserZones"
import update from './components/update'

const EditUser = ({ navigation }) => {
    const userEdit = useSelector( state => state.editUser )
    const data = useSelector( state => state.data )
    const type = useSelector(state => state.userType)
    const selectedZones = useSelector( state => state.selectedZones )
    const selectedBrands = useSelector( state => state.selectedBrands )
    const snackbar = useSelector(state => state.snackbar)
    const dispatch = useDispatch()

    const updateData = async()=>{
        const user = {
            id: userEdit.idusers,
            name: data.name,
            username : data.username,
            telefono : data.telefono,
            direccion : data.direccion,
            type : type,
            zones : JSON.stringify(selectedZones),
            brands : JSON.stringify(selectedBrands)
        }
        const didUpdate = await update(user)
        if(didUpdate){
            dispatch(setSnackbar([true, "Datos actualizados"]))
        }else {
            dispatch(setSnackbar([true, "Ha ocurrido un error"]))
        }
    }

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.appbar}>
                <Appbar.BackAction color="#FFF" onPress={() => navigation.navigate('Users')} />
                <Appbar.Content color="#FFF" title="Editar Usuario" />
                <Appbar.Action iconColor="#FFF" icon="content-save-outline" onPress={() => updateData()} />
            </Appbar.Header>
            <ScrollView style={styles.scrollView}>
                <UserData />
                <UserType />
                <UserBrands />
                <UserZones />
            </ScrollView>
            <Snackbar
                visible={snackbar[0]}
                onDismiss={() => dispatch(setSnackbar([false, ""]))}
            >
                {snackbar[1]}
            </Snackbar>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#FFF'
    },
    appbar: {
        backgroundColor: '#662D91',
    },
    scrollView: {
        flex: 1,
    },
});

export default EditUser;
