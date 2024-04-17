import { View, Text, Image, Platform, ScrollView } from "react-native"
import homeStyle from "../../assets/styles/home";
import { DataTable, Avatar, Card, IconButton } from "react-native-paper";
import Navbar from "../components/Navbar"
import useSWR from 'swr'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUsers } from "../store/slices/users.slice";

const Users = ({ navigation, route })=>{

    const dispatch = useDispatch()
    const users = useSelector( state => state.users )

    //swr
    const fetcher = (url)=> axios.get(url).then( res => res.data )
    const { data, isLoading, error } = useSWR(`${process.env.EXPO_PUBLIC_API_URL}/users`, fetcher)
    dispatch(setUsers(data))
    // dispatch(setRenderProducts(data?.data.slice(0,5)))
    // dispatch(setTotalPage(Math.ceil(data?.data.length / 5)))

    return(
        <>
        <Navbar navigation={ navigation } route={ route.name } ></Navbar>
        <ScrollView contentContainerStyle={ homeStyle.table }>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Nombre</DataTable.Title>
                    <DataTable.Title>Usuario</DataTable.Title>
                    <DataTable.Title>Teléfono</DataTable.Title>
                    <DataTable.Title>Tipo de Usuario</DataTable.Title>
                    <DataTable.Title>Estado</DataTable.Title>
                    <DataTable.Title>Acción</DataTable.Title>
                </DataTable.Header>
                {
                    users?.map((user, index)=>{
                        let type, status

                        if(user.type === 1){
                            type = 'Médico'
                        }else if(user.type === 2){
                            type = 'Visitador Médico'
                        }else if(user.type === 10){
                            type = 'Administrador'
                        }

                        if(user.active === 1){
                            status = 'Activo'
                        }else{
                            status = 'Inactivo'
                        }

                        return(
                            <DataTable.Row key={ index }>
                                <DataTable.Cell>{ user.name }</DataTable.Cell>
                                <DataTable.Cell>{ user.username }</DataTable.Cell>
                                <DataTable.Cell>{ user.telefono }</DataTable.Cell>
                                <DataTable.Cell>{ type }</DataTable.Cell>
                                <DataTable.Cell>{ status }</DataTable.Cell>
                                <DataTable.Cell>
                                    {
                                        user.active != 1 ? 
                                            <IconButton
                                                icon="account-off"
                                                iconColor='red'
                                                size={20}
                                                onPress={() => console.log('Pressed')}
                                            />:
                                            <IconButton
                                                icon="account-check"
                                                iconColor='green'
                                                size={20}
                                                onPress={() => console.log('Pressed')}
                                            />
                                    }
                                </DataTable.Cell>
                            </DataTable.Row>
                        )
                    })
                }
            </DataTable>
        </ScrollView>
        </>
    )
}

export default Users